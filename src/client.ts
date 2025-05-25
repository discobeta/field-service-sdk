import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { ServerError } from '@apollo/client/link/utils';

export interface FieldServiceClientOptions {
  baseUrl: string;
  token?: string;
  onUnauthorized?: () => void;
  onError?: (error: Error) => void;
  onValidationError?: (validationErrors: ValidationError[]) => void;
  refreshToken?: () => Promise<string | null>;
}

export interface ValidationError {
  field: string;
  message: string;
}

const defaultOptions: Partial<FieldServiceClientOptions> = {
  baseUrl: 'http://localhost:8000/api/graph/',
};

// Detect if we're in a React Native environment
const isReactNative = () => {
  return typeof (global as any).HermesInternal !== 'undefined' || 
         typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
};

export class FieldServiceClient {
  private apolloClient: ApolloClient<NormalizedCacheObject>;
  private options: FieldServiceClientOptions;
  private isRefreshing: boolean = false;

  constructor(options: FieldServiceClientOptions) {
    this.options = { ...defaultOptions, ...options };
    this.apolloClient = this.createApolloClient();
  }

  private createApolloClient(): ApolloClient<NormalizedCacheObject> {
    // Mobile device workaround: replace localhost with the device's network IP
    // This is needed because localhost on a mobile device refers to the device itself
    let apiUrl = this.options.baseUrl;
    
    // Note: We previously modified the URL here, but now we expect the URL to be 
    // properly configured by the application that uses this SDK, especially for React Native
    // applications where localhost means different things on different platforms.

    // HTTP link
    const httpLink = createHttpLink({
      uri: apiUrl,
    });

    // Auth link for adding the token to headers
    const authLink = setContext((_, { headers }) => {
      const token = this.options.token;
      return {
        headers: {
          ...headers,
          authorization: token ? `JWT ${token}` : '',
        },
      };
    });

    // Error handling link
    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      console.log('==== ERROR LINK ====');
      console.log('==== GRAPHQL ERRORS ====');
      console.log(graphQLErrors);
      console.log('==== NETWORK ERROR ====');
      console.log(networkError);
      console.log('==== OPERATION ====');
      console.log(operation);
      if (graphQLErrors) {
        const validationErrors: ValidationError[] = [];
        
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          
          // Check for unauthorized errors
          if (message.includes('Authentication') || 
              message.includes('Error decoding signature') || 
              message.includes('JWT') || 
              message.toLowerCase().includes('token') ||
              message.includes('Signature has expired')) {
            console.log('==== JWT ERROR DETECTED ====', message);
            
            // Try to refresh the token if a refresh function is provided
            if (this.options.refreshToken && !this.isRefreshing) {
              this.isRefreshing = true;
              
              // Attempt to refresh the token
              this.options.refreshToken()
                .then(newToken => {
                  if (newToken) {
                    console.log('==== TOKEN REFRESHED ====');
                    // Set the new token
                    this.setToken(newToken);
                    
                    // Retry the failed request
                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `JWT ${newToken}`,
                      },
                    });
                    
                    // Retry the operation
                    return forward(operation);
                  } else {
                    console.log('==== TOKEN REFRESH FAILED ====');
                    // If refresh token failed, call onUnauthorized
                    this.options.onUnauthorized?.();
                  }
                })
                .catch(error => {
                  console.error('Token refresh failed:', error);
                  this.options.onUnauthorized?.();
                })
                .finally(() => {
                  this.isRefreshing = false;
                });
            } else {
              // If no refresh function is provided, just call onUnauthorized
              this.options.onUnauthorized?.();
            }
          }
          
          // Check for validation errors
          if (message.includes('got invalid value') || message.includes('Field') && message.includes('was not provided')) {
            // Extract field name from validation error
            const fieldMatch = message.match(/Field '([^']+)'/);
            if (fieldMatch && fieldMatch[1]) {
              validationErrors.push({
                field: fieldMatch[1],
                message: message.trim()
              });
            }
          }
        });
        
        // If we found validation errors, call the validation error handler
        if (validationErrors.length > 0 && this.options.onValidationError) {
          this.options.onValidationError(validationErrors);
        }
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        
        // Check if network error is related to expired signature
        if (networkError.message && networkError.message.includes('Signature has expired')) {
          console.log('==== JWT NETWORK ERROR DETECTED ====', networkError.message);
          
          // Try to refresh the token if a refresh function is provided
          if (this.options.refreshToken && !this.isRefreshing) {
            this.isRefreshing = true;
            
            // Attempt to refresh the token
            this.options.refreshToken()
              .then(newToken => {
                if (newToken) {
                  console.log('==== TOKEN REFRESHED (NETWORK) ====');
                  // Set the new token
                  this.setToken(newToken);
                  
                  // Retry the failed request
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `JWT ${newToken}`,
                    },
                  });
                  
                  // Retry the operation
                  return forward(operation);
                } else {
                  console.log('==== TOKEN REFRESH FAILED (NETWORK) ====');
                  // If refresh token failed, call onUnauthorized
                  this.options.onUnauthorized?.();
                }
              })
              .catch(error => {
                console.error('Token refresh failed:', error);
                this.options.onUnauthorized?.();
              })
              .finally(() => {
                this.isRefreshing = false;
              });
          } else {
            // If no refresh function is provided, just call onUnauthorized
            this.options.onUnauthorized?.();
          }
        }
        
        // For server errors (400/500), try to extract more information
        const serverError = networkError as ServerError;
        if (serverError.name === 'ServerError' && 
            serverError.result && 
            typeof serverError.result === 'object') {
          // Handle validation errors that might be in the response body
          try {
            const errorResult = serverError.result;
            if (errorResult.errors && Array.isArray(errorResult.errors)) {
              const validationErrors: ValidationError[] = [];
              
              errorResult.errors.forEach((error: any) => {
                if (error.message && (
                    error.message.includes('got invalid value') || 
                    (error.message.includes('Field') && error.message.includes('was not provided'))
                  )) {
                  const fieldMatch = error.message.match(/Field '([^']+)'/);
                  if (fieldMatch && fieldMatch[1]) {
                    validationErrors.push({
                      field: fieldMatch[1],
                      message: error.message.trim()
                    });
                  }
                }
              });
              
              if (validationErrors.length > 0 && this.options.onValidationError) {
                this.options.onValidationError(validationErrors);
              }
            }
          } catch (e) {
            console.error('Error parsing server error response:', e);
          }
        }
        
        this.options.onError?.(networkError);
      }
    });

    // Combine the links
    const link = ApolloLink.from([errorLink, authLink, httpLink]);

    // Create the Apollo Client
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    });
  }

  // Method to update the token
  public setToken(token: string): void {
    this.options.token = token;
    // Recreate the client with the new token
    this.apolloClient = this.createApolloClient();
  }

  // Get the Apollo client instance
  public getClient(): ApolloClient<NormalizedCacheObject> {
    return this.apolloClient;
  }

  // Get the base URL
  public getBaseUrl(): string {
    return this.options.baseUrl;
  }

  // Refresh token - attempt to get a new token
  public async refreshToken(): Promise<boolean> {
    if (this.options.refreshToken) {
      try {
        const newToken = await this.options.refreshToken();
        if (newToken) {
          this.setToken(newToken);
          return true;
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }
    return false;
  }

  // Logout - clear the token
  public logout(): void {
    this.options.token = undefined;
    this.apolloClient = this.createApolloClient();
    this.apolloClient.resetStore();
  }
} 
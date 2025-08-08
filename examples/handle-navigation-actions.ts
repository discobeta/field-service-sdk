import { FieldServiceSDK } from '../src';
import { NavigationAction } from '../src/types/enhanced-responses';

/**
 * Example: Handling Navigation Actions from AI Agent
 * 
 * This example demonstrates how to process navigation actions returned by the AI agent
 * when it creates or updates records in response to user requests.
 */

async function handleAgentResponse() {
  // Initialize the SDK
  const sdk = new FieldServiceSDK({
    authToken: 'your-auth-token',
    graphqlEndpoint: 'https://api.yourservice.com/graphql'
  });

  try {
    // Send a request to the AI agent
    const response = await sdk.vertexChatCompletionWithParsedTools({
      messages: [
        {
          role: 'user',
          content: 'Create a new client named John Smith with email john@example.com'
        }
      ],
      // Include current screen context if available
      currentScreenType: 'client',
      currentRecordId: 'current-client-id'
    });

    // Check if the response was successful
    if (response.data?.vertexChatCompletion?.result?.success) {
      const result = response.data.vertexChatCompletion.result;

      // Display the AI's response
      console.log('AI Response:', result.content);

      // Handle navigation actions if present
      if (response.navigationActions && response.navigationActions.length > 0) {
        console.log(`Found ${response.navigationActions.length} navigation action(s)`);
        
        for (const action of response.navigationActions) {
          await handleNavigationAction(action);
        }
      }

      // Handle parsed tool calls if you need additional processing
      if (response.parsedToolCalls && response.parsedToolCalls.length > 0) {
        console.log('Tool calls executed:', response.parsedToolCalls);
      }
    }
  } catch (error) {
    console.error('Error processing agent request:', error);
  }
}

/**
 * Handle a navigation action by routing to the appropriate screen
 */
async function handleNavigationAction(action: NavigationAction) {
  console.log(`Navigating: ${action.action} -> ${action.screenType} (ID: ${action.recordId})`);

  switch (action.action) {
    case 'create_and_navigate':
      // Navigate to the newly created record
      navigateToRecord(action.screenType, action.recordId, true);
      break;
      
    case 'update_and_navigate':
      // Navigate to the updated record
      navigateToRecord(action.screenType, action.recordId, false);
      break;
      
    case 'navigate':
      // Simple navigation without create/update
      navigateToRecord(action.screenType, action.recordId, false);
      break;
      
    default:
      console.warn('Unknown navigation action:', action.action);
  }
}

/**
 * Navigate to a specific record
 * In a real application, this would use your routing library (React Router, Vue Router, etc.)
 */
function navigateToRecord(screenType: string, recordId: string, isNew: boolean) {
  const actionType = isNew ? 'newly created' : 'existing';
  console.log(`Opening ${actionType} ${screenType} with ID: ${recordId}`);
  
  // Example navigation paths
  switch (screenType) {
    case 'client':
      // window.location.href = `/clients/${recordId}`;
      console.log(`Navigate to: /clients/${recordId}`);
      break;
      
    case 'job':
      // window.location.href = `/jobs/${recordId}`;
      console.log(`Navigate to: /jobs/${recordId}`);
      break;
      
    case 'invoice':
      // window.location.href = `/invoices/${recordId}`;
      console.log(`Navigate to: /invoices/${recordId}`);
      break;
      
    case 'estimate':
      // window.location.href = `/estimates/${recordId}`;
      console.log(`Navigate to: /estimates/${recordId}`);
      break;
      
    default:
      console.warn('Unknown screen type:', screenType);
  }
}

/**
 * Example: Complex workflow with multiple navigation actions
 */
async function complexWorkflowExample() {
  const sdk = new FieldServiceSDK({
    authToken: 'your-auth-token',
    graphqlEndpoint: 'https://api.yourservice.com/graphql'
  });

  // Example: Creating a job with an invoice
  const response = await sdk.vertexChatCompletionWithParsedTools({
    messages: [
      {
        role: 'user',
        content: 'Create a job for the current client for HVAC repair scheduled for tomorrow, then create an invoice with labor for $150'
      }
    ],
    currentScreenType: 'client',
    currentRecordId: 'client-123'
  });

  if (response.navigationActions) {
    // The agent might return multiple navigation actions
    // For example: 
    // 1. First action: navigate to the newly created job
    // 2. Second action: navigate to the newly created invoice
    
    // You can choose to navigate to the last action (most recent)
    const lastAction = response.navigationActions[response.navigationActions.length - 1];
    await handleNavigationAction(lastAction);
    
    // Or show a choice to the user
    if (response.navigationActions.length > 1) {
      console.log('Multiple records were created. Choose where to navigate:');
      response.navigationActions.forEach((action, index) => {
        console.log(`${index + 1}. ${action.screenType} (${action.recordId})`);
      });
    }
  }
}

// Run the example
handleAgentResponse();
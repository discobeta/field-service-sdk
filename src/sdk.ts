import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FieldServiceClient, FieldServiceClientOptions } from './client';

// Import generated hooks and types
import * as types from './generated/graphql';

// Import the GraphQL documents directly
import * as mutations from './generated/mutations';
import * as queries from './generated/queries';

export class FieldServiceSDK {
  private client: FieldServiceClient;
  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(options: FieldServiceClientOptions) {
    this.client = new FieldServiceClient(options);
    this.apolloClient = this.client.getClient();
  }

  // Authentication
  public setToken(token: string): void {
    this.client.setToken(token);
    this.apolloClient = this.client.getClient();
  }

  public logout(): void {
    this.client.logout();
    this.apolloClient = this.client.getClient();
  }

  public async tokenAuth(email: string, password: string) {
    const result = await this.apolloClient.mutate({
      mutation: mutations.TOKEN_AUTH,
      variables: { email, password }
    });
    
    if (result.data?.tokenAuth?.token) {
      this.setToken(result.data.tokenAuth.token);
    }
    
    return result.data?.tokenAuth;
  }

  public async verifyToken(token: string) {
    const result = await this.apolloClient.mutate({
      mutation: mutations.VERIFY_TOKEN,
      variables: { token }
    });
    
    return result.data?.verifyToken;
  }

  // Authentication Mutations
  public async signup(input: types.SignupInput) {
    return this.apolloClient.mutate({
      mutation: mutations.SIGNUP,
      variables: { input }
    });
  }

  public async forgotPassword(email: string) {
    return this.apolloClient.mutate({
      mutation: mutations.FORGOT_PASSWORD,
      variables: { email }
    });
  }

  public async validateOtpAndResetPassword(email: string, otpCode: string, newPassword: string) {
    return this.apolloClient.mutate({
      mutation: mutations.VALIDATE_OTP_AND_RESET_PASSWORD,
      variables: { email, otpCode, newPassword }
    });
  }

  public async changePassword(newPassword: string) {
    return this.apolloClient.mutate({
      mutation: mutations.CHANGE_PASSWORD,
      variables: { newPassword }
    });
  }

  // User Profile Queries & Mutations
  public async userProfile() {
    return this.apolloClient.query({
      query: queries.USER_PROFILE
    });
  }

  public async updateUserProfile(input: types.UserProfileInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_USER_PROFILE,
      variables: { input }
    });
  }

  // Client Queries & Mutations
  public async clients(filter?: types.ClientFilter, pagination?: types.PaginationInput) {
    return this.apolloClient.query({
      query: queries.CLIENTS,
      variables: { filter, pagination }
    });
  }

  public async getClient(id: string) {
    return this.apolloClient.query({
      query: queries.CLIENT,
      variables: { id }
    });
  }

  public async createClient(input: types.ClientInput) {
    return this.apolloClient.mutate({
      mutation: mutations.CREATE_CLIENT,
      variables: { input }
    });
  }

  public async updateClient(id: string, input: types.ClientInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_CLIENT,
      variables: { id, input }
    });
  }

  public async deleteClient(id: string) {
    return this.apolloClient.mutate({
      mutation: mutations.DELETE_CLIENT,
      variables: { id }
    });
  }

  // Address Validation
  public async validateAddress(input: types.AddressValidationInput) {
    return this.apolloClient.mutate({
      mutation: mutations.VALIDATE_ADDRESS,
      variables: { input }
    });
  }

  // Business Profile Queries & Mutations
  public async businessProfile() {
    return this.apolloClient.query({
      query: queries.BUSINESS_PROFILE
    });
  }

  public async updateBusinessProfile(input: types.BusinessProfileInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_BUSINESS_PROFILE,
      variables: { input }
    });
  }

  // Job Queries & Mutations
  public async jobs(filter?: types.JobFilter, pagination?: types.PaginationInput) {
    return this.apolloClient.query({
      query: queries.JOBS,
      variables: {
        filter: filter,
        pagination: pagination
      }
    });
  }

  public async job(id: string) {
    return this.apolloClient.query({
      query: queries.JOB,
      variables: { id }
    });
  }

  public async createJob(input: types.JobInput) {
    return this.apolloClient.mutate({
      mutation: mutations.CREATE_JOB,
      variables: { input }
    });
  }

  public async updateJob(id: string, input: types.JobInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_JOB,
      variables: { id, input }
    });
  }

  public async deleteJob(id: string) {
    return this.apolloClient.mutate({
      mutation: mutations.DELETE_JOB,
      variables: { id }
    });
  }

  // Estimate Queries & Mutations
  public async estimates(status?: string) {
    return this.apolloClient.query({
      query: queries.ESTIMATES,
      variables: { status }
    });
  }

  public async estimate(id: string) {
    return this.apolloClient.query({
      query: queries.ESTIMATE,
      variables: { id }
    });
  }

  public async estimatesForJob(jobId: string) {
    return this.apolloClient.query({
      query: queries.ESTIMATES_FOR_JOB,
      variables: { jobId }
    });
  }

  public async createEstimate(input: types.EstimateInput) {
    return this.apolloClient.mutate({
      mutation: mutations.CREATE_ESTIMATE,
      variables: { input }
    });
  }

  public async updateEstimate(id: string, input: types.EstimateInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_ESTIMATE,
      variables: { id, input }
    });
  }

  public async deleteEstimate(id: string) {
    return this.apolloClient.mutate({
      mutation: mutations.DELETE_ESTIMATE,
      variables: { id }
    });
  }

  // Invoice Queries & Mutations
  public async invoices(status?: string) {
    return this.apolloClient.query({
      query: queries.INVOICES,
      variables: { status }
    });
  }

  public async invoice(id: string) {
    return this.apolloClient.query({
      query: queries.INVOICE,
      variables: { id }
    });
  }

  public async invoicesForJob(jobId: string) {
    return this.apolloClient.query({
      query: queries.INVOICES_FOR_JOB,
      variables: { jobId }
    });
  }

  public async createInvoice(input: types.InvoiceInput) {
    return this.apolloClient.mutate({
      mutation: mutations.CREATE_INVOICE,
      variables: { input }
    });
  }

  public async updateInvoice(id: string, input: types.InvoiceInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_INVOICE,
      variables: { id, input }
    });
  }

  public async deleteInvoice(id: string) {
    return this.apolloClient.mutate({
      mutation: mutations.DELETE_INVOICE,
      variables: { id }
    });
  }

  // Document Generation
  public async generateDocumentPdf(documentId: string, documentType: string) {
    return this.apolloClient.mutate({
      mutation: mutations.GENERATE_DOCUMENT_PDF,
      variables: { documentId, documentType }
    });
  }

  // File Upload
  public async uploadFile(input: types.FileUploadInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPLOAD_FILE,
      variables: { input }
    });
  }

  // Device Registration
  public async updateOrRegisterDevice(input: types.DeviceRegistrationInput) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_OR_REGISTER_DEVICE,
      variables: { input }
    });
  }

  // Account & Team Management
  public async currentAccount() {
    return this.apolloClient.query({
      query: queries.CURRENT_ACCOUNT
    });
  }

  public async accountMembers() {
    return this.apolloClient.query({
      query: queries.ACCOUNT_MEMBERS
    });
  }

  public async pendingInvitations() {
    return this.apolloClient.query({
      query: queries.PENDING_INVITATIONS
    });
  }

  public async myInvitations() {
    return this.apolloClient.query({
      query: queries.MY_INVITATIONS
    });
  }

  public async inviteUser(input: types.InviteUserInput) {
    return this.apolloClient.mutate({
      mutation: mutations.INVITE_USER,
      variables: { input }
    });
  }

  public async acceptInvitation(input: types.InvitationResponseInput) {
    return this.apolloClient.mutate({
      mutation: mutations.ACCEPT_INVITATION,
      variables: { input }
    });
  }

  public async rejectInvitation(input: types.InvitationResponseInput) {
    return this.apolloClient.mutate({
      mutation: mutations.REJECT_INVITATION,
      variables: { input }
    });
  }

  public async cancelInvitation(invitationId: string) {
    return this.apolloClient.mutate({
      mutation: mutations.CANCEL_INVITATION,
      variables: { invitationId }
    });
  }

  public async removeMember(accountId: string, memberId: string) {
    return this.apolloClient.mutate({
      mutation: mutations.REMOVE_MEMBER,
      variables: { accountId, memberId }
    });
  }

  // Data Export
  public async exportData() {
    return this.apolloClient.mutate({
      mutation: mutations.EXPORT_DATA
    });
  }

  // Email Unsubscribe
  public async unsubscribeFromEmails(emailHash: string, source: string) {
    return this.apolloClient.mutate({
      mutation: mutations.UNSUBSCRIBE_FROM_EMAILS,
      variables: { emailHash, source }
    });
  }

  // Subscription Management
  public async subscriptionPlans() {
    return this.apolloClient.query({
      query: queries.SUBSCRIPTION_PLANS
    });
  }

  public async mySubscription() {
    return this.apolloClient.query({
      query: queries.MY_SUBSCRIPTION
    });
  }

  public async createCheckoutSession(planId: string, successUrl: string, cancelUrl: string) {
    return this.apolloClient.mutate({
      mutation: mutations.CREATE_CHECKOUT_SESSION,
      variables: { planId, successUrl, cancelUrl }
    });
  }

  public async cancelSubscription() {
    return this.apolloClient.mutate({
      mutation: mutations.CANCEL_SUBSCRIPTION
    });
  }

  public async previewSubscriptionChange(planId: string, prorationBehavior?: string) {
    return this.apolloClient.mutate({
      mutation: mutations.PREVIEW_SUBSCRIPTION_CHANGE,
      variables: { planId, prorationBehavior }
    });
  }

  public async updateSubscription(planId: string, prorationBehavior?: string) {
    return this.apolloClient.mutate({
      mutation: mutations.UPDATE_SUBSCRIPTION,
      variables: { planId, prorationBehavior }
    });
  }

  // Feedback
  public async submitFeedback(description: string, pageUrl?: string) {
    return this.apolloClient.mutate({
      mutation: mutations.SUBMIT_FEEDBACK,
      variables: { description, pageUrl }
    });
  }

  // Account Deletion
  public async requestAccountDeletion() {
    return this.apolloClient.mutate({
      mutation: mutations.REQUEST_ACCOUNT_DELETION
    });
  }

  public async confirmAccountDeletion(otpCode: string) {
    return this.apolloClient.mutate({
      mutation: mutations.CONFIRM_ACCOUNT_DELETION,
      variables: { otpCode }
    });
  }

  // Google Sheets Integration
  public async googleSheetsIntegrationStatus() {
    return this.apolloClient.query({
      query: queries.GOOGLE_SHEETS_INTEGRATION_STATUS
    });
  }

  public async enableGoogleSheetsIntegration(input: types.EnableGoogleSheetsIntegration) {
    return this.apolloClient.mutate({
      mutation: mutations.ENABLE_GOOGLE_SHEETS_INTEGRATION,
      variables: { input }
    });
  }

  public async disableGoogleSheetsIntegration() {
    return this.apolloClient.mutate({
      mutation: mutations.DISABLE_GOOGLE_SHEETS_INTEGRATION
    });
  }

  public async syncGoogleSheets() {
    return this.apolloClient.mutate({
      mutation: mutations.SYNC_GOOGLE_SHEETS
    });
  }

  // AI/ML Features
  public async speechToText(input: types.SpeechToTextInput) {
    return this.apolloClient.mutate({
      mutation: mutations.SPEECH_TO_TEXT,
      variables: { input }
    });
  }

  public async dialogflowDetectIntent(input: types.DialogflowInput) {
    return this.apolloClient.mutate({
      mutation: mutations.DIALOGFLOW_DETECT_INTENT,
      variables: { input }
    });
  }

  public async textToSpeech(input: types.TextToSpeechInput) {
    return this.apolloClient.mutate({
      mutation: mutations.TEXT_TO_SPEECH,
      variables: { input }
    });
  }

  public async getAvailableVoicesMutation(input?: types.GetVoicesInput) {
    return this.apolloClient.mutate({
      mutation: mutations.GET_AVAILABLE_VOICES,
      variables: { input }
    });
  }

  public async availableVoices(input?: types.GetVoicesInput) {
    return this.apolloClient.query({
      query: queries.AVAILABLE_VOICES,
      variables: { input }
    });
  }

  // Access to the underlying clients
  public getGraphQLClient(): ApolloClient<NormalizedCacheObject> {
    return this.apolloClient;
  }

  public getFieldServiceClient(): FieldServiceClient {
    return this.client;
  }

  // Report Queries
  public async report(reportType: string) {
    return this.apolloClient.query({
      query: queries.REPORT,
      variables: { reportType }
    });
  }

  // Vertex AI
  public async vertexChatCompletion(input: types.VertexChatCompletionInput) {
    return this.apolloClient.mutate({
      mutation: mutations.VERTEX_CHAT_COMPLETION,
      variables: { input }
    });
  }
  
}
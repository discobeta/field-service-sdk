import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FieldServiceClient, FieldServiceClientOptions } from './client';

// Import generated hooks and types
import {
  ClientInput, JobInput, EstimateInput, InvoiceInput, BusinessProfileInput,
  GetClientsQuery, GetClientQuery, GetJobsQuery, GetJobQuery, 
  GetEstimatesForJobQuery, GetEstimateQuery, GetInvoicesForJobQuery, GetInvoiceQuery,
  GetBusinessProfileQuery, GetCurrentAccountQuery, SignupInput, FileUploadInput,
  DeviceRegistrationInput, InviteUserInput, InvitationResponseInput,
  UpdateOrRegisterDeviceDocument,
  UpdateOrRegisterDeviceMutation,
  UserProfileInput,
  UserProfileType,
  UserType,
  AccountMemberType,
  AccountType,
  ClientType,
  JobType,
  EstimateType,
  UnsubscribeFromEmailsDocument,
  GetSubscriptionPlansQuery,
  SubscriptionPlanType
} from './generated/graphql';

// Import the GraphQL documents directly
import { gql } from '@apollo/client';

// Client queries & mutations
const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
      address1
      address2
      city
      state
      zipCode
      notes
      locationLatitude
      locationLongitude
      createdAt
      updatedAt
    }
  }
`;

const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    client(id: $id) {
      id
      name
      email
      phone
      address1
      address2
      city
      state
      zipCode
      notes
      locationLatitude
      locationLongitude
      createdAt
      updatedAt
    }
  }
`;

const CREATE_CLIENT = gql`
  mutation CreateClient($input: ClientInput!) {
    createClient(input: $input) {
      client {
        id
        name
        email
        phone
        address1
        address2
        city
        state
        zipCode
        notes
        locationLatitude
        locationLongitude
        createdAt
        updatedAt
      }
      success
      message
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: ID!, $input: ClientInput!) {
    updateClient(id: $id, input: $input) {
      client {
        id
        name
        email
        phone
        address1
        address2
        city
        state
        zipCode
        notes
        locationLatitude
        locationLongitude
        createdAt
        updatedAt
      }
      success
      message
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id) {
      success
      message
    }
  }
`;

// Job queries & mutations
const GET_JOBS = gql`
  query GetJobs($status: String, $clientId: ID, $assignedToId: ID) {
    jobs(status: $status, clientId: $clientId, assignedToId: $assignedToId) {
      id
      title
      description
      status
      scheduledDate
      dueDate
      createdAt
      updatedAt
      client {
        id
        name
        locationLatitude
        locationLongitude
        address1
        address2
        city
        state
        zipCode
        email
        phone
      }
      estimates {
        id
        date
        status
        total
        applyTaxes
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
      invoices {
        id
        date
        status
        total
        applyTaxes
        dueDate
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
    }
  }
`;

const GET_JOB = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      id
      title
      description
      status
      scheduledDate
      dueDate
      createdAt
      updatedAt
      client {
        id
        name
        locationLatitude
        locationLongitude
        address1
        address2
        city
        state
        zipCode
        email
        phone
      }
      estimates {
        id
        date
        status
        total
        applyTaxes
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
      invoices {
        id
        date
        status
        total
        applyTaxes
        dueDate
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
    }
  }
`;

const CREATE_JOB = gql`
  mutation CreateJob($input: JobInput!) {
    createJob(input: $input) {
      job {
        id
        title
        description
        status
        scheduledDate
        dueDate
        createdAt
        updatedAt
        client {
          id
          name
          locationLatitude
          locationLongitude
          address1
          address2
          city
          state
          zipCode
        }
      }
      success
      message
    }
  }
`;

const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $input: JobInput!) {
    updateJob(id: $id, input: $input) {
      job {
        id
        title
        description
        status
        scheduledDate
        dueDate
        createdAt
        updatedAt
        client {
          id
          name
          locationLatitude
          locationLongitude
          address1
          address2
          city
          state
          zipCode
        }
      }
      success
      message
    }
  }
`;

const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id) {
      success
      message
    }
  }
`;

// Estimate queries & mutations
const GET_ESTIMATES_FOR_JOB = gql`
  query GetEstimatesForJob($jobId: ID!) {
    estimatesForJob(jobId: $jobId) {
      id
      date
      status
      total
      applyTaxes
      createdAt
      updatedAt
      job {
        id
        title
      }
      lineItems {
        id
        title
        description
        price
        type
        taxType
      }
    }
  }
`;

const GET_ESTIMATE = gql`
  query GetEstimate($id: ID!) {
    estimate(id: $id) {
      id
      date
      status
      total
      applyTaxes
      createdAt
      updatedAt
      job {
        id
        title
      }
      lineItems {
        id
        title
        description
        price
        type
        taxType
      }
    }
  }
`;

const CREATE_ESTIMATE = gql`
  mutation CreateEstimate($input: EstimateInput!) {
    createEstimate(input: $input) {
      estimate {
        id
        date
        status
        total
        applyTaxes
        createdAt
        updatedAt
        job {
          id
          title
        }
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
      success
      message
    }
  }
`;

const UPDATE_ESTIMATE = gql`
  mutation UpdateEstimate($id: ID!, $input: EstimateInput!) {
    updateEstimate(id: $id, input: $input) {
      estimate {
        id
        date
        status
        total
        applyTaxes
        createdAt
        updatedAt
        job {
          id
          title
        }
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
      success
      message
    }
  }
`;

const DELETE_ESTIMATE = gql`
  mutation DeleteEstimate($id: ID!) {
    deleteEstimate(id: $id) {
      success
      message
    }
  }
`;

// Invoice queries & mutations
const GET_INVOICES_FOR_JOB = gql`
  query GetInvoicesForJob($jobId: ID!) {
    invoicesForJob(jobId: $jobId) {
      id
      date
      status
      total
      applyTaxes
      dueDate
      createdAt
      updatedAt
      job {
        id
        title
      }
      lineItems {
        id
        title
        description
        price
        type
        taxType
      }
    }
  }
`;

const GET_INVOICE = gql`
  query GetInvoice($id: ID!) {
    invoice(id: $id) {
      id
      date
      status
      total
      applyTaxes
      dueDate
      createdAt
      updatedAt
      job {
        id
        title
      }
      lineItems {
        id
        title
        description
        price
        type
        taxType
      }
    }
  }
`;

const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: InvoiceInput!) {
    createInvoice(input: $input) {
      invoice {
        id
        date
        status
        total
        applyTaxes
        dueDate
        createdAt
        updatedAt
        job {
          id
          title
        }
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
      success
      message
    }
  }
`;

const UPDATE_INVOICE = gql`
  mutation UpdateInvoice($id: ID!, $input: InvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
      invoice {
        id
        date
        status
        total
        applyTaxes
        dueDate
        createdAt
        updatedAt
        job {
          id
          title
        }
        lineItems {
          id
          title
          description
          price
          type
          taxType
        }
      }
      success
      message
    }
  }
`;

const DELETE_INVOICE = gql`
  mutation DeleteInvoice($id: ID!) {
    deleteInvoice(id: $id) {
      success
      message
    }
  }
`;

// Business Profile & Account queries/mutations
const GET_BUSINESS_PROFILE = gql`
  query GetBusinessProfile {
    businessProfile {
      id
      name
      email
      phone
      website
      logo
      address1
      address2
      city
      state
      zipCode
      taxServiceType
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_BUSINESS_PROFILE = gql`
  mutation UpdateBusinessProfile($input: BusinessProfileInput!) {
    updateBusinessProfile(input: $input) {
      businessProfile {
        id
        name
        email
        phone
        website
        logo
        address1
        address2
        city
        state
        zipCode
        taxServiceType
        createdAt
        updatedAt
      }
      success
      message
    }
  }
`;

const GET_CURRENT_ACCOUNT = gql`
  query GetCurrentAccount {
    currentAccount {
      id
      name
      createdAt
      
    }
  }
`;

// Auth Mutations
const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      success
      message
      userId
      accountId
    }
  }
`;

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
      message
    }
  }
`;

const TOKEN_AUTH = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      isAdmin
      accountId
      payload
    }
  }
`;

const GENERATE_DOCUMENT_PDF = gql`
  mutation GenerateDocumentPDF($jobId: ID!, $documentId: ID!, $documentType: String!) {
    generateDocumentPdf(
      jobId: $jobId
      documentId: $documentId
      documentType: $documentType
    ) {
      success
      message
      documentUrl
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation UploadFile($input: FileUploadInput!) {
    uploadFile(input: $input) {
      success
      message
      fileUrl
    }
  }
`;

const REGISTER_DEVICE = gql`
  mutation RegisterDevice($input: DeviceRegistrationInput!) {
    registerDevice(input: $input) {
      success
      message
      device {
        deviceToken
        deviceType
        isActive
        lastUsed
      }
    }
  }
`;

// Team management queries & mutations
const GET_ACCOUNT_MEMBERS = gql`
  query GetAccountMembers {
    accountMembers {
      id
      createdAt
      updatedAt
      isAdmin
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

const GET_PENDING_INVITATIONS = gql`
  query GetPendingInvitations {
    pendingInvitations {
      id
      email
      status
    }
  }
`;

const MY_INVITATIONS = gql`
  query MyInvitations {
    myInvitations {
      id
      email
      status
      token
      account {
        id
        name
      }
      invitedBy {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

const INVITE_USER = gql`
  mutation InviteUser($input: InviteUserInput!) {
    inviteUser(input: $input) {
      success
      message
      invitation {
        id
        email
        status
      }
    }
  }
`;

const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($input: InvitationResponseInput!) {
    acceptInvitation(input: $input) {
      success
      message
      account {
        id
        name
      }
    }
  }
`;

const REJECT_INVITATION = gql`
  mutation RejectInvitation($input: InvitationResponseInput!) {
    rejectInvitation(input: $input) {
      success
      message
    }
  }
`;

const REMOVE_MEMBER = gql`
  mutation RemoveMember($accountId: ID!, $memberId: ID!) {
    removeMember(accountId: $accountId, memberId: $memberId) {
      success
      message
    }
  }
`;

const CANCEL_INVITATION = gql`
  mutation CancelInvitation($invitationId: ID!) {
    cancelInvitation(invitationId: $invitationId) {
      success
      message
    }
  }
`;

// User Profile queries & mutations
const USER_PROFILE = gql`
  query userProfile {
    userProfile {
      id
      firstName
      lastName
      phoneNumber
      timezone
      createdAt
      updatedAt
      timezone
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      userProfile {
        id
        firstName
        lastName
        phoneNumber
        timezone
      }
      success
      message
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!) {
    changePassword(newPassword: $newPassword) {
      success
      message
    }
  }
`;

const VALIDATE_OTP_AND_RESET_PASSWORD = gql`
  mutation ValidateOTPAndResetPassword($email: String!, $otpCode: String!, $newPassword: String!) {
    validateOtpAndResetPassword(email: $email, otpCode: $otpCode, newPassword: $newPassword) {
      success
      message
    }
  }
`;

const EXPORT_DATA = gql`
  mutation ExportData {
    exportData {
      downloadUrl
      success
      message
    }
  }
`;

const UNSUBSCRIBE_FROM_EMAILS = gql`
  mutation UnsubscribeFromEmails($emailHash: String!, $source: String!) {
    unsubscribeFromEmails(emailHash: $emailHash, source: $source) {
      success
      message
    }
  }
`;

const GET_SUBSCRIPTION_PLANS = gql`
  query GetSubscriptionPlans {
    subscriptionPlans {
      id
      name
      description
      price
      currency
      period
      trialPeriodDays
      isActive
      createdAt
      updatedAt
      maxTeamMembers
      maxClients
      maxJobs
    }
  }
`;

const GET_MY_SUBSCRIPTION = gql`
  query GetMySubscription {
    mySubscription {
      id
      plan {
        id
        name
        description
        price
        currency
        period
        trialPeriodDays
        isActive
        maxTeamMembers
        maxClients
        maxJobs
      }
      status
      currentPeriodStart
      currentPeriodEnd
      cancelAtPeriodEnd
      createdAt
      updatedAt
    }
  }
`;

const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($planId: ID!, $successUrl: String!, $cancelUrl: String!) {
    createCheckoutSession(planId: $planId, successUrl: $successUrl, cancelUrl: $cancelUrl) {
      checkoutUrl
      sessionId
    }
  }
`;

const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription {
    cancelSubscription {
      success
    }
  }
`;

const UPDATE_SUBSCRIPTION = gql`
  mutation updateSubscription($planId: ID!, $prorationBehavior: String) {
    updateSubscription(planId: $planId, prorationBehavior: $prorationBehavior) {
      success
    }
  }
`;

const PREVIEW_SUBSCRIPTION_CHANGE = gql`
  mutation previewSubscriptionChange($planId: ID!, $prorationBehavior: String) {
    previewSubscriptionChange(planId: $planId, prorationBehavior: $prorationBehavior) {
      success
      preview {
        total
        nextBillingDate
        prorationDate
        prorationAmount
        currentPeriodEnd
        __typename
        currentPeriodEnd
      }
      error
    }
  }
`;

const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($description: String!, $pageUrl: String) {
    submitFeedback(description: $description, pageUrl: $pageUrl) {
      feedback {
        id
        user
        pageUrl
        description
        createdAt
      }
      success
      message
    }
  }
`;

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
      mutation: TOKEN_AUTH,
      variables: { email, password }
    });
    
    if (result.data?.tokenAuth?.token) {
      this.setToken(result.data.tokenAuth.token);
    }
    
    return result.data?.tokenAuth;
  }

  // Access to the underlying clients
  public getGraphQLClient(): ApolloClient<NormalizedCacheObject> {
    return this.apolloClient;
  }

  public getFieldServiceClient(): FieldServiceClient {
    return this.client;
  }

  // Clients
  public async getClients() {
    return this.apolloClient.query<GetClientsQuery>({
      query: GET_CLIENTS
    });
  }

  public async getClient(id: string) {
    return this.apolloClient.query<GetClientQuery>({
      query: GET_CLIENT,
      variables: { id }
    });
  }

  public async createClient(input: ClientInput) {
    console.log("SDK: Creating client with input:", input);
    console.log("SDK: Apollo client initialized:", !!this.apolloClient);
    console.log("SDK: API URL being used:", this.client.getBaseUrl());
    try {
      console.log("SDK: About to execute mutation");
      const result = await this.apolloClient.mutate({
        mutation: CREATE_CLIENT,
        variables: { input },
        refetchQueries: [{ query: GET_CLIENTS }]
      });
      console.log("SDK: Client creation result:", result);
      return result;
    } catch (error) {
      console.error("SDK: Error creating client:", error);
      console.error("SDK: Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
  }

  public async updateClient(id: string, input: ClientInput) {
    return this.apolloClient.mutate({
      mutation: UPDATE_CLIENT,
      variables: { id, input },
      refetchQueries: [
        { query: GET_CLIENTS },
        { query: GET_CLIENT, variables: { id } }
      ]
    });
  }

  public async deleteClient(id: string) {
    return this.apolloClient.mutate({
      mutation: DELETE_CLIENT,
      variables: { id },
      refetchQueries: [{ query: GET_CLIENTS }]
    });
  }

  // Jobs
  public async getJobs(options?: { status?: string, clientId?: string, assignedToId?: string }) {
    return this.apolloClient.query<GetJobsQuery>({
      query: GET_JOBS,
      variables: options
    });
  }

  public async getJob(id: string) {
    return this.apolloClient.query<GetJobQuery>({
      query: GET_JOB,
      variables: { id }
    });
  }

  public async createJob(input: JobInput) {
    return this.apolloClient.mutate({
      mutation: CREATE_JOB,
      variables: { input },
      refetchQueries: [
        { query: GET_JOBS },
        { query: GET_CLIENTS }
      ]
    });
  }

  public async updateJob(id: string, input: JobInput) {
    return this.apolloClient.mutate({
      mutation: UPDATE_JOB,
      variables: { id, input },
      refetchQueries: [
        { query: GET_JOBS },
        { query: GET_JOB, variables: { id } }
      ]
    });
  }

  public async deleteJob(id: string) {
    return this.apolloClient.mutate({
      mutation: DELETE_JOB,
      variables: { id },
      refetchQueries: [{ query: GET_JOBS }]
    });
  }

  // Estimates
  public async getEstimatesForJob(jobId: string) {
    return this.apolloClient.query<GetEstimatesForJobQuery>({
      query: GET_ESTIMATES_FOR_JOB,
      variables: { jobId }
    });
  }

  public async getEstimate(id: string) {
    return this.apolloClient.query<GetEstimateQuery>({
      query: GET_ESTIMATE,
      variables: { id }
    });
  }

  public async createEstimate(input: EstimateInput) {
    return this.apolloClient.mutate({
      mutation: CREATE_ESTIMATE,
      variables: { input },
      refetchQueries: [
        { query: GET_JOB, variables: { id: input.jobId } },
        { query: GET_ESTIMATES_FOR_JOB, variables: { jobId: input.jobId } }
      ]
    });
  }

  public async updateEstimate(id: string, input: EstimateInput) {
    return this.apolloClient.mutate({
      mutation: UPDATE_ESTIMATE,
      variables: { id, input },
      refetchQueries: [
        { query: GET_ESTIMATE, variables: { id } },
        { query: GET_ESTIMATES_FOR_JOB, variables: { jobId: input.jobId } },
        { query: GET_JOB, variables: { id: input.jobId } }
      ]
    });
  }

  public async deleteEstimate(id: string) {
    // We need to get the estimate first to know the jobId for refetching
    const estimateResult = await this.getEstimate(id);
    const jobId = estimateResult.data?.estimate?.job.id;
    
    return this.apolloClient.mutate({
      mutation: DELETE_ESTIMATE,
      variables: { id },
      refetchQueries: jobId ? [
        { query: GET_ESTIMATES_FOR_JOB, variables: { jobId } },
        { query: GET_JOB, variables: { id: jobId } }
      ] : []
    });
  }

  // Invoices
  public async getInvoicesForJob(jobId: string) {
    return this.apolloClient.query<GetInvoicesForJobQuery>({
      query: GET_INVOICES_FOR_JOB,
      variables: { jobId }
    });
  }

  public async getInvoice(id: string) {
    return this.apolloClient.query<GetInvoiceQuery>({
      query: GET_INVOICE,
      variables: { id }
    });
  }

  public async createInvoice(input: InvoiceInput) {
    return this.apolloClient.mutate({
      mutation: CREATE_INVOICE,
      variables: { input },
      refetchQueries: [
        { query: GET_JOB, variables: { id: input.jobId } },
        { query: GET_INVOICES_FOR_JOB, variables: { jobId: input.jobId } }
      ]
    });
  }

  public async updateInvoice(id: string, input: InvoiceInput) {
    return this.apolloClient.mutate({
      mutation: UPDATE_INVOICE,
      variables: { id, input },
      refetchQueries: [
        { query: GET_INVOICE, variables: { id } },
        { query: GET_INVOICES_FOR_JOB, variables: { jobId: input.jobId } },
        { query: GET_JOB, variables: { id: input.jobId } }
      ]
    });
  }

  public async deleteInvoice(id: string) {
    // We need to get the invoice first to know the jobId for refetching
    const invoiceResult = await this.getInvoice(id);
    const jobId = invoiceResult.data?.invoice?.job.id;
    
    return this.apolloClient.mutate({
      mutation: DELETE_INVOICE,
      variables: { id },
      refetchQueries: jobId ? [
        { query: GET_INVOICES_FOR_JOB, variables: { jobId } },
        { query: GET_JOB, variables: { id: jobId } }
      ] : []
    });
  }

  // Business Profile
  public async getBusinessProfile() {
    return this.apolloClient.query<GetBusinessProfileQuery>({
      query: GET_BUSINESS_PROFILE
    });
  }

  public async updateBusinessProfile(input: BusinessProfileInput) {
    return this.apolloClient.mutate({
      mutation: UPDATE_BUSINESS_PROFILE,
      variables: { input },
      refetchQueries: [{ query: GET_BUSINESS_PROFILE }]
    });
  }

  // Account
  public async getCurrentAccount() {
    return this.apolloClient.query<GetCurrentAccountQuery>({
      query: GET_CURRENT_ACCOUNT
    });
  }

  // Auth methods
  public async signup(input: SignupInput) {
    return this.apolloClient.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { input }
    });
  }

  public async generateDocumentPdf(jobId: string, documentId: string, documentType: string) {
    const result = await this.apolloClient.mutate({
      mutation: GENERATE_DOCUMENT_PDF,
      variables: {
        jobId,
        documentId,
        documentType
      }
    });

    return result.data?.generateDocumentPdf;
  }

  public async uploadFile(input: FileUploadInput) {
    const result = await this.apolloClient.mutate({
      mutation: UPLOAD_FILE,
      variables: { input }
    });
    return result.data?.uploadFile;
  }

  public async registerDevice(input: DeviceRegistrationInput) {
    return this.apolloClient.mutate({
      mutation: REGISTER_DEVICE,
      variables: { input }
    });
  }

  public async updateOrRegisterDevice(input: DeviceRegistrationInput) {
    const result = await this.apolloClient.mutate({
      mutation: UpdateOrRegisterDeviceDocument,
      variables: { input }
    });
    return result.data?.updateOrRegisterDevice;
  }

  // Account management methods
  public async getAccountMembers() {
    return this.apolloClient.query({
      query: GET_ACCOUNT_MEMBERS
    });
  }

  public async getPendingInvitations() {
    return this.apolloClient.query({
      query: GET_PENDING_INVITATIONS
    });
  }

  public async getMyInvitations() {
    return this.apolloClient.query({
      query: MY_INVITATIONS
    });
  }

  public async inviteUser(input: InviteUserInput) {
    return this.apolloClient.mutate({
      mutation: INVITE_USER,
      variables: { input }
    });
  }

  public async acceptInvitation(input: InvitationResponseInput) {
    return this.apolloClient.mutate({
      mutation: ACCEPT_INVITATION,
      variables: { input }
    });
  }

  public async rejectInvitation(input: InvitationResponseInput) {
    return this.apolloClient.mutate({
      mutation: REJECT_INVITATION,
      variables: { input }
    });
  }

  public async removeMember(accountId: string, memberId: string) {
    return this.apolloClient.mutate({
      mutation: REMOVE_MEMBER,
      variables: { accountId, memberId }
    });
  }

  public async cancelInvitation(invitationId: string) {
    return this.apolloClient.mutate({
      mutation: CANCEL_INVITATION,
      variables: { invitationId }
    });
  }

  // User Profile
  public async userProfile() {
    return this.apolloClient.query({
      query: USER_PROFILE
    });
  }
  
  public async updateUserProfile(input: UserProfileInput) {
    return this.apolloClient.mutate({
      mutation: UPDATE_USER_PROFILE,
      variables: { input }
    });
  }

  public async changePassword(newPassword: string) {
    return this.apolloClient.mutate({
      mutation: CHANGE_PASSWORD,
      variables: { newPassword }
    });
  }

  public async forgotPassword(email: string) {
    return this.apolloClient.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: { email }
    });
  }

  public async validateOtpAndResetPassword(email: string, otpCode: string, newPassword: string) {
    return this.apolloClient.mutate({
      mutation: VALIDATE_OTP_AND_RESET_PASSWORD,
      variables: { email, otpCode, newPassword }
    });
  }

  public async exportData() {
    const result = await this.apolloClient.mutate({
      mutation: EXPORT_DATA,
      variables: { }
    });
    return result.data?.exportData;
  }

  async unsubscribeFromEmails(emailHash: string, source: string) {
    return this.apolloClient.mutate({
      mutation: UNSUBSCRIBE_FROM_EMAILS,
      variables: {
        emailHash,
        source
      }
    })
  }

  public async getSubscriptionPlans() {
    return this.apolloClient.query<GetSubscriptionPlansQuery>({
      query: GET_SUBSCRIPTION_PLANS
    });
  }

  public async getMySubscription() {
    return this.apolloClient.query({
      query: GET_MY_SUBSCRIPTION
    });
  }

  public async createCheckoutSession(planId: string, successUrl: string, cancelUrl: string) {
    return this.apolloClient.mutate({
      mutation: CREATE_CHECKOUT_SESSION,
      variables: { planId, successUrl, cancelUrl }
    });
  }

  public async cancelSubscription() {
    return this.apolloClient.mutate({
      mutation: CANCEL_SUBSCRIPTION
    });
  }
  
  public async updateSubscription(planId: string, prorationBehavior: 'always_invoice' | 'create_prorations' | 'none') {
    return this.apolloClient.mutate({
      mutation: UPDATE_SUBSCRIPTION,
      variables: { planId, prorationBehavior }
    });
  }

  public async previewSubscriptionChange(planId: string, prorationBehavior: 'always_invoice' | 'create_prorations' | 'none') {
    return this.apolloClient.mutate({
      mutation: PREVIEW_SUBSCRIPTION_CHANGE,
      variables: { planId, prorationBehavior }
    });
  }

  async submitFeedback(description: string, pageUrl?: string) {
    return this.apolloClient.mutate({
      mutation: SUBMIT_FEEDBACK,
      variables: {
        description,
        pageUrl
      }
    });
  }

} 
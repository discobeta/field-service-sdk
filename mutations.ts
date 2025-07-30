import { gql } from '@apollo/client';

export const TOKEN_AUTH = gql`
mutation TokenAuth($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
  id
  email
  token
  isAdmin
  accountId
  payload
  refreshToken
  success
  message
  }
}`;

export const SIGNUP = gql`
mutation Signup($input: SignupInput!) {
  signup(input: $input) {
  success
  message
  accountId
  userId
  }
}`;

export const FORGOT_PASSWORD = gql`
mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
  success
  message
  }
}`;

export const VALIDATE_OTP_AND_RESET_PASSWORD = gql`
mutation ValidateOtpAndResetPassword($email: String!, $newPassword: String!, $otpCode: String!) {
  validateOtpAndResetPassword(email: $email, newPassword: $newPassword, otpCode: $otpCode) {
  success
  message
  }
}`;

export const CHANGE_PASSWORD = gql`
mutation ChangePassword($newPassword: String!) {
  changePassword(newPassword: $newPassword) {
  success
  message
  }
}`;

export const GET_USER_PROFILE = gql`
mutation GetUserProfile {
  getUserProfile {
  userProfile {
    id
    firstName
    lastName
    phoneNumber
    timezone
    agentLanguageCode
    agentVoice
    createdAt
    updatedAt
  }
  success
  message
  }
}`;

export const UPDATE_USER_PROFILE = gql`
mutation UpdateUserProfile($input: UserProfileInput!) {
  updateUserProfile(input: $input) {
  userProfile {
    id
    firstName
    lastName
    phoneNumber
    timezone
    agentLanguageCode
    agentVoice
    createdAt
    updatedAt
  }
  success
  message
  }
}`;

export const CREATE_CLIENT = gql`
mutation CreateClient($input: ClientInput!) {
  createClient(input: $input) {
  client {
    id
    createdAt
    updatedAt
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
    jobs {
      id
      createdAt
      updatedAt
      title
      description
      status
      scheduledDate
      dueDate
      estimates {
        id
        createdAt
        updatedAt
        date
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
      invoices {
        id
        createdAt
        updatedAt
        date
        dueDate
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
    }
    pk
    address1
    address2
    zipCode
    locationLatitude
    locationLongitude
  }
  success
  message
  }
}`;

export const UPDATE_CLIENT = gql`
mutation UpdateClient($id: ID!, $input: ClientInput!) {
  updateClient(id: $id, input: $input) {
  client {
    id
    createdAt
    updatedAt
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
    jobs {
      id
      createdAt
      updatedAt
      title
      description
      status
      scheduledDate
      dueDate
      estimates {
        id
        createdAt
        updatedAt
        date
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
      invoices {
        id
        createdAt
        updatedAt
        date
        dueDate
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
    }
    pk
    address1
    address2
    zipCode
    locationLatitude
    locationLongitude
  }
  success
  message
  }
}`;

export const DELETE_CLIENT = gql`
mutation DeleteClient($id: ID!) {
  deleteClient(id: $id) {
  success
  message
  }
}`;

export const VALIDATE_ADDRESS = gql`
mutation ValidateAddress($input: AddressValidationInput!) {
  validateAddress(input: $input) {
  validationResult {
    isValid
    formattedAddress
    placeId
    location {
      lat
      lng
    }
    addressComponents {
      streetAddress
      city
      state
      postalCode
      country
    }
    rawComponents
    message
  }
  success
  message
  }
}`;

export const UPDATE_BUSINESS_PROFILE = gql`
mutation UpdateBusinessProfile($input: BusinessProfileInput!) {
  updateBusinessProfile(input: $input) {
  businessProfile {
    id
    createdAt
    updatedAt
    account
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
    locationLatitude
    locationLongitude
    taxServiceType
  }
  success
  message
  }
}`;

export const CREATE_JOB = gql`
mutation CreateJob($input: JobInput!) {
  createJob(input: $input) {
  job {
    id
    createdAt
    updatedAt
    client {
      id
      createdAt
      updatedAt
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
      pk
      address1
      address2
      zipCode
      locationLatitude
      locationLongitude
    }
    title
    description
    status
    scheduledDate
    dueDate
    estimates {
      id
      createdAt
      updatedAt
      date
      status
      total
      applyTaxes
      lineItems {
        id
        createdAt
        updatedAt
        title
        description
        price
        type
        taxType
      }
    }
    invoices {
      id
      createdAt
      updatedAt
      date
      dueDate
      status
      total
      applyTaxes
      lineItems {
        id
        createdAt
        updatedAt
        title
        description
        price
        type
        taxType
      }
    }
  }
  success
  message
  }
}`;

export const UPDATE_JOB = gql`
mutation UpdateJob($id: ID!, $input: JobInput!) {
  updateJob(id: $id, input: $input) {
  job {
    id
    createdAt
    updatedAt
    client {
      id
      createdAt
      updatedAt
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
      pk
      address1
      address2
      zipCode
      locationLatitude
      locationLongitude
    }
    title
    description
    status
    scheduledDate
    dueDate
    estimates {
      id
      createdAt
      updatedAt
      date
      status
      total
      applyTaxes
      lineItems {
        id
        createdAt
        updatedAt
        title
        description
        price
        type
        taxType
      }
    }
    invoices {
      id
      createdAt
      updatedAt
      date
      dueDate
      status
      total
      applyTaxes
      lineItems {
        id
        createdAt
        updatedAt
        title
        description
        price
        type
        taxType
      }
    }
  }
  success
  message
  }
}`;

export const DELETE_JOB = gql`
mutation DeleteJob($id: ID!) {
  deleteJob(id: $id) {
  success
  message
  }
}`;

export const CREATE_ESTIMATE = gql`
mutation CreateEstimate($input: EstimateInput!) {
  createEstimate(input: $input) {
  estimate {
    id
    createdAt
    updatedAt
    job {
      id
      createdAt
      updatedAt
      client {
        id
        createdAt
        updatedAt
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
        pk
        address1
        address2
        zipCode
        locationLatitude
        locationLongitude
      }
      title
      description
      status
      scheduledDate
      dueDate
      invoices {
        id
        createdAt
        updatedAt
        date
        dueDate
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
    }
    date
    status
    total
    applyTaxes
    lineItems {
      id
      createdAt
      updatedAt
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
}`;

export const UPDATE_ESTIMATE = gql`
mutation UpdateEstimate($id: ID!, $input: EstimateInput!) {
  updateEstimate(id: $id, input: $input) {
  estimate {
    id
    createdAt
    updatedAt
    job {
      id
      createdAt
      updatedAt
      client {
        id
        createdAt
        updatedAt
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
        pk
        address1
        address2
        zipCode
        locationLatitude
        locationLongitude
      }
      title
      description
      status
      scheduledDate
      dueDate
      invoices {
        id
        createdAt
        updatedAt
        date
        dueDate
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
    }
    date
    status
    total
    applyTaxes
    lineItems {
      id
      createdAt
      updatedAt
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
}`;

export const DELETE_ESTIMATE = gql`
mutation DeleteEstimate($id: ID!) {
  deleteEstimate(id: $id) {
  success
  message
  }
}`;

export const CREATE_INVOICE = gql`
mutation CreateInvoice($input: InvoiceInput!) {
  createInvoice(input: $input) {
  invoice {
    id
    createdAt
    updatedAt
    job {
      id
      createdAt
      updatedAt
      client {
        id
        createdAt
        updatedAt
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
        pk
        address1
        address2
        zipCode
        locationLatitude
        locationLongitude
      }
      title
      description
      status
      scheduledDate
      dueDate
      estimates {
        id
        createdAt
        updatedAt
        date
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
    }
    date
    dueDate
    status
    total
    applyTaxes
    lineItems {
      id
      createdAt
      updatedAt
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
}`;

export const UPDATE_INVOICE = gql`
mutation UpdateInvoice($id: ID!, $input: InvoiceInput!) {
  updateInvoice(id: $id, input: $input) {
  invoice {
    id
    createdAt
    updatedAt
    job {
      id
      createdAt
      updatedAt
      client {
        id
        createdAt
        updatedAt
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
        pk
        address1
        address2
        zipCode
        locationLatitude
        locationLongitude
      }
      title
      description
      status
      scheduledDate
      dueDate
      estimates {
        id
        createdAt
        updatedAt
        date
        status
        total
        applyTaxes
        lineItems {
          id
          createdAt
          updatedAt
          title
          description
          price
          type
          taxType
        }
      }
    }
    date
    dueDate
    status
    total
    applyTaxes
    lineItems {
      id
      createdAt
      updatedAt
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
}`;

export const DELETE_INVOICE = gql`
mutation DeleteInvoice($id: ID!) {
  deleteInvoice(id: $id) {
  success
  message
  }
}`;

export const GENERATE_DOCUMENT_PDF = gql`
mutation GenerateDocumentPdf($documentId: ID!, $documentType: String!) {
  generateDocumentPdf(documentId: $documentId, documentType: $documentType) {
  success
  message
  documentUrl
  }
}`;

export const UPLOAD_FILE = gql`
mutation UploadFile($input: FileUploadInput!) {
  uploadFile(input: $input) {
  success
  message
  fileUrl
  }
}`;

export const UPDATE_OR_REGISTER_DEVICE = gql`
mutation UpdateOrRegisterDevice($input: DeviceRegistrationInput!) {
  updateOrRegisterDevice(input: $input) {
  success
  message
  device {
    deviceToken
    deviceType
    isActive
    lastUsed
    lastUpdated
  }
  }
}`;

export const INVITE_USER = gql`
mutation InviteUser($input: InviteUserInput!) {
  inviteUser(input: $input) {
  success
  message
  invitation {
    invitedBy
    email
    status
    id
  }
  }
}`;

export const ACCEPT_INVITATION = gql`
mutation AcceptInvitation($input: InvitationResponseInput!) {
  acceptInvitation(input: $input) {
  success
  message
  account {
    id
    name
    owner {
      id
      email
      firstName
      lastName
    }
    isActive
    subscriptionPlan {
      id
      name
      description
      price
      currency
      period
      trialPeriodDays
      isActive
      maxJobs
      maxClients
      maxTeamMembers
      createdAt
      updatedAt
    }
    subscriptionEndDate
    members {
      isAdmin
      id
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
  }
}`;

export const REJECT_INVITATION = gql`
mutation RejectInvitation($input: InvitationResponseInput!) {
  rejectInvitation(input: $input) {
  success
  message
  }
}`;

export const CANCEL_INVITATION = gql`
mutation CancelInvitation($invitationId: ID!) {
  cancelInvitation(invitationId: $invitationId) {
  success
  message
  }
}`;

export const REMOVE_MEMBER = gql`
mutation RemoveMember($accountId: ID!, $memberId: ID!) {
  removeMember(accountId: $accountId, memberId: $memberId) {
  success
  message
  }
}`;

export const EXPORT_DATA = gql`
mutation ExportData {
  exportData {
  success
  message
  downloadUrl
  }
}`;

export const UNSUBSCRIBE_FROM_EMAILS = gql`
mutation UnsubscribeFromEmails($emailHash: String!, $source: String!) {
  unsubscribeFromEmails(emailHash: $emailHash, source: $source) {
  success
  message
  }
}`;

export const CREATE_CHECKOUT_SESSION = gql`
mutation CreateCheckoutSession($cancelUrl: String!, $planId: ID!, $successUrl: String!) {
  createCheckoutSession(cancelUrl: $cancelUrl, planId: $planId, successUrl: $successUrl) {
  checkoutUrl
  sessionId
  success
  message
  }
}`;

export const CANCEL_SUBSCRIPTION = gql`
mutation CancelSubscription {
  cancelSubscription {
  success
  message
  }
}`;

export const PREVIEW_SUBSCRIPTION_CHANGE = gql`
mutation PreviewSubscriptionChange($planId: ID!, $prorationBehavior: String) {
  previewSubscriptionChange(planId: $planId, prorationBehavior: $prorationBehavior) {
  success
  preview {
    currentPeriodEnd
    prorationDate
    prorationAmount
    nextBillingDate
    total
  }
  message
  }
}`;

export const UPDATE_SUBSCRIPTION = gql`
mutation UpdateSubscription($planId: ID!, $prorationBehavior: String) {
  updateSubscription(planId: $planId, prorationBehavior: $prorationBehavior) {
  success
  message
  }
}`;

export const SUBMIT_FEEDBACK = gql`
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
}`;

export const REQUEST_ACCOUNT_DELETION = gql`
mutation RequestAccountDeletion {
  requestAccountDeletion {
  success
  message
  }
}`;

export const CONFIRM_ACCOUNT_DELETION = gql`
mutation ConfirmAccountDeletion($otpCode: String!) {
  confirmAccountDeletion(otpCode: $otpCode) {
  success
  message
  }
}`;

export const ENABLE_GOOGLE_SHEETS_INTEGRATION = gql`
mutation EnableGoogleSheetsIntegration($input: GoogleSheetsAuthInput!) {
  enableGoogleSheetsIntegration(input: $input) {
  success
  message
  spreadsheetUrl
  }
}`;

export const DISABLE_GOOGLE_SHEETS_INTEGRATION = gql`
mutation DisableGoogleSheetsIntegration {
  disableGoogleSheetsIntegration {
  success
  message
  }
}`;

export const SYNC_GOOGLE_SHEETS = gql`
mutation SyncGoogleSheets {
  syncGoogleSheets {
  success
  message
  }
}`;

export const SPEECH_TO_TEXT = gql`
mutation SpeechToText($input: SpeechToTextInput!) {
  speechToText(input: $input) {
  result {
    success
    transcription
    confidence
    error
  }
  }
}`;

export const DIALOGFLOW_DETECT_INTENT = gql`
mutation DialogflowDetectIntent($input: DialogflowInput!) {
  dialogflowDetectIntent(input: $input) {
  result {
    success
    fulfillmentText
    intentDisplayName
    intentConfidence
    action
    parameters
    error
  }
  }
}`;

export const TEXT_TO_SPEECH = gql`
mutation TextToSpeech($input: TextToSpeechInput!) {
  textToSpeech(input: $input) {
  result {
    success
    audioContent
    audioEncoding
    textLength
    error
  }
  }
}`;

export const GET_AVAILABLE_VOICES = gql`
mutation GetAvailableVoices($input: GetVoicesInput) {
  getAvailableVoices(input: $input) {
  result {
    success
    voices {
      name
      ssmlGender
      naturalSampleRateHertz
    }
    error
  }
  }
}`;

export const VERTEX_CHAT_COMPLETION = gql`
mutation VertexChatCompletion($input: VertexChatCompletionInput!) {
  vertexChatCompletion(input: $input) {
  result {
    success
    content
    model
    usage {
      promptTokens
      completionTokens
      totalTokens
    }
    finishReason
    error
    toolCalls {
      id
      type
      function {
        name
        arguments
      }
    }
    audioContent
  }
  }
}`;

export const VERTEX_CHAT_WITH_TOOLS = gql`
mutation VertexChatWithTools($input: VertexChatWithToolsInput!) {
  vertexChatWithTools(input: $input) {
  result {
    success
    content
    toolCalls {
      id
      type
      function {
        name
        arguments
      }
    }
    model
    finishReason
    error
  }
  }
}`;

export const VERTEX_CREATE_EMBEDDING = gql`
mutation VertexCreateEmbedding($input: VertexEmbeddingInput!) {
  vertexCreateEmbedding(input: $input) {
  result {
    success
    model
    usage {
      promptTokens
      completionTokens
      totalTokens
    }
    error
  }
  }
}`;

export const VERTEX_LIST_MODELS = gql`
mutation VertexListModels {
  vertexListModels {
  result {
    success
    models {
      id
      created
      ownedBy
    }
    error
  }
  }
}`;


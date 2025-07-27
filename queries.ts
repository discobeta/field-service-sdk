import { gql } from '@apollo/client';

export const AVAILABLE_VOICES = gql`
query AvailableVoices($input: GetVoicesInput) {
  availableVoices(input: $input) {
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

export const CURRENT_ACCOUNT = gql`
query CurrentAccount {
  currentAccount {
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
}`;

export const ACCOUNT_MEMBERS = gql`
query AccountMembers {
  accountMembers {
  user {
    id
    email
    firstName
    lastName
  }
  isAdmin
  id
  createdAt
  updatedAt
  }
}`;

export const PENDING_INVITATIONS = gql`
query PendingInvitations {
  pendingInvitations {
  invitedBy
  email
  status
  id
  }
}`;

export const CLIENTS = gql`
query Clients {
  clients {
  id
  createdAt
  updatedAt
  account
  createdBy
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
  jobs
  }
}`;

export const CLIENT = gql`
query Client($id: ID!) {
  client(id: $id) {
  id
  createdAt
  updatedAt
  account
  createdBy
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
  jobs
  }
}`;

export const BUSINESS_PROFILE = gql`
query BusinessProfile {
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
}`;

export const JOBS = gql`
query Jobs($status: String, $clientId: ID, $assignedToId: ID) {
  jobs(status: $status, clientId: $clientId, assignedToId: $assignedToId) {
  id
  createdAt
  updatedAt
  account
  createdBy
  assignedTo
  client
  title
  description
  status
  scheduledDate
  dueDate
  estimates
  invoices
  }
}`;

export const JOB = gql`
query Job($id: ID!) {
  job(id: $id) {
  id
  createdAt
  updatedAt
  account
  createdBy
  assignedTo
  client
  title
  description
  status
  scheduledDate
  dueDate
  estimates
  invoices
  }
}`;

export const ESTIMATE = gql`
query Estimate($id: ID!) {
  estimate(id: $id) {
  id
  createdAt
  updatedAt
  account
  createdBy
  job
  date
  status
  total
  applyTaxes
  lineItems
  }
}`;

export const INVOICES_FOR_JOB = gql`
query InvoicesForJob($jobId: ID!) {
  invoicesForJob(jobId: $jobId) {
  id
  createdAt
  updatedAt
  account
  createdBy
  job
  date
  dueDate
  status
  total
  applyTaxes
  lineItems
  }
}`;

export const INVOICE = gql`
query Invoice($id: ID!) {
  invoice(id: $id) {
  id
  createdAt
  updatedAt
  account
  createdBy
  job
  date
  dueDate
  status
  total
  applyTaxes
  lineItems
  }
}`;

export const ESTIMATES_FOR_JOB = gql`
query EstimatesForJob($jobId: ID!) {
  estimatesForJob(jobId: $jobId) {
  id
  createdAt
  updatedAt
  account
  createdBy
  job
  date
  status
  total
  applyTaxes
  lineItems
  }
}`;

export const ESTIMATES = gql`
query Estimates($status: String) {
  estimates(status: $status) {
  id
  createdAt
  updatedAt
  account
  createdBy
  job
  date
  status
  total
  applyTaxes
  lineItems
  }
}`;

export const MY_INVITATIONS = gql`
query MyInvitations {
  myInvitations {
  invitedBy {
    id
    email
    firstName
    lastName
  }
  email
  status
  id
  account {
    id
    name
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
  token
  }
}`;

export const USER_PROFILE = gql`
query UserProfile {
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
}`;

export const SUBSCRIPTION_PLANS = gql`
query SubscriptionPlans {
  subscriptionPlans {
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
}`;

export const MY_SUBSCRIPTION = gql`
query MySubscription {
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
    maxJobs
    maxClients
    maxTeamMembers
    createdAt
    updatedAt
  }
  status
  currentPeriodStart
  currentPeriodEnd
  cancelAtPeriodEnd
  createdAt
  updatedAt
  }
}`;

export const GOOGLE_SHEETS_INTEGRATION_STATUS = gql`
query GoogleSheetsIntegrationStatus {
  googleSheetsIntegrationStatus {
  isEnabled
  spreadsheetUrl
  lastSync
  }
}`;

export const INVOICES = gql`
query Invoices($status: String) {
  invoices(status: $status) {
  id
  createdAt
  updatedAt
  account
  createdBy
  job
  date
  dueDate
  status
  total
  applyTaxes
  lineItems
  }
}`;


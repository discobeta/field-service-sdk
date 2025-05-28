export { FieldServiceSDK } from './sdk';
export type { FieldServiceClientOptions } from './client';
export type {
  ClientInput,
  JobInput,
  EstimateInput,
  InvoiceInput,
  BusinessProfileInput,
  SignupInput,
  InviteUserInput,
  InvitationResponseInput,
  MyInvitationsType,
  AccountInvitationType,
  AccountType,
  UserType,
  AccountMemberType,
  ClientType,
  JobType,
  EstimateType,
  InvoiceType,
  UserProfileInput,
  UserProfileType,
} from './generated/graphql';

export interface Feedback {
  id: string;
  user: string;
  pageUrl?: string;
  description: string;
  createdAt: string;
} 
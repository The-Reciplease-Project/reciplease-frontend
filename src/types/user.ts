export type UserInfo = {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  [k: string]: unknown;
};

export type RateLimit = {
  limit?: number;
  remaining?: number;
  reset?: number; // UTC epoch seconds
};
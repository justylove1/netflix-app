export interface RawUserInterface {
  id: number;
  phone: string;
  fullname: string;
  avatar_url?: string;
  is_blocked: boolean;
  blocked_at?: string | null;
  birth_day?: string | null;
  class_name?: string | null;
  class_id?: string | null;
  status?: boolean;
  is_email_verified?: boolean;
  email_verified_date?: string | null;
  is_phone_verified?: boolean;
  phone_verified_date?: string | null;
  role?: string;
  password?: string;
  created_at?: string;
  updated_ad?: string;
}

export interface RawApiDataUserInterface {
  accessToken: string;
  user: RawUserInterface;
}

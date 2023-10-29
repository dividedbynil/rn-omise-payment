import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Cards: undefined;
  AddCard: undefined;
};

export type CardListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Cards">;
};

export type AddCardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "AddCard">;
};

interface Card {
  name: string;
  expiration_month: number;
  expiration_year: number;
  security_code: number;
}

export interface CardInput extends Card {
  number: string;
}

export type CardCardInput = {
  card: CardInput;
};

export interface CardRes {
  object: string;
  id: string;
  livemode: boolean;
  location: string | null;
  deleted: boolean;
  street1: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  phone_number: string | null;
  postal_code: string | null;
  country: string;
  financing: string;
  bank: string;
  brand: string;
  fingerprint: string;
  first_digits: string | null;
  last_digits: string;
  name: string;
  expiration_month: number;
  expiration_year: number;
  security_code_check: boolean;
  tokenization_method: string | null;
  created_at: string;
}

export interface CardResToken extends CardRes {
  token: string;
}

export interface ReturnJSON {
  card: CardRes;
  object: string;
  id: string;
  livemode: boolean;
  location: string;
  used: boolean;
  charge_status: string;
  created_at: string;
}

export interface Payment {
  description: string;
  amount: number;
  currency: string;
  card: string;
}

export interface Charge {
  object: string;
  id: string;
  location: string;
  amount: number;
  net: number;
  fee: number;
  fee_vat: number;
  interest: number;
  interest_vat: number;
  funding_amount: number;
  refunded_amount: number;
  transaction_fees: {
    fee_flat: string;
    fee_rate: string;
    vat_rate: string;
  };
  platform_fee: {
    fixed: null | number;
    amount: null | number;
    percentage: null | number;
  };
  currency: string;
  funding_currency: string;
  ip: null | string;
  refunds: {
    object: string;
    data: any[];
    limit: number;
    offset: number;
    total: number;
    location: string;
    order: string;
    from: string;
    to: string;
  };
  link: null | string;
  description: string;
  metadata: Record<string, any>;
  card: {
    object: string;
    id: string;
    livemode: boolean;
    location: null | string;
    deleted: boolean;
    street1: null | string;
    street2: null | string;
    city: null | string;
    state: null | string;
    phone_number: null | string;
    postal_code: null | string;
    country: string;
    financing: string;
    bank: string;
    brand: string;
    fingerprint: string;
    first_digits: null | string;
    last_digits: string;
    name: string;
    expiration_month: number;
    expiration_year: number;
    security_code_check: boolean;
    tokenization_method: null | string;
    created_at: string;
  };
  source: null | string;
  schedule: null | string;
  customer: null | string;
  dispute: null | string;
  transaction: string;
  failure_code: null | string;
  failure_message: null | string;
  status: string;
  authorize_uri: string;
  return_uri: string;
  created_at: string;
  paid_at: string;
  expires_at: string;
  expired_at: null | string;
  reversed_at: null | string;
  zero_interest_installments: boolean;
  branch: null | string;
  terminal: null | string;
  device: null | string;
  authorized: boolean;
  capturable: boolean;
  capture: boolean;
  disputable: boolean;
  livemode: boolean;
  refundable: boolean;
  partially_refundable: boolean;
  reversed: boolean;
  reversible: boolean;
  voided: boolean;
  paid: boolean;
  expired: boolean;
}

export interface Customer {
  id: string
  balance: number
  invoice_prefix: string
}

export interface CreateSubscriptionInput {
  price_id: string
}

export interface CreateSubscriptionOutput {
  clientSecret: string
  subscriptionId: string
}

export interface CreateSubscriptionLinkInput {
  price_id: string
}

export interface CreateSubscriptionLinkOutput {
  payment_link: string
}

export interface ReactivateSubscriptionInput {}

export interface ReactivateSubscriptionOutput {}

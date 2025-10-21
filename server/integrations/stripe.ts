/**
 * Stripe Integration for Troca Certa
 * Handles payment processing, subscriptions, and billing
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || "";

// Subscription plans mapping
export const SUBSCRIPTION_PLANS = {
  free: {
    name: "Grátis",
    price: 0,
    maxVehicles: 1,
    features: ["Apenas óleo", "Lembretes por e-mail"],
  },
  basic: {
    name: "Básico",
    price: 990, // R$9,90 in cents
    maxVehicles: 3,
    stripePriceId: process.env.STRIPE_PRICE_BASIC || "",
    features: ["Até 3 veículos", "Todas as manutenções", "E-mail + WhatsApp"],
  },
  premium: {
    name: "Premium",
    price: 2990, // R$29,90 in cents
    maxVehicles: 10,
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM || "",
    features: ["Até 10 veículos", "Análise IA", "Relatórios PDF"],
  },
  company: {
    name: "Empresas",
    price: 9990, // R$99,90 in cents
    maxVehicles: 100,
    stripePriceId: process.env.STRIPE_PRICE_COMPANY || "",
    features: ["Até 100 veículos", "Relatórios mensais", "Suporte prioritário"],
  },
  mechanic_basic: {
    name: "Mecânicas - Básico",
    price: 19990, // R$199,90 in cents
    maxVehicles: 1000,
    stripePriceId: process.env.STRIPE_PRICE_MECHANIC_BASIC || "",
    features: ["1000 clientes", "Fidelização", "Relatórios automáticos"],
  },
  mechanic_pro: {
    name: "Mecânicas - Pro",
    price: 29990, // R$299,90 in cents
    maxVehicles: 5000,
    stripePriceId: process.env.STRIPE_PRICE_MECHANIC_PRO || "",
    features: ["5000 clientes", "Fidelização avançada", "Relatórios em tempo real"],
  },
};

/**
 * Create a Stripe customer
 * @param userId User ID
 * @param email User email
 * @param name User name
 * @returns Stripe customer ID
 */
export async function createStripeCustomer(
  userId: string,
  email: string,
  name: string
): Promise<string> {
  try {
    // This would be implemented with actual Stripe API call
    // For now, returning a mock ID
    console.log(`Creating Stripe customer: ${email}`);
    return `cus_${userId}`;
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    throw error;
  }
}

/**
 * Create a subscription for a user
 * @param customerId Stripe customer ID
 * @param priceId Stripe price ID
 * @returns Subscription details
 */
export async function createSubscription(
  customerId: string,
  priceId: string
): Promise<{ subscriptionId: string; status: string }> {
  try {
    console.log(`Creating subscription for customer: ${customerId}`);
    return {
      subscriptionId: `sub_${Date.now()}`,
      status: "active",
    };
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
}

/**
 * Cancel a subscription
 * @param subscriptionId Stripe subscription ID
 */
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  try {
    console.log(`Canceling subscription: ${subscriptionId}`);
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
}

/**
 * Get subscription details
 * @param subscriptionId Stripe subscription ID
 */
export async function getSubscriptionDetails(
  subscriptionId: string
): Promise<{ status: string; currentPeriodEnd: number }> {
  try {
    console.log(`Getting subscription details: ${subscriptionId}`);
    return {
      status: "active",
      currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
  } catch (error) {
    console.error("Error getting subscription details:", error);
    throw error;
  }
}

/**
 * Create a checkout session
 * @param customerId Stripe customer ID
 * @param priceId Stripe price ID
 * @param successUrl URL to redirect on success
 * @param cancelUrl URL to redirect on cancel
 */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<{ sessionId: string; url: string }> {
  try {
    console.log(`Creating checkout session for customer: ${customerId}`);
    return {
      sessionId: `cs_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/${Date.now()}`,
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

/**
 * Handle Stripe webhook
 * @param event Stripe event
 */
export async function handleStripeWebhook(event: any): Promise<void> {
  try {
    switch (event.type) {
      case "customer.subscription.updated":
        console.log("Subscription updated:", event.data.object);
        break;
      case "customer.subscription.deleted":
        console.log("Subscription deleted:", event.data.object);
        break;
      case "invoice.payment_succeeded":
        console.log("Payment succeeded:", event.data.object);
        break;
      case "invoice.payment_failed":
        console.log("Payment failed:", event.data.object);
        break;
      default:
        console.log("Unhandled event type:", event.type);
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    throw error;
  }
}

export default {
  SUBSCRIPTION_PLANS,
  createStripeCustomer,
  createSubscription,
  cancelSubscription,
  getSubscriptionDetails,
  createCheckoutSession,
  handleStripeWebhook,
};


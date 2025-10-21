/**
 * Twilio Integration for Troca Certa
 * Handles SMS and WhatsApp notifications
 */

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "";
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || "";

/**
 * Send a maintenance reminder via SMS
 * @param phoneNumber Recipient phone number (with country code)
 * @param vehicleInfo Vehicle information
 * @param maintenanceType Maintenance type
 */
export async function sendMaintenanceReminderSMS(
  phoneNumber: string,
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
  },
  maintenanceType: string
): Promise<void> {
  try {
    const message = `Lembrete Troca Certa: Seu ${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year}) precisa de ${maintenanceType}. Agende sua revisao agora!`;
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    // Actual Twilio API call would go here
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

/**
 * Send a maintenance reminder via WhatsApp
 * @param phoneNumber Recipient phone number (with country code)
 * @param vehicleInfo Vehicle information
 * @param maintenanceType Maintenance type
 */
export async function sendMaintenanceReminderWhatsApp(
  phoneNumber: string,
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
  },
  maintenanceType: string
): Promise<void> {
  try {
    const message = `Lembrete Troca Certa: Seu ${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year}) precisa de ${maintenanceType}. Agende sua revisao agora!`;
    console.log(`Sending WhatsApp to ${phoneNumber}: ${message}`);
    // Actual Twilio WhatsApp API call would go here
  } catch (error) {
    console.error("Error sending WhatsApp:", error);
    throw error;
  }
}

/**
 * Send a welcome message via SMS
 * @param phoneNumber Recipient phone number
 * @param userName User name
 */
export async function sendWelcomeSMS(phoneNumber: string, userName: string): Promise<void> {
  try {
    const message = `Bem-vindo ao Troca Certa, ${userName}! Agora voce recebe lembretes inteligentes de manutencao. Acesse: trocacerta.com`;
    console.log(`Sending welcome SMS to ${phoneNumber}`);
    // Actual Twilio API call would go here
  } catch (error) {
    console.error("Error sending welcome SMS:", error);
    throw error;
  }
}

/**
 * Send a welcome message via WhatsApp
 * @param phoneNumber Recipient phone number
 * @param userName User name
 */
export async function sendWelcomeWhatsApp(phoneNumber: string, userName: string): Promise<void> {
  try {
    const message = `Bem-vindo ao Troca Certa, ${userName}! Agora voce recebe lembretes inteligentes de manutencao. Acesse: trocacerta.com`;
    console.log(`Sending welcome WhatsApp to ${phoneNumber}`);
    // Actual Twilio WhatsApp API call would go here
  } catch (error) {
    console.error("Error sending welcome WhatsApp:", error);
    throw error;
  }
}

/**
 * Send a payment confirmation via SMS
 * @param phoneNumber Recipient phone number
 * @param planName Plan name
 */
export async function sendPaymentConfirmationSMS(
  phoneNumber: string,
  planName: string
): Promise<void> {
  try {
    const message = `Pagamento confirmado! Voce agora esta no plano ${planName} do Troca Certa. Obrigado!`;
    console.log(`Sending payment confirmation SMS to ${phoneNumber}`);
    // Actual Twilio API call would go here
  } catch (error) {
    console.error("Error sending payment confirmation SMS:", error);
    throw error;
  }
}

/**
 * Send a payment confirmation via WhatsApp
 * @param phoneNumber Recipient phone number
 * @param planName Plan name
 */
export async function sendPaymentConfirmationWhatsApp(
  phoneNumber: string,
  planName: string
): Promise<void> {
  try {
    const message = `Pagamento confirmado! Voce agora esta no plano ${planName} do Troca Certa. Obrigado!`;
    console.log(`Sending payment confirmation WhatsApp to ${phoneNumber}`);
    // Actual Twilio WhatsApp API call would go here
  } catch (error) {
    console.error("Error sending payment confirmation WhatsApp:", error);
    throw error;
  }
}

/**
 * Validate phone number
 * @param phoneNumber Phone number to validate
 * @returns true if valid, false otherwise
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
  // Basic validation for international format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber.replace(/[\s-()]/g, ""));
}

export default {
  sendMaintenanceReminderSMS,
  sendMaintenanceReminderWhatsApp,
  sendWelcomeSMS,
  sendWelcomeWhatsApp,
  sendPaymentConfirmationSMS,
  sendPaymentConfirmationWhatsApp,
  validatePhoneNumber,
};


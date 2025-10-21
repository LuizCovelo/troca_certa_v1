/**
 * SendGrid Integration for Troca Certa
 * Handles email notifications and marketing communications
 */

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "noreply@trocacerta.com";

export interface EmailTemplate {
  templateId: string;
  subject: string;
  variables: Record<string, any>;
}

/**
 * Send a maintenance reminder email
 * @param to Recipient email
 * @param vehicleInfo Vehicle information
 * @param maintenanceType Maintenance type
 * @param nextDueKm Next due kilometers
 */
export async function sendMaintenanceReminder(
  to: string,
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
  },
  maintenanceType: string,
  nextDueKm: number
): Promise<void> {
  try {
    const emailContent = `
      <h2>Lembrete de Manutenção - ${vehicleInfo.brand} ${vehicleInfo.model}</h2>
      <p>Olá!</p>
      <p>Seu ${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year}) está próximo de atingir a quilometragem para a próxima manutenção.</p>
      <p><strong>Tipo de Manutenção:</strong> ${maintenanceType}</p>
      <p><strong>Próxima Revisão em:</strong> ${nextDueKm} km</p>
      <p>Agende sua revisão preventiva agora mesmo para manter seu veículo em perfeito estado!</p>
      <p>Atenciosamente,<br/>Equipe Troca Certa</p>
    `;

    console.log(`Sending maintenance reminder to ${to}`);
    // Actual SendGrid API call would go here
    // await sgMail.send({ to, from: SENDGRID_FROM_EMAIL, subject: `Lembrete de ${maintenanceType}`, html: emailContent });
  } catch (error) {
    console.error("Error sending maintenance reminder:", error);
    throw error;
  }
}

/**
 * Send a welcome email
 * @param to Recipient email
 * @param name User name
 */
export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  try {
    const emailContent = `
      <h2>Bem-vindo ao Troca Certa!</h2>
      <p>Olá ${name},</p>
      <p>Obrigado por se cadastrar no Troca Certa. Agora você pode gerenciar todas as manutenções do seu veículo de forma inteligente e receber lembretes automáticos.</p>
      <p><strong>Próximos passos:</strong></p>
      <ul>
        <li>Cadastre seu primeiro veículo</li>
        <li>Configure suas preferências de notificação</li>
        <li>Comece a receber lembretes inteligentes</li>
      </ul>
      <p>Qualquer dúvida, entre em contato conosco!</p>
      <p>Atenciosamente,<br/>Equipe Troca Certa</p>
    `;

    console.log(`Sending welcome email to ${to}`);
    // Actual SendGrid API call would go here
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}

/**
 * Send a monthly maintenance report
 * @param to Recipient email
 * @param userName User name
 * @param reportUrl URL to the PDF report
 */
export async function sendMonthlyReport(
  to: string,
  userName: string,
  reportUrl: string
): Promise<void> {
  try {
    const emailContent = `
      <h2>Seu Relatório Mensal de Manutenção</h2>
      <p>Olá ${userName},</p>
      <p>Segue em anexo seu relatório mensal de manutenção dos veículos.</p>
      <p><a href="${reportUrl}">Baixar Relatório</a></p>
      <p>Atenciosamente,<br/>Equipe Troca Certa</p>
    `;

    console.log(`Sending monthly report to ${to}`);
    // Actual SendGrid API call would go here
  } catch (error) {
    console.error("Error sending monthly report:", error);
    throw error;
  }
}

/**
 * Send a payment confirmation email
 * @param to Recipient email
 * @param userName User name
 * @param planName Plan name
 * @param amount Amount paid
 */
export async function sendPaymentConfirmation(
  to: string,
  userName: string,
  planName: string,
  amount: string
): Promise<void> {
  try {
    const emailContent = `
      <h2>Pagamento Confirmado!</h2>
      <p>Olá ${userName},</p>
      <p>Seu pagamento foi processado com sucesso!</p>
      <p><strong>Plano:</strong> ${planName}</p>
      <p><strong>Valor:</strong> ${amount}</p>
      <p>Obrigado por escolher Troca Certa!</p>
      <p>Atenciosamente,<br/>Equipe Troca Certa</p>
    `;

    console.log(`Sending payment confirmation to ${to}`);
    // Actual SendGrid API call would go here
  } catch (error) {
    console.error("Error sending payment confirmation:", error);
    throw error;
  }
}

/**
 * Send a password reset email
 * @param to Recipient email
 * @param resetLink Reset link
 */
export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  try {
    const emailContent = `
      <h2>Redefinir Sua Senha</h2>
      <p>Recebemos uma solicitação para redefinir sua senha.</p>
      <p><a href="${resetLink}">Clique aqui para redefinir sua senha</a></p>
      <p>Se você não solicitou isso, ignore este e-mail.</p>
      <p>Atenciosamente,<br/>Equipe Troca Certa</p>
    `;

    console.log(`Sending password reset email to ${to}`);
    // Actual SendGrid API call would go here
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

export default {
  sendMaintenanceReminder,
  sendWelcomeEmail,
  sendMonthlyReport,
  sendPaymentConfirmation,
  sendPasswordResetEmail,
};


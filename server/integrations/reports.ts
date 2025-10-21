/**
 * Reports Integration for Troca Certa
 * Generates PDF reports for maintenance history and summaries
 */

import { storagePut } from "../storage";

/**
 * Generate a maintenance history PDF report
 * @param userName User name
 * @param vehicleInfo Vehicle information
 * @param maintenanceHistory Array of maintenance records
 * @returns URL to the generated PDF
 */
export async function generateMaintenanceHistoryPDF(
  userName: string,
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
    licensePlate?: string;
  },
  maintenanceHistory: Array<{
    type: string;
    kmAtMaintenance: number;
    datePerformed: string;
    cost?: number;
    mechanic?: string;
  }>
): Promise<string> {
  try {
    // Create HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #0066cc; }
            .vehicle-info { background: #f0f0f0; padding: 10px; margin: 20px 0; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #0066cc; color: white; padding: 10px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            tr:nth-child(even) { background: #f9f9f9; }
            .total { font-weight: bold; background: #f0f0f0; }
          </style>
        </head>
        <body>
          <h1>Relatório de Manutenção - Troca Certa</h1>
          <p>Gerado em: ${new Date().toLocaleDateString("pt-BR")}</p>
          
          <div class="vehicle-info">
            <h2>${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year})</h2>
            ${vehicleInfo.licensePlate ? `<p>Placa: ${vehicleInfo.licensePlate}</p>` : ""}
            <p>Proprietário: ${userName}</p>
          </div>

          <h3>Histórico de Manutenção</h3>
          <table>
            <thead>
              <tr>
                <th>Tipo de Manutenção</th>
                <th>Quilometragem</th>
                <th>Data</th>
                <th>Mecânico</th>
                <th>Custo</th>
              </tr>
            </thead>
            <tbody>
              ${maintenanceHistory
                .map(
                  (m) => `
                <tr>
                  <td>${m.type}</td>
                  <td>${m.kmAtMaintenance.toLocaleString("pt-BR")} km</td>
                  <td>${new Date(m.datePerformed).toLocaleDateString("pt-BR")}</td>
                  <td>${m.mechanic || "-"}</td>
                  <td>R$ ${(m.cost || 0).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
              <tr class="total">
                <td colspan="4">Total Gasto em Manutenção</td>
                <td>R$ ${maintenanceHistory.reduce((sum, m) => sum + (m.cost || 0), 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <footer style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; color: #666; font-size: 12px;">
            <p>Troca Certa - Sistema Inteligente de Manutenção Automotiva</p>
            <p>www.trocacerta.com</p>
          </footer>
        </body>
      </html>
    `;

    // Convert HTML to PDF (using a library like weasyprint or html2pdf)
    // For now, we'll save the HTML as a simple text representation
    const fileName = `relatorio_manutencao_${vehicleInfo.brand}_${Date.now()}.pdf`;
    const { url } = await storagePut(`relatorios/${fileName}`, Buffer.from(htmlContent), "application/pdf");

    return url;
  } catch (error) {
    console.error("Error generating maintenance history PDF:", error);
    throw error;
  }
}

/**
 * Generate a monthly summary report
 * @param userName User name
 * @param vehicles Array of vehicles
 * @param maintenanceByVehicle Maintenance records grouped by vehicle
 * @returns URL to the generated PDF
 */
export async function generateMonthlySummaryPDF(
  userName: string,
  vehicles: Array<{
    id: string;
    brand: string;
    model: string;
  }>,
  maintenanceByVehicle: Record<
    string,
    Array<{
      type: string;
      datePerformed: string;
      cost?: number;
    }>
  >
): Promise<string> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #0066cc; }
            .vehicle-section { margin: 30px 0; page-break-inside: avoid; }
            .vehicle-section h2 { color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th { background: #0066cc; color: white; padding: 10px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h1>Resumo Mensal de Manutenção</h1>
          <p>Período: ${new Date().toLocaleDateString("pt-BR")}</p>
          <p>Proprietário: ${userName}</p>

          ${vehicles
            .map(
              (vehicle) => `
            <div class="vehicle-section">
              <h2>${vehicle.brand} ${vehicle.model}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Manutenção</th>
                    <th>Data</th>
                    <th>Custo</th>
                  </tr>
                </thead>
                <tbody>
                  ${(maintenanceByVehicle[vehicle.id] || [])
                    .map(
                      (m) => `
                    <tr>
                      <td>${m.type}</td>
                      <td>${new Date(m.datePerformed).toLocaleDateString("pt-BR")}</td>
                      <td>R$ ${(m.cost || 0).toFixed(2)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `
            )
            .join("")}

          <footer style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; color: #666; font-size: 12px;">
            <p>Troca Certa - Sistema Inteligente de Manutenção Automotiva</p>
          </footer>
        </body>
      </html>
    `;

    const fileName = `relatorio_mensal_${Date.now()}.pdf`;
    const { url } = await storagePut(`relatorios/${fileName}`, Buffer.from(htmlContent), "application/pdf");

    return url;
  } catch (error) {
    console.error("Error generating monthly summary PDF:", error);
    throw error;
  }
}

/**
 * Generate an invoice PDF
 * @param invoiceNumber Invoice number
 * @param userName User name
 * @param planName Plan name
 * @param amount Amount paid
 * @param date Invoice date
 * @returns URL to the generated PDF
 */
export async function generateInvoicePDF(
  invoiceNumber: string,
  userName: string,
  planName: string,
  amount: number,
  date: Date
): Promise<string> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #0066cc; margin: 0; }
            .invoice-details { margin: 20px 0; }
            .invoice-details p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th { background: #0066cc; color: white; padding: 10px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            .total { font-weight: bold; background: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>FATURA</h1>
            <p>Troca Certa - Sistema Inteligente de Manutenção Automotiva</p>
          </div>

          <div class="invoice-details">
            <p><strong>Número da Fatura:</strong> ${invoiceNumber}</p>
            <p><strong>Data:</strong> ${date.toLocaleDateString("pt-BR")}</p>
            <p><strong>Cliente:</strong> ${userName}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Assinatura - ${planName}</td>
                <td>1</td>
                <td>R$ ${(amount / 100).toFixed(2)}</td>
                <td>R$ ${(amount / 100).toFixed(2)}</td>
              </tr>
              <tr class="total">
                <td colspan="3">TOTAL</td>
                <td>R$ ${(amount / 100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <footer style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; color: #666; font-size: 12px;">
            <p>Obrigado por escolher Troca Certa!</p>
          </footer>
        </body>
      </html>
    `;

    const fileName = `fatura_${invoiceNumber}.pdf`;
    const { url } = await storagePut(`faturas/${fileName}`, Buffer.from(htmlContent), "application/pdf");

    return url;
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    throw error;
  }
}

export default {
  generateMaintenanceHistoryPDF,
  generateMonthlySummaryPDF,
  generateInvoicePDF,
};


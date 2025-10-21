/**
 * LLM Integration for Troca Certa
 * Uses Claude/GPT for intelligent maintenance analysis and recommendations
 */

import { invokeLLM } from "../_core/llm";

/**
 * Analyze maintenance history and suggest next maintenance
 * @param vehicleInfo Vehicle information
 * @param maintenanceHistory Array of past maintenance records
 * @param currentKm Current kilometers
 */
export async function analyzeMaintenance(
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
    fuelType: string;
  },
  maintenanceHistory: Array<{
    type: string;
    kmAtMaintenance: number;
    datePerformed: string;
  }>,
  currentKm: number
): Promise<string> {
  try {
    const historyText = maintenanceHistory
      .map((m) => `- ${m.type} em ${m.kmAtMaintenance}km (${m.datePerformed})`)
      .join("\n");

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em manutenção automotiva. Analise o histórico de manutenção e sugira as próximas ações recomendadas.",
        },
        {
          role: "user",
          content: `
Veículo: ${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year})
Tipo de Combustível: ${vehicleInfo.fuelType}
Quilometragem Atual: ${currentKm}km

Histórico de Manutenção:
${historyText}

Baseado neste histórico, quais são as próximas manutenções recomendadas? Seja conciso e prático.
          `,
        },
      ],
    });

    const content = response.choices[0].message.content;
    return typeof content === "string" ? content : "";
  } catch (error) {
    console.error("Error analyzing maintenance:", error);
    throw error;
  }
}

/**
 * Generate a maintenance report in natural language
 * @param vehicleInfo Vehicle information
 * @param maintenanceHistory Array of maintenance records
 * @param period Period for the report (e.g., "last 3 months")
 */
export async function generateMaintenanceReport(
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
  },
  maintenanceHistory: Array<{
    type: string;
    kmAtMaintenance: number;
    datePerformed: string;
    cost?: number;
  }>,
  period: string
): Promise<string> {
  try {
    const historyText = maintenanceHistory
      .map((m) => `- ${m.type} em ${m.kmAtMaintenance}km (${m.datePerformed}) - Custo: R$${m.cost || "N/A"}`)
      .join("\n");

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em manutenção automotiva. Gere um relatório profissional sobre o histórico de manutenção.",
        },
        {
          role: "user",
          content: `
Gere um relatório de manutenção para o período de ${period}:

Veículo: ${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year})

Manutenções Realizadas:
${historyText}

O relatório deve incluir: resumo das manutenções, gastos totais, e recomendações para o futuro.
          `,
        },
      ],
    });

    const content = response.choices[0].message.content;
    return typeof content === "string" ? content : "";
  } catch (error) {
    console.error("Error generating maintenance report:", error);
    throw error;
  }
}

/**
 * Answer a user question about vehicle maintenance
 * @param question User question
 * @param vehicleInfo Vehicle information
 */
export async function answerMaintenanceQuestion(
  question: string,
  vehicleInfo?: {
    brand: string;
    model: string;
    year: number;
  }
): Promise<string> {
  try {
    const vehicleContext = vehicleInfo
      ? `O usuário tem um ${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year}).`
      : "";

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em manutenção automotiva. Responda perguntas sobre manutenção de veículos de forma clara e prática.",
        },
        {
          role: "user",
          content: `${vehicleContext}\n\nPergunta: ${question}`,
        },
      ],
    });

    const content = response.choices[0].message.content;
    return typeof content === "string" ? content : "";
  } catch (error) {
    console.error("Error answering maintenance question:", error);
    throw error;
  }
}

/**
 * Predict maintenance needs based on vehicle age and usage
 * @param vehicleInfo Vehicle information
 * @param currentKm Current kilometers
 * @param yearsOwned Years the vehicle has been owned
 */
export async function predictMaintenanceNeeds(
  vehicleInfo: {
    brand: string;
    model: string;
    year: number;
    fuelType: string;
  },
  currentKm: number,
  yearsOwned: number
): Promise<Array<{ maintenance: string; estimatedKm: number; priority: "high" | "medium" | "low" }>> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em manutenção automotiva. Prediga as próximas manutenções necessárias baseado no histórico do veículo.",
        },
        {
          role: "user",
          content: `
Veículo: ${vehicleInfo.brand} ${vehicleInfo.model} (${vehicleInfo.year})
Tipo de Combustível: ${vehicleInfo.fuelType}
Quilometragem Atual: ${currentKm}km
Anos de Propriedade: ${yearsOwned}

Baseado nessas informações, liste as próximas 5 manutenções necessárias com:
1. Nome da manutenção
2. Quilometragem estimada
3. Prioridade (alta, média, baixa)

Responda em JSON com este formato:
[{"maintenance": "nome", "estimatedKm": 50000, "priority": "high"}]
          `,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "maintenance_predictions",
          strict: true,
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                maintenance: { type: "string" },
                estimatedKm: { type: "number" },
                priority: { type: "string", enum: ["high", "medium", "low"] },
              },
              required: ["maintenance", "estimatedKm", "priority"],
            },
          },
        },
      },
    });

    const content = response.choices[0].message.content;
    if (typeof content === "string") {
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    console.error("Error predicting maintenance needs:", error);
    return [];
  }
}

export default {
  analyzeMaintenance,
  generateMaintenanceReport,
  answerMaintenanceQuestion,
  predictMaintenanceNeeds,
};


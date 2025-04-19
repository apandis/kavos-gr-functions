import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

/**
 * Interface for interaction data
 */

interface Interaction {
  inquiryId: string;
  channel: "email" | "whatsapp" | "sms" | "phone";
  direction: "incoming" | "outgoing";
  messageId?: string;
  content: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

/**
 * Interface for response data
 */

interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Logs customer interactions for cruise inquiries
 */

export async function InteractionLogger(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    // Get interaction data from request body
    const interaction = (await request.json()) as Interaction;

    context.log(`Logging interaction for inquiry ID: ${interaction.inquiryId}`);

    // Validate basic interaction data
    if (
      !interaction.inquiryId ||
      !interaction.channel ||
      !interaction.direction ||
      !interaction.content
    ) {
      return {
        status: 400,
        jsonBody: {
          success: false,
          message:
            "Invalid interaction data. Required fields: inquiryId, channel, direction, content",
        } as ResponseData,
      };
    }

    // Add timestamp if not provided
    if (!interaction.timestamp) {
      interaction.timestamp = new Date().toISOString();
    }

    // In a real implementation, you would:
    // 1. Store the interaction in a database
    // 2. Update the inquiry record with the latest interaction
    // 3. Potentially trigger followup actions

    // For now, just log that we would store the interaction
    context.log(`Would store interaction: ${JSON.stringify(interaction)}`);

    return {
      status: 200,
      jsonBody: {
        success: true,
        message: "Interaction logged successfully",
        data: {
          interactionId: "generated-id-would-go-here",
          timestamp: interaction.timestamp,
        },
      } as ResponseData,
    };
  } catch (error: any) {
    context.error(`Error logging interaction: ${error.message}`);

    return {
      status: 500,
      jsonBody: {
        success: false,
        message: "Failed to log interaction: " + error.message,
      } as ResponseData,
    };
  }
}

// Register the HTTP function
app.http("InteractionLogger", {
  methods: ["POST"],
  authLevel: "anonymous", // Change to "function" for production
  handler: InteractionLogger,
});

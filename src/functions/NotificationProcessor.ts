import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

/**
 * Interface for cruise inquiry data
 */

interface CruiseInquiry {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  preferredCruise: string;
  cruiseType: "group" | "private";
  preferredDate: string;
  dateFlexibility: "exact" | "plus_minus_1" | "plus_minus_3" | "plus_minus_5";
  groupSize: number;
  specialRequests?: string;
  status: "new" | "contacted" | "booked" | "cancelled";
  legalConsent: boolean;
  metadata?: Record<string, any>;
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
 * Simple notification processor for cruise inquiries
 */

export async function NotificationProcessor(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    // Get inquiry data from request body
    const inquiry = (await request.json()) as CruiseInquiry;

    context.log(`Processing notification for inquiry ID: ${inquiry.id}`);

    // Validate basic inquiry data
    if (!inquiry || !inquiry.emailAddress || !inquiry.firstName) {
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: "Invalid inquiry data",
        } as ResponseData,
      };
    }

    // In a real implementation, you would:
    // 1. Send email using Azure Communication Services
    // 2. Send WhatsApp message using Twilio (if phone number provided)

    // For now, just log that we would send notifications
    context.log(`Would send email to: ${inquiry.emailAddress}`);

    if (inquiry.phoneNumber) {
      context.log(`Would send WhatsApp to: ${inquiry.phoneNumber}`);
    }

    return {
      status: 200,
      jsonBody: {
        success: true,
        message: `Successfully processed notification for ${inquiry.firstName} ${inquiry.lastName}`,
      } as ResponseData,
    };
  } catch (error: any) {
    context.error(`Error processing notification: ${error.message}`);

    return {
      status: 500,
      jsonBody: {
        success: false,
        message: "Failed to process notification: " + error.message,
      } as ResponseData,
    };
  }
}

// Register the HTTP function
app.http("NotificationProcessor", {
  methods: ["POST"],
  authLevel: "anonymous", // Change to "function" for production
  handler: NotificationProcessor,
});

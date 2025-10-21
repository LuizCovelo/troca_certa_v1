/**
 * Analytics Integration for Troca Certa
 * Handles Google Analytics and Meta Pixel tracking
 */

const GA_MEASUREMENT_ID = process.env.VITE_ANALYTICS_WEBSITE_ID || "";
const GA_API_SECRET = process.env.VITE_ANALYTICS_ENDPOINT || "";
const META_PIXEL_ID = process.env.META_PIXEL_ID || "";

/**
 * Track user signup event
 * @param userId User ID
 * @param plan Plan selected
 * @param email User email
 */
export async function trackSignup(userId: string, plan: string, email: string): Promise<void> {
  try {
    console.log(`Tracking signup: ${email} - Plan: ${plan}`);

    // Google Analytics event
    await trackGoogleAnalyticsEvent("sign_up", {
      user_id: userId,
      plan: plan,
      email: email,
    });

    // Meta Pixel event
    await trackMetaPixelEvent("Lead", {
      content_name: `Signup - ${plan}`,
      value: 0,
      currency: "BRL",
    });
  } catch (error) {
    console.error("Error tracking signup:", error);
  }
}

/**
 * Track vehicle creation event
 * @param userId User ID
 * @param brand Vehicle brand
 * @param model Vehicle model
 */
export async function trackVehicleCreated(userId: string, brand: string, model: string): Promise<void> {
  try {
    console.log(`Tracking vehicle creation: ${brand} ${model}`);

    await trackGoogleAnalyticsEvent("vehicle_created", {
      user_id: userId,
      vehicle_brand: brand,
      vehicle_model: model,
    });
  } catch (error) {
    console.error("Error tracking vehicle creation:", error);
  }
}

/**
 * Track subscription upgrade
 * @param userId User ID
 * @param fromPlan Previous plan
 * @param toPlan New plan
 * @param amount Amount paid
 */
export async function trackSubscriptionUpgrade(
  userId: string,
  fromPlan: string,
  toPlan: string,
  amount: number
): Promise<void> {
  try {
    console.log(`Tracking subscription upgrade: ${fromPlan} -> ${toPlan}`);

    await trackGoogleAnalyticsEvent("subscription_upgrade", {
      user_id: userId,
      from_plan: fromPlan,
      to_plan: toPlan,
      value: amount,
      currency: "BRL",
    });

    // Meta Pixel purchase event
    await trackMetaPixelEvent("Purchase", {
      content_name: `Upgrade to ${toPlan}`,
      value: amount / 100, // Convert cents to real
      currency: "BRL",
    });
  } catch (error) {
    console.error("Error tracking subscription upgrade:", error);
  }
}

/**
 * Track maintenance reminder sent
 * @param userId User ID
 * @param maintenanceType Type of maintenance
 */
export async function trackMaintenanceReminder(userId: string, maintenanceType: string): Promise<void> {
  try {
    console.log(`Tracking maintenance reminder: ${maintenanceType}`);

    await trackGoogleAnalyticsEvent("maintenance_reminder_sent", {
      user_id: userId,
      maintenance_type: maintenanceType,
    });
  } catch (error) {
    console.error("Error tracking maintenance reminder:", error);
  }
}

/**
 * Track page view
 * @param pagePath Page path
 * @param pageTitle Page title
 */
export async function trackPageView(pagePath: string, pageTitle: string): Promise<void> {
  try {
    await trackGoogleAnalyticsEvent("page_view", {
      page_path: pagePath,
      page_title: pageTitle,
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

/**
 * Send event to Google Analytics
 * @param eventName Event name
 * @param eventData Event data
 */
async function trackGoogleAnalyticsEvent(eventName: string, eventData: Record<string, any>): Promise<void> {
  try {
    const payload = {
      client_id: eventData.user_id || "anonymous",
      events: [
        {
          name: eventName,
          params: eventData,
        },
      ],
    };

    console.log(`Google Analytics Event: ${eventName}`, payload);
    // Actual Google Analytics API call would go here
    // const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`, {
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    // });
  } catch (error) {
    console.error("Error sending Google Analytics event:", error);
  }
}

/**
 * Send event to Meta Pixel
 * @param eventName Event name
 * @param eventData Event data
 */
async function trackMetaPixelEvent(eventName: string, eventData: Record<string, any>): Promise<void> {
  try {
    const payload = {
      data: [
        {
          event_name: eventName,
          event_data: eventData,
          event_id: `${Date.now()}_${Math.random()}`,
          event_time: Math.floor(Date.now() / 1000),
        },
      ],
    };

    console.log(`Meta Pixel Event: ${eventName}`, payload);
    // Actual Meta Pixel API call would go here
    // const response = await fetch(`https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_PIXEL_TOKEN}`, {
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    // });
  } catch (error) {
    console.error("Error sending Meta Pixel event:", error);
  }
}

export default {
  trackSignup,
  trackVehicleCreated,
  trackSubscriptionUpgrade,
  trackMaintenanceReminder,
  trackPageView,
};


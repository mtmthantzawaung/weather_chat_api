const admin = require("../config/firebase"); 

class NotificationService {
  static async sendNotification(token, title, body) {
    const message = {
      notification: {
        title,
        body,
      },
      token: token,
    };

    try {
      const response = await admin.messaging().send(message); 
      console.log(`Successfully sent to ${token}:`, response);
      return response;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  }

  static async sendMultipleNotification(tokens, title, body) {
    try {
      const response = await admin.messaging().sendEachForMulticast({
        tokens,
        notification: { title, body },
      });
      console.log(`Successfully sent to multiple users:`, response);
      return response;
    } catch (error) {
      console.error("Error sending notifications:", error);
      throw error;
    }
  }
}

module.exports = NotificationService;

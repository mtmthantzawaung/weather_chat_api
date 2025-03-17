const admin = require("../config/firebase");
const { getWeather } = require("../services/weatherService");
const User = require("../models/User");
const NotificationService = require("../services/notificationService");

const sendWeatherNotification = async () => {
  try {
    const data = await getWeather("Yangon");
    if (!data?.main?.temp) throw new Error("Invalid weather data received");
    
    const temperature = data.main.temp;
    console.log(`Current weather:`, data);
    console.log(`Current temperature: ${temperature}°C`);

    if (temperature >= 10) {
      const users = await User.find({ fcmToken: { $exists: true, $ne: null, $ne: "" } });
      for (const user of users) {
        try {
          console.log(`Sending notification to ${user.email}`);
          await NotificationService.sendNotification(
            user.fcmToken,
            "🔥 Heat Alert!",
            `Current temperature is ${temperature}°C. Stay hydrated!`
          );
          console.log(`Successfully sent to ${user._id}`);
        } catch (error) {
          console.error(`FCM Error for user ${user._id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("sendWeatherNotification Error:", error);
  }
};

module.exports = { sendWeatherNotification };

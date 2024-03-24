const Notification = require("../models/notificationSchema"); // Update the path to where your Notification model is defined

const createUserNotification = async ({ userId, message }) => {
  const notification = new Notification({
    userId,
    message,
    read: false, // Assuming a 'read' field to track if the notification has been read
  });

  await notification.save();
  console.log("Notification created for user:", userId);
};

module.exports = { createUserNotification };

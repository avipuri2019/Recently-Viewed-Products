const transporter = require("../config/transporter");

const sendNotificationEmail = async (email, product) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Product Viewed Notification",
      text: `You've viewed ${product.name} multiple times. Check it out here: ${product.url}`,
    });

    console.log("Notification email sent:", info.response);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
};

module.exports = sendNotificationEmail;

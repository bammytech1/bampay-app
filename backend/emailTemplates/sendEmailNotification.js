require("dotenv").config();

const getTradeStatusUpdateTemplate = (firstName, tradeStatus) => {
  const emailContent = {
    body: {
      name: firstName,
      intro: "Your trade status has been updated.",
      action: {
        instructions: `Your trade status is now: ${tradeStatus}. Please log in to your account for more details.`,
        button: {
          color: "#3869D4", // Optional action button color
          text: "View your trade",
          link: "http://Localhost:5173/dashboard",
        },
      },
      outro: "Thank you for using BamPay.",
    },
  };

  return emailContent;
};

module.exports = { getTradeStatusUpdateTemplate };

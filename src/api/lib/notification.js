import axios from "axios";

export const sendNotificationSvc = async (values) => {
  const URL = process.env.REACT_APP_STAGE === "prod" ? "https://api.instakash.net" : "https://api.dev.instakash.net";

  try {
    const response = await axios.post(`${URL}/public/api/v1/push-notification/all`, values, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status >= 400) throw response.errors[0];
  } catch (error) {
    throw error;
  }
};
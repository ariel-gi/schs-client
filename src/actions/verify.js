import * as api from "../api";

export const sendEmail = async (email) => {
  try {
    await api.requestEmail(email);
  } catch (error) {
    console.log(error.message);
  }
};

export const changePassword = async (formData) => {
  try {
    await api.changePassword(formData);
  } catch (error) {
    console.log(error.message);
  }
};

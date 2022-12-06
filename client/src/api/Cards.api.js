import axios from "axios";

export const getCardsRequest = async () =>
  await axios.get("http://localhost:8080/cards");

  export const getFormRequest = async () =>
  await axios.get("http://localhost:8080/paymentform");
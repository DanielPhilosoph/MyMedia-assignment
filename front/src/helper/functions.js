import Swal from "sweetalert2";
import { ALERT_TIME } from "../config/config";

export const fireErrorAlert = async (text) => {
  return await Swal.fire({
    position: "top-end",
    icon: "error",
    title: text,
    showConfirmButton: false,
    timer: ALERT_TIME,
  });
};

export const fireSuccessAlert = async (text) => {
  return await Swal.fire({
    position: "top-end",
    icon: "success",
    title: text,
    showConfirmButton: false,
    timer: ALERT_TIME,
  });
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(date) {
  try {
    let dateAsDate = new Date(date);
    const dateStr =
      ("00" + (dateAsDate.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + dateAsDate.getDate()).slice(-2) +
      "/" +
      dateAsDate.getFullYear() +
      " " +
      ("00" + dateAsDate.getHours()).slice(-2) +
      ":" +
      ("00" + dateAsDate.getMinutes()).slice(-2) +
      ":" +
      ("00" + dateAsDate.getSeconds()).slice(-2);
    return {
      date: dateStr,
    };
  } catch (error) {
    return { error: "Could not parse date" };
  }
}

export function areParamsDefined(...params) {
  let paramsDefined = true;
  console.log(params);
  params.forEach((param) => {
    if (!param) paramsDefined = false;
  });
  return paramsDefined;
}

export function isNameValid(param) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(param);
}

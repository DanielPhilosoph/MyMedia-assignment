import Swal from "sweetalert2";

const ALERT_TIME = 1500; //* 1.5 seconds

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
    return {
      date: new Date(date)
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, ""),
    };
  } catch (error) {
    return { error: "Could not parse date" };
  }
}

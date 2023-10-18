import { toast } from "react-toastify";

//Create toastify
export const createToast = (msg, type = "error") => {
  toast[type](msg);
};

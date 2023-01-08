import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import { useAuthContext } from "context/AuthContext";
import { EntryRequestData } from "types/types";

export default function useAxios() {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  async function setConfig() {
    const token = await currentUser?.getIdToken();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  }

  const handleAxiosError = (err: any) => {
    let message;
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.error(err.response);
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.log("Error", err.message);
        console.error(err.config);
      }
    } else {
      message = String(err);
      console.error(message);
    }
  };

  async function axioRequest(
    method: "post" | "patch" | "delete",
    url: string,
    onSuccess?: { msg: string; redirectUrl: string },
    onFailure?: { msg: string; redirectUrl: string },
    data?: EntryRequestData | any
  ) {
    const config = await setConfig();
    const sendRequest = () => {
      if (method === "post") {
        return axios.post(url, data, config);
      } else if (method === "patch") {
        return axios.patch(url, data, config);
      } else {
        return axios.delete(url, config);
      }
    };

    try {
      const response = await sendRequest();
      if (response.status === 200) {
        if (onSuccess) {
          toast.success(onSuccess.msg);
          router.push(onSuccess?.redirectUrl);
        }
      } else {
        if (onFailure) {
          toast.error(onFailure.msg);
        }
      }
    } catch (err) {
      handleAxiosError(err);
    }
  }

  return {
    axioRequest,
  };
}

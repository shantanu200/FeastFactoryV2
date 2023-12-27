import axios, { AxiosResponse } from "axios";

interface APIResponse {
  success: boolean;
  loading: boolean;
  data?: any;
  error?: string;
  message?: string;
}

const ActionHandler = async (
  action: string,
  url: string,
  data: any = {},
  headers: any = {}
): Promise<AxiosResponse | undefined> => {
  switch (action) {
    case "GET":
      return await axios.get(url, headers);
    case "POST":
      return await axios.post(url, data, headers);
    case "PUT":
      return await axios.put(url, data, headers);
    case "DELETE":
      return await axios.delete(url, headers);
    case "PATCH":
      return await axios.patch(url, data, headers);
    default:
      return undefined;
  }
};

export async function APIHandler(
  action: string,
  url: string,
  data: any = {},
  headers: any = {}
): Promise<APIResponse> {
  try {
    const response = await ActionHandler(action, url, data, headers);
    if (response) {
      if (response.status >= 200 && response.status <= 299) {
        return {
          success: true,
          loading: false,
          data: response.data,
          message: response.data.message,
        };
      }
      return {
        success: false,
        loading: true,
        error: response.data.error,
      };
    }
    return {
      success: false,
      loading: true,
      error: "Unknown Action is passed",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        loading: true,
        message: "Axios API request failed",
        error: error.response?.data.error,
      };
    }
    return {
      success: false,
      loading: true,
      error: "API request failed",
    };
  }
}

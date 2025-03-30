import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

const httpClient = (baseURL = API_URL) => {
  const token = localStorage.getItem("_auth_accessToken");

  const instance = axios.create({
    baseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    timeout: 1200000, // Set a 1200-second timeout
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add additional logic if needed before sending the request
      const updatedToken = localStorage.getItem("_auth_accessToken");
      if (updatedToken) {
        config.headers.Authorization = `Bearer ${updatedToken}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => {
      // Handle success
      if (response.status === 200 && response.data?.success === false) {
        // Throw an error if success is explicitly false
        throw new Error(response.data?.message || "An error occurred.");
      }
      return response.data; // Return only the response data for easier usage
    },
    async (error) => {
      // Handle errors
      if (error.response) {
        // Extract error details
        const { status, data } = error.response;

        if (status === 401) {
          // Handle token expiration
          console.warn("Token expired. Attempting to refresh token...");
          try {
            // Example: Refresh token logic (update this with your implementation)
            const refreshToken = localStorage.getItem("_auth_refreshToken");
            if (refreshToken) {
              const refreshResponse = await axios.post(
                `${API_URL}/auth/refresh`,
                { token: refreshToken }
              );
              localStorage.setItem(
                "_auth_accessToken",
                refreshResponse.data.accessToken
              );

              // Retry the failed request with the new token
              error.config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
              return instance(error.config); // Retry the original request
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // Redirect to login or handle appropriately
            window.location.href = "/login";
          }
        }

        // Log error details for debugging
        if (import.meta.env.VITE_ENV === "development") {
          console.error("API Error:", {
            status,
            message: data?.message || "Unknown error",
            details: data,
          });
        }

        if (data?.message === "Unauthorized") {
          console.log(
            "You are unauthorized, so we are logging you out... please try again ;)"
          );

          localStorage.removeItem("_auth_accessToken");
          localStorage.removeItem("_auth_selected_profile");
          localStorage.removeItem("_auth_user");
        }

        toast.error(data?.message || "An error occurred.");

        // Standardize error response
        return Promise.reject({
          status,
          message: data?.message || "Something went wrong",
          data,
        });
      } else if (error.request) {
        // No response received from server
        console.error("No response from server:", error.request);
        console.log(error?.config?.url);

        // amplitude.getInstance().logEvent("No response from server", {
        //   url: error?.config?.url,
        //   data: error?.config?.data,
        //   env: import.meta.env.VITE_ENV,
        //   method: error?.config?.method,
        // });

        toast.error("No response from server. Please try again later.");
        return Promise.reject({
          message: "No response from server. Please try again later.",
        });
      } else {
        // Other errors
        console.error("Request setup error:", error.message);
        return Promise.reject({ message: error.message });
      }
    }
  );

  return instance;
};

export default httpClient;

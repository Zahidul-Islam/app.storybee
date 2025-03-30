// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import User from "@/types/user"; // custom user interface
import {
  loginWithLinkedinRequest,
  linkedinCallbackRequest,
  loginWithEmailRequest,
  signupWithEmailRequest,
  googleCallbackRequest,
} from "@/services/authService";
import httpClient from "@/lib/httpClient";

interface AuthContextValue {
  loadingCheck: boolean;
  loading: boolean;
  isAuthenticated: boolean | null;
  accessToken: string | null;
  user: User | any; // use typed definition if you have it
  userProfile: any; // use typed definition if you have it
  setUserProfile: any;
  validateToken: (userId: string) => Promise<void>;
  saveUserData: (params: { user: User; token?: string }) => Promise<void>;
  logout: () => Promise<void>;
  loginWithLinkedin: () => Promise<void>;
  linkedinCallback: (code: string) => Promise<void>;
  googleCallback: (code: any) => Promise<void>;

  handleUserRedirect: (user: User) => void;

  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (params: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;

  confirmEmail: (params: { token: string | null }) => Promise<void>;
  resendEmail: (params: { email: string | null }) => Promise<void>;
  forgotPassword: (params: { email: string }) => Promise<void>;
  newPassword: (params: { token: string; password: string }) => Promise<void>;
  changePassword: (params: {
    currentPassword: string;
    newPassword: string;
    reset: any;
  }) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | any>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    localStorage.removeItem("schedulePostLoadings");
  }, []);

  const checkAuth = async () => {
    try {
      if (pathname.includes("restricted/linkedin/carousel")) {
        setIsAuthenticated(false);
        return;
      }

      setLoadingCheck(true);

      // Load from localStorage
      const storedUser = localStorage.getItem("_auth_user");
      const storedToken = localStorage.getItem("_auth_accessToken");

      if (!storedUser || !storedToken) {
        setIsAuthenticated(false);
        toast.error("User not logged in");
        logout();
        return;
      }

      const userObj: User = JSON.parse(storedUser);
      if (!userObj?._id) {
        setIsAuthenticated(false);
        toast.error("User not found");
        logout();
        return;
      }

      // All good
      setUser(userObj);
      setAccessToken(storedToken);
      setIsAuthenticated(true);

      // If needed, redirect checks
      handleUserRedirect(userObj);

      // Validate token
      validateToken(userObj._id);

      // // Optionally, fetch profiles
      // await getLinkedinProfiles();
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
    } finally {
      setLoadingCheck(false);
    }
  };

  const validateToken = async (userId: string) => {
    console.log("Validating token for user:", userId);
    if (!userId) {
      toast.warning("User id not found. Please login again.");
      return;
    }

    try {
      const res = await httpClient().get(`/users/${userId}`);
      console.log("Token validated:", res.data);
      const updatedUser: User = res.data;

      // check if updatedUser and user are the same with all fields
      if (JSON.stringify(updatedUser) === JSON.stringify(user)) {
        console.log("User is the same");
        return;
      } else {
        console.log("User is different");
        setUser(updatedUser);
        localStorage.setItem("_auth_user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Token invalid:", err);
      logout();
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Call your login service here
      const { token, data: userData } = await loginWithEmailRequest(
        email,
        password
      );

      console.log("Login with email", userData, token);

      await saveUserData({ user: userData, token });
      setTimeout(() => {
        handleUserRedirect(userData);
      }, 500);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const signupWithEmail = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // Call your signup service here
      const { token, data, message } = await signupWithEmailRequest({
        firstName,
        lastName,
        email,
        password,
      });

      if (!token) {
        toast.error(message);
        navigate(data?.redirect || "/login");
        return;
      }

      const userData = data;
      console.log("Signup with email", userData, token);

      await saveUserData({ user: userData, token });
      setTimeout(() => {
        handleUserRedirect(userData);
      }, 500);
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmEmail = async ({ token }: { token: string | null }) => {
    if (!token || token.length < 5) {
      toast.error("Invalid token.");
      return;
    }
    const accessToken = localStorage.getItem("_auth_accessToken") as any;

    setLoading(true);

    httpClient()
      .post(`/auth/local/email-verify/${token}`)
      .then(async (res: any) => {
        console.log(res.data);
        const user = res.data;
        const token = res.token;
        // const data = res.data.data;
        await saveUserData({
          user,
          token,
        });
        setLoading(false);

        setTimeout(() => {
          handleUserRedirect(user);
        }, 500);

        // toast.success(`Welcome, ${getUsername({ user: data })}`);

        // if (!data.account?.config?.onboarding?.welcome) navigate("/onboarding");
        // else {
        //   const redirectUrl = localStorage?.getItem("redirectUrl");
        //   if (redirectUrl && redirectUrl.length > 0) {
        //     navigate(redirectUrl);
        //     localStorage.removeItem("redirectUrl");
        //   } else {
        //     navigate("/");
        //   }
        // }
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        // navigate("/signup");

        // toast.error(err?.response?.data?.message || err.message);
        setLoading(false);
      });
  };

  const resendEmail = async ({ email }: { email: string | null }) => {
    setLoading(true);
    await httpClient()
      .post("/auth/local/resend-email", { email })
      .then((res: any) => {
        if (res.message) {
          toast.success(res.message);
        }

        if (res.data.redirect) {
          navigate(res.data.redirect);
          return;
        }

        console.log(res.data);
        toast.success("Email sent successfully. Please check your inbox.");
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err?.response?.data?.message || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const forgotPassword = async ({ email }: { email: string }) => {
    console.log(email);
    setLoading(true);
    httpClient()
      .post("/auth/local/reset-password", { email: email.toLowerCase() })
      .then((res) => {
        console.log(res.data);
        toast.success("Email sent successfully. Please check your inbox.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const newPassword = async ({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) => {
    setLoading(true);
    httpClient()
      .post(`/auth/local/reset-password/${token}`, { password })
      .then((res) => {
        console.log(res.data);

        toast.success(
          "Password reset successfully. Please login with your new password."
        );
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err?.response?.data?.message || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changePassword = async ({
    currentPassword,
    newPassword,
    reset,
  }: {
    currentPassword: string;
    newPassword: string;
    reset: any;
  }) => {
    setLoading(true);
    httpClient()
      .post("/auth/change-password", {
        currentPassword,
        newPassword,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Password changed successfully.");
        reset();
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err?.response?.data?.message || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginWithLinkedin = async () => {
    setLoading(true);
    try {
      const authUrl = await loginWithLinkedinRequest();
      if (authUrl) {
        window.location.replace(authUrl);
      }
    } catch (err) {
      console.error("LinkedIn login error:", err);
      toast.error("Failed to start LinkedIn login.");
    } finally {
      setLoading(false);
    }
  };

  const linkedinCallback = async (code: string) => {
    setLoading(true);
    try {
      const { token, data: userData } = await linkedinCallbackRequest(code);
      console.log("calling before saveUserData");

      await saveUserData({ user: userData, token });
      // await getLinkedinProfiles();

      console.log("calling after saveUserData");
      // Redirect user to appropriate

      setTimeout(() => {
        handleUserRedirect(userData);
      }, 500);
    } catch (err) {
      console.error("LinkedIn callback error:", err);
      toast.error("Failed to login with LinkedIn");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const googleCallback = async (code: string) => {
    setLoading(true);
    try {
      const { token, data: userData } = await googleCallbackRequest(code);
      console.log("calling before saveUserData");

      await saveUserData({ user: userData, token });
      // await getLinkedinProfiles();

      console.log("calling after saveUserData");
      // Redirect user to appropriate

      navigate("/");
    } catch (err) {
      console.error("LinkedIn callback error:", err);
      toast.error("Failed to login with LinkedIn");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async ({
    user,
    token,
  }: {
    user: User;
    token?: string;
  }) => {
    setLoading(true);
    try {
      console.log("calling saveUserData 1");
      if (!user?._id) {
        toast.error("User ID not found");
        logout();
        return;
      }
      setUser(user);
      setUserProfile(user.profile);
      if (token) {
        setAccessToken(token);
        localStorage.setItem("_auth_accessToken", token);
      }
      localStorage.setItem("_auth_user", JSON.stringify(user));
      setIsAuthenticated(true);
      console.log("calling saveUserData 2");
    } catch (error) {
      console.error("Error saving user data:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      console.log("calling saveUserData 3");
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("_auth_user");
      localStorage.removeItem("_auth_accessToken");
      setUser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const unrestrictedRoutes = [
    "/settings/channels",
    "/channels/linkedin",
    "/channels/linkedin/connect",
    // "/login",
    // "/signup",
  ];

  const handleUserRedirect = (user: User) => {
    if (isAuthenticated === null) {
      return;
    }

    // If user is already on an unrestricted route, do nothing
    if (
      unrestrictedRoutes.some((route: string) => pathname?.startsWith(route))
    ) {
      console.log("We are on an unrestricted route");
      return;
    }

    // check if there was a local storage redirect
    const redirectUrl = localStorage?.getItem("redirectUrl");
    if (redirectUrl && redirectUrl.length > 0) {
      navigate(redirectUrl);
      localStorage.removeItem("redirectUrl");
      return;
    }

    if (!user?.tokens) {
      return;
    }

    // // check if user is onboarding
    // if (
    //   !user?.onboarding?.configuredProfile &&
    //   user?.tokens?.linkedin?.management?.access_token
    // ) {
    //   navigate("/onboarding");
    //   return;
    // }

    if (!user?.tokens?.linkedin?.management?.access_token) {
      navigate("/settings/channels");
      return;
    }

    // if (
    //   !user?.tokens?.linkedin?.management?.access_token &&
    //   !user?.onboarding?.configuredProfile
    // ) {
    //   console.log("HIIIIII from 1");
    //   //
    //   connectLinkedinProfiles();
    // } else {
    //   if (!user?.onboarding?.configuredProfile) {
    //     console.log("HIIIIII from 2");
    //     console.log(
    //       "user========================",
    //       user?.onboarding?.configuredProfile,
    //     );
    //     // navigate("/onboarding");
    //   } else if (!user?.tokens?.linkedin?.management?.access_token) {
    //     console.log("HIIIIII from 3");
    //     // navigate("/settings/channels", { replace: true });
    //     navigate("/settings/channels");
    //     // connectLinkedinProfiles();

    //     console.log("HIIIIII from 4");
    //   }
    // }

    // else, do nothing or navigate to home
  };

  // Possibly show a loading spinner instead of children
  if (loadingCheck) {
    return <div>"Loading your session..."</div>;
  }

  const connectLinkedinProfiles = async () => {
    setLoading(true);
    httpClient()
      .get(`/linkedin/api`)
      .then((res: any) => {
        console.log(res.data);

        if (res.data.includes("linkedin.com")) {
          window.location.replace(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value: AuthContextValue = {
    loadingCheck,
    loading,
    isAuthenticated,
    accessToken,
    user,
    userProfile,
    setUserProfile,
    validateToken,
    saveUserData,
    logout,
    loginWithLinkedin,
    linkedinCallback,
    googleCallback,
    handleUserRedirect,
    //
    loginWithEmail,
    signupWithEmail,

    confirmEmail,
    resendEmail,
    forgotPassword,
    newPassword,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

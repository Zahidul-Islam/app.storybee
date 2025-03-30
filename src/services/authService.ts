// authService.ts
import httpClient from "@/lib/httpClient";

export async function loginWithLinkedinRequest(): Promise<string> {
  const res = await httpClient().get("/auth/linkedin");

  return res.data; // The authUrl returned from your backend
}

export async function linkedinCallbackRequest(
  code: string,
): Promise<{ token: string; data: any }> {
  const res = (await httpClient().post("/auth/linkedin/callback", {
    code,
  })) as any;

  return {
    token: res.token,
    data: res.data,
  };
}

export async function googleCallbackRequest(
  code: string,
): Promise<{ token: string; data: any }> {
  const res = (await httpClient().post("/auth/google/callback", {
    code,
  })) as any;

  return {
    token: res.token,
    data: res.data,
  };
}

export async function loginWithEmailRequest(email: string, password: string) {
  const res = (await httpClient().post("/auth/local/login", {
    email,
    password,
  })) as any;

  return {
    token: res.token,
    data: res.data,
  };
}

export async function signupWithEmailRequest({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const res = (await httpClient().post("/auth/local/signup", {
    firstName,
    lastName,
    email,
    password,
  })) as any;

  return {
    token: res.token,
    data: res.data,
    message: res.message,
  };
}

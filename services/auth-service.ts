import axios, { isAxiosError } from "axios";
import { API_URL } from "../constants/config";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
  };
}

export type RegisterPayload = LoginPayload;

export type RegisterResponse = LoginResponse;

export default function getAuthService() {
  const client = axios.create({
    baseURL: `${API_URL}/auth`,
  });
  console.log("API URL:", `${API_URL}/auth`);

  async function login(loginPayload: LoginPayload): Promise<LoginResponse> {
    try {
      const responde = await client.post<LoginResponse>("/login", loginPayload);
      return responde.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error(
            "Invalid credentials. Please check your email and password."
          );
        }
      }
      throw new Error("Login failed with status");
    }
  }

  async function register(
    registerPayload: RegisterPayload
  ): Promise<RegisterResponse> {
    try {
      const response = await client.post<RegisterResponse>(
        "/register",
        registerPayload
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          throw new Error("User already exists. Please use a different email.");
        }
      }
      throw new Error("Registration failed with status");
    }
  }
  return {
    login,
    register,
  };
}

import type {RegisterRequest} from "../types/auth/register-request.ts";
import api from "./api.ts";
import type {LoginResponse} from "../types/auth/login-response.ts";
import type {LoginRequest} from "../types/auth/login-request.ts";

export const register = async(registerRequest: RegisterRequest): Promise<void> => {
    await api.post<RegisterRequest>("/auth/register", registerRequest);
}

export const login = async(loginRequest: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', loginRequest);
    return response.data;
}
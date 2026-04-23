import {useState} from "react";
import type {LoginRequest} from "../types/auth/login-request.ts";
import {useNavigate} from "react-router-dom";
import {login} from "../api/auth.ts";
import {useAuthStore} from "../store/authStore.ts";

export const useLogin = () => {
    const [input, setInput] = useState<LoginRequest>({
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    const { setAccessToken } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setInput(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await login(input);
            setAccessToken(response.accessToken);
            navigate("/memo-list");
        } catch(error) {
            console.error(error)
            alert("로그인 실패");
        }
    }

    return { input, handleChange, handleSubmit };
}
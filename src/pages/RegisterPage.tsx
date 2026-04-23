import { useRegister } from "../hooks/useRegister.ts";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const { input, handleChange, handleSubmit } = useRegister()
    const navigate = useNavigate()

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "400px", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: "40px 36px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a", textAlign: "center", marginBottom: "28px" }}>회원가입</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <input
                        name="username"
                        value={input.username}
                        onChange={handleChange}
                        placeholder="아이디"
                        style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                    />
                    <input
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="비밀번호"
                        style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                    />
                    <input
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="이메일"
                        style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                    />
                    <button
                        type="submit"
                        style={{ width: "100%", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "11px", fontSize: "14px", fontWeight: "500", cursor: "pointer", marginTop: "4px" }}
                    >
                        회원가입
                    </button>
                </form>
                <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "16px" }}>
                    이미 계정이 있으신가요?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        style={{ color: "#3b82f6", cursor: "pointer" }}
                    >
                        로그인
                    </span>
                </p>
            </div>
        </div>
    )
}

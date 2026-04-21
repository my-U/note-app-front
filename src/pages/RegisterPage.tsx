import { useRegister } from "../hooks/useRegister.ts";

export default function RegisterPage() {
    const { input, handleChange, handleSubmit } = useRegister()

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="username"
                        value={input.username}
                        onChange={handleChange}
                        placeholder="아이디"
                    />
                </div>
                <div>
                    <input
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="비밀번호"
                    />
                </div>
                <div>
                    <input
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="이메일"
                    />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

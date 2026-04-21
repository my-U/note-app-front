import {useLogin} from "../hooks/useLogin.ts";

export default function LoginPage() {
    const { input, handleChange, handleSubmit } = useLogin()

    return (
        <div>
            <h2>로그인</h2>
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
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
// AuthState : store가 가질 상태와 함수의 타입을 정의
import {create} from "zustand/react";

interface AuthState {
    accessToken: string | null // 토큰 값. 로그인 전엔 null, 로그인 후엔 토큰 문자열
    setAccessToken: (token: string) => void // 토큰을 저장하는 함수의 타입. string을 받아서 반환값 없음
    isLoggedIn: boolean // 로그인 여부
    logout: () => void // 로그아웃 함수의 타입. 인자 없고 반환값 없음
}

/**
 * create : Zustand가 제공하는 store 생성 함수
 * <AuthState> : 위에서 정의한 타입을 store에 적용
 * (set) => : set은 Zustand가 주입해주는 함수로, 상태를 변경할 때 사용
 * useAuthStore : 컴포넌트에서 useAuthStore()로 호출하는 React 훅. Spring의 @Autowired처럼 어디서든 꺼내 쓸 수 있음
 */
export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null, // store의 초기 상태. 처음엔 토큰이 없으니 null
    isLoggedIn: false,
    // 로그인 성공 후 토큰을 store에 저장하는 함수.
    // set({ accessToken: token }) : accessToken 상태를 받아온 token 값으로 변경
    setAccessToken: (token) => {
        localStorage.setItem("accessToken", token); // 인터셉터가 localStorage에서 토큰을 읽으므로 함께 저장
        set({accessToken: token, isLoggedIn: true})
    },
    // 로그아웃 시 accessToken을 다시 null로 초기화
    logout: () => {
        localStorage.removeItem("accessToken");
        set({accessToken: null, isLoggedIn: false})
    }
}))


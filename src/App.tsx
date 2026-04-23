import './App.css'
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MemoListPage from "./pages/MemoListPage";
import MemoDetailPage from "./pages/MemoDetailPage";
import {useAuthStore} from "./store/authStore.ts";

// 인증 보호 라우트 (로그인 안 하면 접근 차단)
const ProtectedRoute = () => {
    const { isLoggedIn } = useAuthStore() // useAuthStore()에서 isLoggedIn 가져오기
    /**
     * 삼항연산자
     * isLoggedIn이 true라면 <Outlet /> 실행, false라면 <Navigate to="/login" /> 실행
     * <Outlet /> — 자식 Route를 그대로 렌더링
     * <Navigate to="/login" /> — 강제로 /login으로 이동
     */
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

function App() {
  return (
      /**
       * 라우팅 설정
       */
      <BrowserRouter>
        <Routes>
          {/* 기본 경로 접속 시 /login으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/memo-list" element={<MemoListPage />} />
              <Route path="/memo/:id" element={<MemoDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App

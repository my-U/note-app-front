import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// React Query 전역 클라이언트 인스턴스 생성
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* QueryClientProvider: useQuery, useMutation 등 React Query 훅을 앱 전체에서 사용할 수 있도록 감싸는 Provider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)

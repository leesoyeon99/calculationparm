import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// GitHub Pages SPA 라우팅을 위한 리다이렉트 처리
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, '', redirect);
}

// 깃허브 페이지스에서 루트 경로 접속 시 홈 페이지로 리다이렉트
if (location.pathname === '/' && !redirect) {
  // 이미 홈 페이지에 있으므로 추가 처리 불필요
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)


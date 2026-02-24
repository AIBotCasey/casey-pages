import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import ProjectPage from './pages/ProjectPage'
import PortfolioPage from './pages/PortfolioPage'
import MoneyHomePage from './pages/MoneyHomePage'
import MoneyBlogPage from './pages/MoneyBlogPage'
import MoneyStartHerePage from './pages/MoneyStartHerePage'
import { isMoneySubdomain } from './utils/siteMode'

const ToolsLibraryPage = lazy(() => import('./pages/ToolsLibraryPage'))
const ToolPage = lazy(() => import('./pages/ToolPage'))

export default function App() {
  const moneySite = isMoneySubdomain()

  return (
    <BrowserRouter>
      <Layout moneySite={moneySite}>
        <Routes>
          <Route path="/" element={moneySite ? <MoneyHomePage /> : <HomePage />} />
          <Route path="/portfolio" element={moneySite ? <MoneyBlogPage /> : <PortfolioPage />} />
          <Route path="/blog" element={moneySite ? <MoneyBlogPage /> : <Navigate to="/" replace />} />
          <Route path="/start-here" element={moneySite ? <MoneyStartHerePage /> : <Navigate to="/" replace />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          {!moneySite ? <Route path="/projects/:slug" element={<ProjectPage />} /> : null}
          {!moneySite ? <Route path="/tools" element={<Suspense fallback={null}><ToolsLibraryPage /></Suspense>} /> : null}
          {!moneySite ? <Route path="/tools/:slug" element={<Suspense fallback={null}><ToolPage /></Suspense>} /> : null}
        </Routes>
      </Layout>
      <Analytics />
    </BrowserRouter>
  )
}

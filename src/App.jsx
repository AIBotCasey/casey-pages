import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import ProjectPage from './pages/ProjectPage'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

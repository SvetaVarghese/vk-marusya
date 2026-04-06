import { Route, Routes } from 'react-router-dom'
import './App.css'
import "./index.css"
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { GenresPage } from './pages/GenresPage/GenresPage'
import { GenrePage } from './pages/GenrePage/GenrePage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'

function App() {

  return (
    <>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genre" element={<GenrePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/account" element={<ProfilePage />} />
      </Routes>
    </main>
    <Footer />
    </>

  )
}

export default App

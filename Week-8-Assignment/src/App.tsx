import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Popular } from './popular'
import { MovieDetail } from './page/MovieDetail'
import { Navbar } from './component/Navbar'
import { Favorites } from './page/Favourites'
import { FavoritesProvider } from './context/FavoriteContext'
import { AIChat } from './component/AIChat'


function App() {

  return (
    <FavoritesProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Popular />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/favourites' element={<Favorites />} />
      </Routes>
      <AIChat />
    </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App

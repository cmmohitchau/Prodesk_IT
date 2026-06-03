import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Popular } from './popular'
import { MovieDetail } from './page/MovieDetail'
import { Navbar } from './component/Navbar'
import { Favorites } from './page/Favourites'
import { FavoritesProvider } from './context/FavoriteContext'
import { AIChat } from './component/AIChat'
import { useState } from 'react'


function App() {

    const [searchText, setSearchText] = useState("");
    const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <FavoritesProvider>
    <BrowserRouter>
      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}

       />
      <Routes>
        <Route path='/' element={<Popular />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/favourites' element={<Favorites />} />
      </Routes>
      <button className="rounded-md w-fit px-4 py-2 bg-blue-500 fixed bottom-4 right-8"
       onClick={() => setIsAiOpen(true)}>
        Ask AI
      </button>
      <AIChat
        onMovieSuggestion={setSearchText}
        isOpen={isAiOpen}
        onClose={ () => setIsAiOpen(false)}
      />    
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App

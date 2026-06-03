import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Popular } from './popular'
import { MovieDetail } from './page/MovieDetail'
import { Navbar } from './component/Navbar'
import { Favourites } from './page/Favourites'


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Popular />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

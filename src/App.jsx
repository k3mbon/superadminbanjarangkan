import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Galeri from './pages/Galeri';
import DocumentList from './components/DocumentList';
import DocumentDetails from './components/DocumentDetails';
import Agenda from './pages/Agenda';
import Prestasi from './pages/Prestasi';
import Carousel from './pages/Carousel';
import AlbumPreview from './components/AlbumPreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/prestasi" element={<Prestasi />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/artikel" element={<DocumentList />} />
        <Route path="/document/:id" element={<DocumentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Galeri from './pages/Galeri';
import DocumentList from './components/DocumentList';
import DocumentDetails from './components/DocumentDetails';
import Agenda from './pages/Agenda';
import Prestasi from './pages/Prestasi';
import Carousel from './pages/Carousel';
import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/agenda" element={<PrivateRoute><Agenda /></PrivateRoute>} />
          <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
          <Route path="/galeri" element={<PrivateRoute><Galeri /></PrivateRoute>} />
          <Route path="/prestasi" element={<PrivateRoute><Prestasi /></PrivateRoute>} />
          <Route path="/carousel" element={<PrivateRoute><Carousel /></PrivateRoute>} />
          <Route path="/artikel" element={<PrivateRoute><DocumentList /></PrivateRoute>} />
          <Route path="/document/:id" element={<PrivateRoute><DocumentDetails /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

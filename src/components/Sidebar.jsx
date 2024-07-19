import { Link } from 'react-router-dom';
import {
  FaHome,
  FaCalendarAlt,
  FaNewspaper,
  FaImages,
  FaTrophy,
  FaPhotoVideo,
} from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';  
import { onAuthStateChanged } from 'firebase/auth';  
import Logo from '../assets/logo.png';
import { Col, Row } from 'react-bootstrap';

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px', // Adjust width as needed
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    borderRight: '2px solid #444',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    overflowY: 'auto', // Ensure vertical scrolling if content overflows
    overflowX: 'hidden', // Prevent horizontal scrolling
  };

  const listItemStyle = {
    textDecoration: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    border: 'none',
    transition: 'background-color 0.3s ease',
    whiteSpace: 'nowrap', // Prevent wrapping of text inside links
    overflow: 'hidden', // Hide overflow text
    textOverflow: 'ellipsis', // Display ellipsis (...) for overflow text
  };

  const listItemHoverStyle = {
    backgroundColor: '#555',
  };

  const adminTitleStyle = {
    color: '#fff',
    marginTop: '1rem',
    overflowWrap: 'break-word', // Break long words or text
  };

  const userEmailStyle = {
    marginTop: '0.5rem',
    overflowWrap: 'break-word', // Break long words or text
  };

  const logoutButtonStyle = {
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    marginTop: '1rem',
  };

  const logoutButtonHoverStyle = {
    backgroundColor: '#c62828',
  };

  return (
    <div style={sidebarStyle}>
      <Row className="p-2">
        <Col>
          <img src={Logo} alt="Logo" style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row className="p-2">
        <Col>
          <span style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>
            SMA Negeri 1 Banjarangkan
          </span>
        </Col>
      </Row>
      <hr style={{ borderColor: '#555' }} />
      <div style={{ listStyle: 'none', padding: 0 }}>
        <Link
          to="/"
          style={listItemStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
        >
          <FaHome style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.25rem' }}>Home</span>
        </Link>
        <Link
          to="/agenda"
          style={listItemStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
        >
          <FaCalendarAlt style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.25rem' }}>Agenda</span>
        </Link>
        <Link
          to="/posts"
          style={listItemStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
        >
          <FaNewspaper style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.25rem' }}>Postingan Terbit</span>
        </Link>
        <Link
          to="/galeri"
          style={listItemStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
        >
          <FaImages style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.25rem' }}>Galeri</span>
        </Link>
        <Link
          to="/prestasi"
          style={listItemStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
        >
          <FaTrophy style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.25rem' }}>Prestasi</span>
        </Link>
        <Link
          to="/carousel"
          style={listItemStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
        >
          <FaPhotoVideo style={{ fontSize: '1.25rem', marginRight: '0.5rem' }} />
          <span style={{ fontSize: '1.25rem' }}>Foto Carousel</span>
        </Link>
        <h2 style={adminTitleStyle}>Admin Saat Ini</h2>
        {user && user.email && (
          <p style={userEmailStyle}>{user.email}</p>
        )}
        <button
          style={logoutButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = logoutButtonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = logoutButtonStyle.backgroundColor}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

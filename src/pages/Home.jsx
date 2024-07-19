import Sidebar from '../components/Sidebar';
import BlogPosts from './BlogPosts';
import DocumentList from '../components/DocumentList';
import PostsList from '../components/PostsList';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container fluid className="bg-light min-vh-100" style={{ paddingLeft: '300px' }}>
      <Sidebar />
      <Row className="g-0">
        <Col md={9} className="py-5">
          <BlogPosts />
          <DocumentList />
          <PostsList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

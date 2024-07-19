import { Col, Container, Row } from 'react-bootstrap';
import PostsList from '../components/PostsList';
import Sidebar from '../components/Sidebar';

const Posts = () => {
  return (
    <>
      <Container fluid className="bg-light min-vh-100" style={{ paddingLeft: '300px' }}>
      <Sidebar />
      <Row className="g-0">
        <Col md={9} className="py-5">
            <PostsList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Posts;

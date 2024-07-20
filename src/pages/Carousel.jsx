import { Col, Container, Row } from 'react-bootstrap';
import CarouselImage from '../components/CarouselImage';
import Sidebar from '../components/Sidebar';

const Carousel = () => {
  return (
    <Container fluid className="bg-light min-vh-100" style={{ paddingLeft: '300px' }}>
      <Sidebar />
      <Row className="g-0">
        <Col md={9} className="py-5">
          <CarouselImage />
        </Col>
      </Row>
    </Container>
  );
};

export default Carousel;

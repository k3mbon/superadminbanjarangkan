import PrestasiForm from '../components/PrestasiForm';
import Sidebar from '../components/Sidebar';
import ListPrestasi from '../components/ListPrestasi';
import { Col, Container, Row } from 'react-bootstrap';

const Prestasi = () => {
  return (
    <>
      <Container fluid className="bg-light min-vh-100" style={{ paddingLeft: '300px' }}>
      <Sidebar />
      <Row className="g-0">
        <Col md={9} className="py-5">
            <PrestasiForm />
            <ListPrestasi />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Prestasi;

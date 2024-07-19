import ReminderForm from '../components/ReminderForm';
import Sidebar from '../components/Sidebar';
import ReminderList from '../components/ReminderList';
import { Col, Container, Row } from 'react-bootstrap';

const Agenda = () => {
  return (
    <>
      {' '}
      <Container fluid className="bg-light min-vh-100" style={{ paddingLeft: '300px' }}>
      <Sidebar />
      <Row className="g-0">
        <Col md={9} className="py-5">
            <ReminderForm />
            <ReminderList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Agenda;

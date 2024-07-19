import React from 'react'
import Sidebar from '../components/Sidebar'
import GalleryForm from '../components/GalleryForm'
import ListAlbumFoto from '../components/ListAlbumFoto'
import { Col, Container, Row } from 'react-bootstrap';

const Galeri = () => {
  return (
    <Container fluid className="bg-light min-vh-100" style={{ paddingLeft: '300px' }}>
      <Sidebar />
      <Row className="g-0">
        <Col md={9} className="py-5">
            <GalleryForm />
            <ListAlbumFoto />
          </Col>
        </Row>
      </Container>
  )
}

export default Galeri
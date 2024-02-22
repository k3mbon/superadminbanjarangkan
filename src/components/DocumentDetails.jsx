import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import BlogForm from './BlogForm';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';

const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documentDetails, setDocumentDetails] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleFormSubmit = async ({ judul, isi, gambarUrls }) => {
    try {
      const documentRef = doc(db, 'poststunda', id);
      await updateDoc(documentRef, {
        judul: judul,
        isi: isi,
        gambarUrls: gambarUrls,
      });

      const updatedDocumentSnapshot = await getDoc(documentRef);
      setDocumentDetails({ id, ...updatedDocumentSnapshot.data() });

      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const transferAndDelete = async (documentId) => {
    try {
      const documentRef = doc(db, 'poststunda', documentId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();

        const destinationCollectionRef = collection(db, 'posts');
        await addDoc(destinationCollectionRef, documentData);
        await deleteDoc(documentRef);

        console.log(
          'Document transferred and deleted successfully:',
          documentId
        );
        navigate(-1);
      } else {
        console.error('Document not found');
      }
    } catch (error) {
      console.error('Error transferring and deleting document:', error);
    }
  };

  const deleteDocumentOnly = async (documentId) => {
    try {
      const documentRef = doc(db, 'poststunda', documentId);
      await deleteDoc(documentRef);

      console.log(
        'Document deleted successfully (without transfer):',
        documentId
      );

      navigate(-1);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const documentRef = doc(db, 'poststunda', id);
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
          setDocumentDetails({ id, ...documentSnapshot.data() });
        } else {
          console.error('Document not found');
        }
      } catch (error) {
        console.error('Error fetching document details:', error);
      }
    };

    fetchDocumentDetails();
  }, [id]);

  if (!documentDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container fluid className="bg-light min-vh-100">
        <Row>
          <Col md="3" className="bg-white min-vh-100">
            <Sidebar />
          </Col>
          <Col className="py-5" md="auto">
            <div className="d-flex flex-column justify-content-center mx-5">
              <img src={documentDetails.gambarUrls} alt="Thumbnail" />
              <h3>{documentDetails.judul}</h3>
              <div dangerouslySetInnerHTML={{ __html: documentDetails.isi }} />
              <div>
                <Button
                  className="mx-2"
                  variant="primary"
                  onClick={() => transferAndDelete(id)}
                >
                  Setujui Dan Hapus
                </Button>
                <Button
                  className="mx-2"
                  variant="danger"
                  onClick={() => deleteDocumentOnly(id)}
                >
                  Hapus Tanpa Setujui
                </Button>
                <Button
                  className="mx-2"
                  variant="success"
                  onClick={toggleEditMode}
                >
                  Edit
                </Button>
                <Button className="mx-2" variant="warning" onClick={goBack}>
                  Go Back
                </Button>
              </div>
              <div className="mx-5 mt-5">
                {isEditMode && (
                  <BlogForm
                    dataToEdit={documentDetails}
                    onFormSubmit={(data) => handleFormSubmit(data)}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DocumentDetails;

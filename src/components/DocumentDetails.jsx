import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import BlogForm from './BlogForm';

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

        console.log('Document transferred and deleted successfully:', documentId);
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

      console.log('Document deleted successfully (without transfer):', documentId);

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
    <div>
      <img src={documentDetails.gambarUrls} alt="Thumbnail" />
      <h3>{documentDetails.judul}</h3>
      <div dangerouslySetInnerHTML={{ __html: documentDetails.isi }} />
      <button onClick={() => transferAndDelete(id)}>Setujui Dan Hapus</button>
      <button onClick={() => deleteDocumentOnly(id)}>Hapus Tanpa Setujui</button>
      <button onClick={toggleEditMode}>Edit</button>
      <button onClick={goBack}>Go Back</button>
      {isEditMode && (
        <BlogForm
          dataToEdit={documentDetails}
          onFormSubmit={(data) => handleFormSubmit(data)}
        />
      )}
    </div>
  );
};

export default DocumentDetails;

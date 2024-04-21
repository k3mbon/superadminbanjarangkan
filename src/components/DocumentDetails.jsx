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

  // Extract image data from isi using regex
  const imageRegex = /<img.*?src="data:image\/(.*?);base64,(.*?)".*?\/?>/g;
  const images = documentDetails.isi.match(imageRegex);

  // Replace image tags with actual image elements
  const contentWithImages = images
    ? documentDetails.isi.replace(imageRegex, (match, type, data) => {
        return `<img src="data:image/${type};base64,${data}" />`;
      })
    : documentDetails.isi;

  return (
    <div>
      <h2>Document Details</h2>
      {/* Display detailed information about the document */}
      <img src={documentDetails.gambarUrls} alt="Thumbnail" />
      <h3>{documentDetails.judul}</h3>
      <p>{documentDetails.isi}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default DocumentDetails;

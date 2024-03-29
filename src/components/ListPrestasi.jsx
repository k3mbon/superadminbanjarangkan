import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../styles/ListPrestasi.css'; // Import the CSS file for styling

const ListPrestasi = () => {
  const [prestasiList, setPrestasiList] = useState([]);

  useEffect(() => {
    const fetchPrestasiList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'prestasi'));
        const prestasiData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          imageUrl: doc.data().imageUrl,
        }));
        setPrestasiList(prestasiData);
      } catch (error) {
        console.error('Error fetching prestasi list: ', error);
      }
    };

    fetchPrestasiList();
  }, []); // Fetch data on component mount

  const handleDeleteDocument = async (documentId) => {
    try {
      console.log('Deleting document with ID:', documentId);
  
      if (!documentId) {
        console.error('Invalid documentId:', documentId);
        return;
      }
  
      // Create a document reference
      const documentRef = doc(db, 'agenda', documentId);
  
      // Delete the document from Firestore
      await deleteDoc(documentRef);
  
      // Update the state to reflect the deleted document
      setDocuments((prevDocuments) =>
        prevDocuments.filter((document) => document.id !== documentId)
      );
  
      console.log('Document deleted successfully:', documentId);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="document-list-container my-5">
      <h2>List of Prestasi</h2>
      <div className="d-flex">
        {prestasiList.map((prestasi) => (
          <div key={prestasi.id} className="document-card">
            <img
              src={prestasi.imageUrl}
              alt={prestasi.title}
              className="card-image"
            />
            <h3>{prestasi.title}</h3>
            <p>{prestasi.description}</p>
            <button onClick={() => handleDeleteDocument(prestasi.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPrestasi;

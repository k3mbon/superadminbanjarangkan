import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/ReminderList.css';

const ReminderList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'agenda'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

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
    <div className="document-list-container">
      <h2>JADWAL AGENDA</h2>
      <ul className="document-list">
        {documents.map((document) => (
          <li key={document.id} className="document-card">
              <div className="document-card-content">
                <h3>{document.judul}</h3>
                <p>{document.isi}</p>
                <button onClick={() => handleDeleteDocument(document.id)}>
                  Delete
                </button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;

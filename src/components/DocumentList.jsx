import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, getDoc } from 'firebase/firestore'; // Import getDoc
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import '../styles/DocumentList.css';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'poststunda'));
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

  const extractFirstImage = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const images = tempDiv.querySelectorAll('img');

    if (images && images.length > 0) {
      return images[0].src;
    }

    return null;
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      console.log('Deleting document with ID:', documentId);

      if (!documentId) {
        console.error('Invalid documentId:', documentId);
        return;
      }

      const documentRef = doc(db, 'poststunda', documentId);
      await deleteDoc(documentRef);

      setDocuments((prevDocuments) =>
        prevDocuments.filter((document) => document.id !== documentId)
      );

      console.log('Document deleted successfully:', documentId);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleMoveToPosts = async (documentId) => {
    try {
      const documentRef = doc(db, 'poststunda', documentId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        const destinationCollectionRef = collection(db, 'posts');

        await addDoc(destinationCollectionRef, documentData);
        await deleteDoc(documentRef);

        console.log('Document moved to "posts" collection:', documentId);

        setDocuments((prevDocuments) =>
          prevDocuments.filter((document) => document.id !== documentId)
        );
      } else {
        console.error('Document not found');
      }
    } catch (error) {
      console.error('Error moving document to "posts" collection:', error);
    }
  };

  return (
    <div className="document-list-container">
      <h2>POST TERTUNDA</h2>
      <ul className="document-list">
        {documents.map((document) => (
          <li key={document.id} className="document-card">
            <Link
              to={{ pathname: `/document/${document.id}`, state: { document } }}
            >
              {document.isi && (
                <img src={extractFirstImage(document.isi)} alt="Thumbnail" />
              )}
              <div className="document-card-content">
                <h3>{document.judul}</h3>
                <p>{document.isi}</p>
              </div>
            </Link>
            <div className="button-container">
              <button onClick={() => handleMoveToPosts(document.id)}>
                Setujui
              </button>
              <button onClick={() => handleDeleteDocument(document.id)}>
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;

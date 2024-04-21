import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactHtmlParser from 'html-react-parser';

const DocumentDetails = () => {
  const { id } = useParams();
  const [documentDetails, setDocumentDetails] = useState(null);

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
      {/* Display detailed information about the document */}
      <img src={documentDetails.gambarUrls} alt="Thumbnail" />
      <h3>{documentDetails.judul}</h3>
      {/* Use ReactHtmlParser to parse and display the HTML content */}
      {ReactHtmlParser(contentWithImages)}
      {/* Add more fields as needed */}
    </div>
  );
};

export default DocumentDetails;

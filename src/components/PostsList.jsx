import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import DOMPurify from 'dompurify';
import '../styles/PostsList.css';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
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

  return (
    <div className="posts-container">
      <h2>Posts List</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {post.isi && (
              <img
                src={extractFirstImage(post.isi)}
                alt="Thumbnail"
                className="thumbnail"
              />
            )}
            <div className="post-content">
              <h3>{post.judul}</h3>
              <div
                className="post-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.isi) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;

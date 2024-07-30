import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/PostsList.css';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDeletePost = async (postId) => {
    const confirmation = window.confirm('Are you sure you want to delete this post?');
    if (confirmation) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

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
            <button
              onClick={() => handleDeletePost(post.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default PostsList;

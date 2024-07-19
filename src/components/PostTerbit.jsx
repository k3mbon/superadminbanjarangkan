import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import DOMPurify from 'dompurify';
import '../styles/PostsTerbit.css';

const PostsTerbit = () => {
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

  const handleDeletePost = async (postId) => {
    const confirmation = window.confirm('Are you sure you want to delete this post?');
    if (confirmation) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        setPosts(posts.filter(post => post.id !== postId));
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
              <div
                className="post-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.isi) }}
              />
              {post.gambarUrls && (
                <div className="post-images">
                  {post.gambarUrls.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Post Image ${index + 1}`}
                      className="post-image"
                    />
                  ))}
                </div>
              )}
              <button onClick={() => handleDeletePost(post.id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsTerbit;

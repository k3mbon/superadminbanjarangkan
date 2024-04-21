import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
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
        await deleteDoc(doc(db, 'post', postId));
        setPosts(posts.filter(post => post.id !== postId));
        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="mx-5">
      <h2>Posts List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.judul}</h3>
            <p>{post.isi}</p>
            {post.gambarUrls && (
              <div>
                {post.gambarUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Post Image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsTerbit;

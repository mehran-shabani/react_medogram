import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddCommentForm from './AddCommentForm';

const BlogPostPage = () => {
    const { id } = useParams();  // دریافت id پست از URL
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogResponse = await axios.get(`/api/blogs/${id}/`);
                const commentsResponse = await axios.get(`/api/blogs/${id}/comments/`);
                setBlog(blogResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching blog post or comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleCommentSubmit = async (commentData) => {
        try {
            const response = await axios.post(`/api/blogs/${id}/comments/`, commentData);
            setComments([...comments, response.data]); // اضافه کردن کامنت جدید به لیست
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!blog) {
        return <p>Blog post not found.</p>;
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>

            <h3>Comments</h3>
            <ul>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <li key={comment.id}>{comment.comment} by {comment.user}</li>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </ul>

            <AddCommentForm onCommentSubmit={handleCommentSubmit} />
        </div>
    );
};

export default BlogPostPage;

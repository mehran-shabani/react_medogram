import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/blogs/');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;

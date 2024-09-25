import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown, FaComment, FaUserCircle } from 'react-icons/fa';
import { useCallback } from 'react';

const BlogListPage = () => {
    const { isVerified, token } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [activeCommentBox, setActiveCommentBox] = useState(null);
    const [page, setPage] = useState(1); // اضافه کردن state برای صفحه
    const [hasMore, setHasMore] = useState(true);

    const loadBlogs = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/blogs/?page=${page}`);
            setBlogs((prevBlogs) => [...prevBlogs, ...response.data]);
            setHasMore(response.data.next !== null);
            setLoading(false);
        } catch (error) {
            setError("Failed to load blogs.");
            setLoading(false);
        }
    }, [page]);

    // استفاده از useEffect برای بارگذاری اولیه داده‌ها
    useEffect(() => {
        loadBlogs(); // فراخوانی تابع بارگذاری پست‌ها
    }, [loadBlogs]);

    const isPhoneNumber = (user) => {
        // این عبارت منظم بررسی می‌کند که آیا user فقط شامل اعداد است یا نه
        return /^[0-9]+$/.test(user);
    };

    // متد برای مدیریت اسکرول و بارگذاری بیشتر پست‌ها
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasMore]); // این تابع فقط زمانی که hasMore تغییر کند، بازتعریف می‌شود

    // اضافه کردن event listener برای اسکرول
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleCommentSubmit = async (blogId) => {
        if (!isVerified) {
            toast.error("You need to be authenticated to add a comment.");
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/blogs/${blogId}/comments/`,
                { comment: commentText },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success("Comment added successfully!");
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog.id === blogId ? { ...blog, comments: [...blog.comments, response.data] } : blog
                )
            );
            setCommentText('');
            setActiveCommentBox(null);
        } catch (error) {
            toast.error("Error adding comment.");
        }
    };

    const handleLikeDislike = async (commentId, action) => {
        if (!isVerified) {
            toast.error("You need to be authenticated to like/dislike a comment.");
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/comments/${commentId}/${action}/`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success(`${action === 'like' ? 'Liked' : 'Disliked'} successfully!`);
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) => ({
                    ...blog,
                    comments: blog.comments.map((comment) =>
                        comment.id === commentId ? { ...comment, likes: response.data.likes } : comment
                    )
                }))
            );
        } catch (error) {
            toast.error(`Error during ${action}.`);
        }
    };

    if (loading && page === 1) {
        return <LoadingSpinner><div></div><div></div><div></div><div></div></LoadingSpinner>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <PageContainer>
            <PageTitle>Latest Blogs</PageTitle>
            {blogs.length > 0 ? (
                <BlogList>
                    {blogs.map((blog) => (
                        <BlogItem key={blog.id}>
                            <BlogTitle>{blog.title}</BlogTitle>
                            <BlogContent>{blog.content}</BlogContent>
                            <BlogMeta>
                                <AuthorInfo>
                                    <FaUserCircle />
                                    <span>{blog.author}</span>
                                </AuthorInfo>
                                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                            </BlogMeta>
                            <CommentsSection>
                                <SectionTitle>
                                    <FaComment /> Comments ({blog.comments ? blog.comments.length : 0})
                                </SectionTitle>
                                {blog.comments && blog.comments.length > 0 ? (
                                    <CommentList>
                                        {blog.comments.map((comment) => (
                                            <CommentItem key={comment.id}>
                                                <CommentContent>{comment.comment}</CommentContent>
                                                <CommentMeta>
                                                <span>
                                               <FaUserCircle />
                                                    {comment.user && !isPhoneNumber(comment.user) ? comment.user : 'Anonymous'}
                                                    {(!comment.user || isPhoneNumber(comment.user)) && <AnonymousUserBadge>Guest</AnonymousUserBadge>}
                                                </span>
                                                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                                                </CommentMeta>
                                                <ButtonGroup>
                                                    <ActionButton onClick={() => handleLikeDislike(comment.id, 'like')}>
                                                        <FaThumbsUp /> {comment.likes}
                                                    </ActionButton>
                                                    <ActionButton onClick={() => handleLikeDislike(comment.id, 'dislike')}>
                                                        <FaThumbsDown />
                                                    </ActionButton>
                                                </ButtonGroup>
                                            </CommentItem>
                                        ))}
                                    </CommentList>
                                ) : (
                                    <NoComments>No comments available for this blog.</NoComments>
                                )}
                            </CommentsSection>
                            {activeCommentBox === blog.id ? (
                                <AddCommentSection>
                                    <CommentTextArea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Write a comment..."
                                    />
                                    <ButtonGroup>
                                        <SubmitButton onClick={() => handleCommentSubmit(blog.id)}>
                                            Submit Comment
                                        </SubmitButton>
                                        <CancelButton onClick={() => setActiveCommentBox(null)}>
                                            Cancel
                                        </CancelButton>
                                    </ButtonGroup>
                                </AddCommentSection>
                            ) : (
                                <AddCommentButton onClick={() => setActiveCommentBox(blog.id)}>
                                    Add Comment
                                </AddCommentButton>
                            )}
                        </BlogItem>
                    ))}
                </BlogList>
            ) : (
                <NoBlogs>No blogs available.</NoBlogs>
            )}

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </PageContainer>
    );
};

// Styled Components
const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const PageTitle = styled.h1`
    text-align: center;
    color: #2c3e50;
    font-size: 2.5em;
    margin-bottom: 30px;
`;

const BlogList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const BlogItem = styled.li`
    background-color: #fff;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const BlogTitle = styled.h2`
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.8em;
`;

const BlogContent = styled.p`
    color: #34495e;
    line-height: 1.6;
    font-size: 1.1em;
    margin-bottom: 20px;
`;

const BlogMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #7f8c8d;
    font-size: 0.9em;
    margin-bottom: 20px;
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    
    svg {
        margin-right: 5px;
    }
`;

const CommentsSection = styled.div`
    margin-top: 25px;
`;

const SectionTitle = styled.h3`
    color: #2c3e50;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    
    svg {
        margin-right: 10px;
    }
`;

const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CommentItem = styled.li`
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
`;

const CommentContent = styled.p`
    color: #34495e;
    font-size: 1em;
    line-height: 1.5;
    margin-bottom: 10px;
`;

const CommentMeta = styled.div`
    display: flex;
    justify-content: space-between;
    color: #7f8c8d;
    font-size: 0.85em;
    margin-bottom: 10px;

    span {
        display: flex;
        align-items: center;
    }

    svg {
        margin-right: 5px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const ActionButton = styled.button`
    background-color: transparent;
    color: #3498db;
    border: 1px solid #3498db;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;

    svg {
        margin-right: 5px;
    }

    &:hover {
        background-color: #3498db;
        color: white;
    }
`;

const AddCommentSection = styled.div`
    margin-top: 20px;
`;

const CommentTextArea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ecf0f1;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 1em;
    margin-bottom: 10px;
`;

const SubmitButton = styled.button`
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #27ae60;
    }
`;

const CancelButton = styled(SubmitButton)`
    background-color: #e74c3c;

    &:hover {
        background-color: #c0392b;
    }
`;

const AddCommentButton = styled(SubmitButton)`
    background-color: #3498db;
    margin-top: 10px;

    &:hover {
        background-color: #2980b9;
    }
`;

const NoComments = styled.p`
    color: #7f8c8d;
    font-style: italic;
    text-align: center;
`;

const NoBlogs = styled.p`
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
    font-size: 1.2em;
`;

const LoadingSpinner = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    
    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #3498db;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #3498db transparent transparent transparent;
    }
    div:nth-child(1) {
        animation-delay: -0.45s;
    }
    div:nth-child(2) {
        animation-delay: -0.3s;
    }
    div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const ErrorMessage = styled.p`
    text-align: center;
    color: #e74c3c;
    font-size: 1.2em;
    padding: 20px;
    background-color: #fadbd8;
    border-radius: 8px;
`;

const AnonymousUserBadge = styled.span`
    background-color: #95a5a6;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.8em;
    margin-left: 5px;
`;

export default BlogListPage;
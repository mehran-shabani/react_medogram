import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled, { keyframes } from 'styled-components';
import { FaThumbsUp, FaThumbsDown, FaComment, FaUserCircle, FaShare, FaBookmark } from 'react-icons/fa';

const BlogListPage = () => {
    const { isVerified, token } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [activeCommentBox, setActiveCommentBox] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [savedPosts, setSavedPosts] = useState(new Set());

    const loadBlogs = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.medogram.ir/api/blogs/?page=${page}`);
            if (response.data && Array.isArray(response.data)) {
                const newBlogs = response.data.filter(newBlog =>
                    !blogs.some(existingBlog => existingBlog.id === newBlog.id)
                );
                setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
                setHasMore(response.data.length > 0);
            } else if (response.data && response.data.results) {
                const newBlogs = response.data.results.filter(newBlog =>
                    !blogs.some(existingBlog => existingBlog.id === newBlog.id)
                );
                setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
                setHasMore(response.data.next !== null);
            }
            setLoading(false);
        } catch (error) {
            setError("بارگذاری پست‌ها با خطا مواجه شد.");
            setLoading(false);
        }
    }, [page, blogs]);

    useEffect(() => {
        loadBlogs();
    }, [loadBlogs]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight && hasMore && !loading
        ) {
            setPage(prevPage => prevPage + 1);
        }
    }, [hasMore, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleCommentSubmit = async (blogId) => {
        if (!isVerified) {
            toast.error("برای ارسال نظر، نیاز به احراز هویت دارید.");
            return;
        }

        if (!commentText.trim()) {
            toast.warning("لطفاً نظر خود را وارد کنید.");
            return;
        }

        try {
            const response = await axios.post(
                `https://api.medogram.ir/api/blogs/${blogId}/comments/`,
                { comment: commentText },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success("نظر شما با موفقیت ثبت شد!");
            setBlogs(prevBlogs =>
                prevBlogs.map(blog =>
                    blog.id === blogId
                        ? { ...blog, comments: [...blog.comments, response.data] }
                        : blog
                )
            );
            setCommentText('');
            setActiveCommentBox(null);
        } catch (error) {
            toast.error("خطا در ثبت نظر. لطفاً دوباره تلاش کنید.");
        }
    };

    const handleLikeDislike = async (commentId, action) => {
        if (!isVerified) {
            toast.error("برای لایک یا دیسلایک کردن، نیاز به احراز هویت دارید.");
            return;
        }

        try {
            const response = await axios.post(
                `https://api.medogram.ir/api/comments/${commentId}/${action}/`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (action === 'like') {
                toast.success("نظر لایک شد!", { icon: "👍" });
            } else {
                toast.info("نظر دیسلایک شد!", { icon: "👎" });
            }

            setBlogs(prevBlogs =>
                prevBlogs.map(blog => ({
                    ...blog,
                    comments: blog.comments.map(comment =>
                        comment.id === commentId
                            ? { ...comment, likes: response.data.likes }
                            : comment
                    )
                }))
            );
        } catch (error) {
            toast.error(`خطا در ${action === 'like' ? 'لایک' : 'دیسلایک'} نظر.`);
        }
    };

    const handleSavePost = (blogId) => {
        if (!isVerified) {
            toast.error("برای ذخیره پست، نیاز به احراز هویت دارید.");
            return;
        }

        setSavedPosts(prev => {
            const newSaved = new Set(prev);
            if (newSaved.has(blogId)) {
                newSaved.delete(blogId);
                toast.info("پست از نشان‌شده‌ها حذف شد");
            } else {
                newSaved.add(blogId);
                toast.success("پست در نشان‌شده‌ها ذخیره شد");
            }
            return newSaved;
        });
    };

    const handleShare = (blog) => {
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                text: blog.content.substring(0, 100) + '...',
                url: window.location.href
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("لینک پست کپی شد!");
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("لینک پست کپی شد!");
        }
    };

    if (loading && page === 1) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <PageContainer>
            <PageTitle>آخرین پست‌های وبلاگ</PageTitle>
            {blogs.length > 0 ? (
                <BlogList>
                    {blogs.map((blog) => (
                        <BlogItem key={blog.id}>
                            <BlogHeader>
                                <AuthorInfo>
                                    <FaUserCircle />
                                    <AuthorName>{blog.author}</AuthorName>
                                </AuthorInfo>
                                <PostDate>
                                    {new Date(blog.created_at).toLocaleDateString('fa-IR')}
                                </PostDate>
                            </BlogHeader>

                            <BlogTitle src={{direction:'center'}}>{blog.title}</BlogTitle>

                            {blog.image1 && (
                                <ImageContainer>
                                    <BlogImage
                                        src={blog.image1}
                                        alt={blog.title}
                                        loading="lazy"
                                    />
                                </ImageContainer>
                            )}

                            <BlogContent>{blog.content}</BlogContent>

                            {blog.image2 && (
                                <ImageContainer>
                                    <BlogImage
                                        src={blog.image2}
                                        alt={`تصویر اضافی برای ${blog.title}`}
                                        loading="lazy"
                                    />
                                </ImageContainer>
                            )}

                            <ActionBar>
                                <ActionButton onClick={() => handleShare(blog)}>
                                    <FaShare /> اشتراک‌گذاری
                                </ActionButton>
                                <ActionButton
                                    onClick={() => handleSavePost(blog.id)}
                                    saved={savedPosts.has(blog.id)}
                                >
                                    <FaBookmark />
                                    {savedPosts.has(blog.id) ? 'ذخیره شده' : 'ذخیره'}
                                </ActionButton>
                            </ActionBar>

                            <CommentsSection>
                                <SectionTitle>
                                    <FaComment /> نظرات ({blog.comments?.length || 0})
                                </SectionTitle>

                                {blog.comments?.length > 0 ? (
                                    <CommentList>
                                        {blog.comments.map((comment) => (
                                            <CommentItem key={comment.id}>
                                                <CommentContent>{comment.comment}</CommentContent>
                                                <CommentMeta>
                                                    <UserInfo>
                                                        <FaUserCircle />
                                                        <span>{comment.user || 'کاربر مهمان'}</span>
                                                    </UserInfo>
                                                    <CommentDate>
                                                        {new Date(comment.created_at).toLocaleDateString('fa-IR')}
                                                    </CommentDate>
                                                </CommentMeta>
                                                <CommentActions>
                                                    <ActionButton onClick={() => handleLikeDislike(comment.id, 'like')}>
                                                        <FaThumbsUp /> {comment.likes}
                                                    </ActionButton>
                                                    <ActionButton onClick={() => handleLikeDislike(comment.id, 'dislike')}>
                                                        <FaThumbsDown />
                                                    </ActionButton>
                                                </CommentActions>
                                            </CommentItem>
                                        ))}
                                    </CommentList>
                                ) : (
                                    <NoComments>هنوز نظری ثبت نشده است.</NoComments>
                                )}

                                {activeCommentBox === blog.id ? (
                                    <AddCommentSection>
                                        <CommentTextArea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="نظر خود را بنویسید..."
                                        />
                                        <CommentButtonGroup>
                                            <SubmitButton onClick={() => handleCommentSubmit(blog.id)}>
                                                ارسال نظر
                                            </SubmitButton>
                                            <CancelButton onClick={() => {
                                                setActiveCommentBox(null);
                                                setCommentText('');
                                            }}>
                                                انصراف
                                            </CancelButton>
                                        </CommentButtonGroup>
                                    </AddCommentSection>
                                ) : (
                                    <AddCommentButton onClick={() => setActiveCommentBox(blog.id)}>
                                        افزودن نظر
                                    </AddCommentButton>
                                )}
                            </CommentsSection>
                        </BlogItem>
                    ))}
                </BlogList>
            ) : (
                <NoBlogs>پستی برای نمایش وجود ندارد.</NoBlogs>
            )}
            {loading && <LoadingSpinner />}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </PageContainer>
    );
};
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    direction: rtl;
    padding: 20px;
    font-family: 'Vazirmatn', sans-serif;

    @media (max-width: 768px) {
        padding: 15px;
    }
`;

const PageTitle = styled.h1`
    text-align: center;
    color: #2c3e50;
    font-size: 2.5em;
    margin-bottom: 40px;
    position: relative;
    padding-bottom: 15px;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 3px;
        background: linear-gradient(to right, #3498db, #2ecc71);
    }

    @media (max-width: 768px) {
        font-size: 2em;
        margin-bottom: 30px;
    }
`;

const BlogList = styled.ul`
    list-style-type: none;
    padding: 0;
    animation: ${fadeIn} 0.6s ease-out;
`;

const BlogItem = styled.li`
    background-color: #fff;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 40px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 1px solid #eef2f7;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        padding: 20px;
        margin-bottom: 30px;
    }
`;

const BlogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #34495e;

    svg {
        font-size: 1.5em;
        color: #3498db;
    }
`;

const AuthorName = styled.span`
    font-weight: 500;
`;

const PostDate = styled.span`
    color: #7f8c8d;
    font-size: 0.9em;
`;

const ImageContainer = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    margin: 20px 0;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover::after {
        opacity: 1;
    }
`;

const BlogImage = styled.img`
    width: 100%;
    height: 400px;
    direction: rtl;
    object-fit: cover;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
    }

    @media (max-width: 768px) {
        height: 250px;
    }
`;

const BlogTitle = styled.h2`
    color: #2c3e50;
    direction: ltr;
    font-size: 1.8em;
    margin-bottom: 15px;
    line-height: 1.4;
    font-weight: 600;

    @media (max-width: 768px) {
        font-size: 1.5em;
    }
`;

const BlogContent = styled.p`
    color: #34495e;
    direction: rtl;
    line-height: 1.8;
    font-size: 1.1em;
    margin: 20px 0;
    text-align: justify;

    @media (max-width: 768px) {
        font-size: 1em;
    }
`;

const ActionBar = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin: 20px 0;
    padding-top: 15px;
    border-top: 1px solid #eee;
`;

const ActionButton = styled.button`
    background-color: ${props => props.saved ? '#2ecc71' : '#fff'};
    color: ${props => props.saved ? '#fff' : '#3498db'};
    border: 2px solid ${props => props.saved ? '#2ecc71' : '#3498db'};
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    font-size: 0.9em;

    svg {
        transition: transform 0.3s;
    }

    &:hover {
        background-color: ${props => props.saved ? '#27ae60' : '#3498db'};
        color: white;
        transform: translateY(-2px);

        svg {
            transform: scale(1.2);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const CommentsSection = styled.div`
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
`;

const SectionTitle = styled.h3`
    color: #2c3e50;
    font-size: 1.3em;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
        color: #3498db;
    }
`;

const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CommentItem = styled.li`
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #fff;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        transform: translateX(-5px);
    }
`;

const CommentContent = styled.p`
    color: #34495e;
    line-height: 1.6;
    margin-bottom: 15px;
`;

const CommentMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: #7f8c8d;
    font-size: 0.9em;

    svg {
        color: #95a5a6;
    }
`;

const CommentDate = styled.span`
    color: #95a5a6;
    font-size: 0.85em;
`;

const CommentActions = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
`;

const AddCommentSection = styled.div`
    margin-top: 20px;
    animation: ${fadeIn} 0.3s ease-out;
`;

const CommentTextArea = styled.textarea`
    width: 100%;
    height: 120px;
    padding: 15px;
    border: 2px solid #ecf0f1;
    border-radius: 10px;
    resize: vertical;
    font-family: inherit;
    font-size: 1em;
    margin-bottom: 15px;
    transition: all 0.3s ease;

    &:focus {
        border-color: #3498db;
        box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
        outline: none;
    }
`;

const CommentButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
`;

const BaseButton = styled.button`
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
    font-size: 0.9em;
    border: none;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const SubmitButton = styled(BaseButton)`
    background-color: #2ecc71;
    color: white;

    &:hover {
        background-color: #27ae60;
    }
`;

const CancelButton = styled(BaseButton)`
    background-color: #e74c3c;
    color: white;

    &:hover {
        background-color: #c0392b;
    }
`;

const AddCommentButton = styled(BaseButton)`
    background-color: #3498db;
    color: white;
    margin-top: 15px;
    width: 100%;

    &:hover {
        background-color: #2980b9;
    }
`;

const NoComments = styled.p`
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
`;

const NoBlogs = styled.p`
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
    font-size: 1.2em;
    padding: 40px;
    background-color: #f8f9fa;
    border-radius: 10px;
    margin-top: 30px;
`;

const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;

    &:after {
        content: '';
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: #e74c3c;
    background-color: #fde8e7;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    svg {
        font-size: 1.5em;
    }
`;

export default BlogListPage;
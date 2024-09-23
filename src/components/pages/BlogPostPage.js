import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    Avatar,
    Chip,
    Skeleton,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    ThemeProvider,
    createTheme,
    TextField,
    Button,
    Snackbar,
    Grow,
    Fade,
    useTheme,
    useScrollTrigger,
    Grid,
    Zoom,
    Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1.1rem',
            lineHeight: 1.7,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
            },
        },
    },
});
const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    overflow: 'visible',
}));

const BlogImage = styled('img')({
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    [theme.breakpoints.down('sm')]: {
        height: '200px',
    },
});

const BlogContent = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    whiteSpace: 'pre-wrap',
}));

const CommentCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const AddCommentForm = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        await onCommentSubmit({ comment });
        setComment('');
        setSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                margin="normal"
                disabled={submitting}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<CommentIcon />}
                disabled={submitting || !comment}
            >
                {submitting ? 'Posting...' : 'Post Comment'}
            </Button>
        </form>
    );
};

const ScrollTop = ({ children }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
};

const BlogPostPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogResponse = await axios.get(`/api/blogs/${id}/`);
                const commentsResponse = await axios.get(`/api/blogs/${id}/comments/`);
                setBlog(blogResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching blog post or comments:', error);
                setBlog(null);
                setComments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleCommentSubmit = async (commentData) => {
        try {
            const response = await axios.post(`/api/blogs/${id}/comments/`, commentData);
            setComments([...comments, response.data]);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <div id="back-to-top-anchor" />
                <Grow in={true} timeout={1000}>
                    <StyledCard elevation={3}>
                        {blog ? (
                            <>
                                <BlogImage src={blog.image_url || 'https://source.unsplash.com/random/800x300'} alt={blog.title} />
                                <CardContent>
                                    <Typography variant="h1" gutterBottom>
                                        {blog.title}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Chip
                                            label={`Posted on ${new Date(blog.created_at).toLocaleDateString()}`}
                                            variant="outlined"
                                            size="small"
                                        />
                                        <Box>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <ShareIcon />
                                            </IconButton>
                                            <IconButton aria-label="bookmark">
                                                <BookmarkIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <BlogContent variant="body1">
                                        {blog.content}
                                    </BlogContent>
                                </CardContent>
                            </>
                        ) : (
                            <>
                                <Skeleton variant="rectangular" height={300} />
                                <CardContent>
                                    <Skeleton variant="text" width="80%" height={60} />
                                    <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                                    <Skeleton variant="rectangular" height={200} />
                                </CardContent>
                            </>
                        )}
                    </StyledCard>
                </Grow>

                <Fade in={true} timeout={1500}>
                    <StyledCard elevation={3}>
                        <CardHeader title={`Comments (${comments.length})`} />
                        <CardContent>
                            {comments.length > 0 ? (
                                <Grid container spacing={2}>
                                    {comments.map((comment) => (
                                        <Grid item xs={12} key={comment.id}>
                                            <CommentCard variant="outlined">
                                                <CardHeader
                                                    avatar={<Avatar>{comment.user[0]}</Avatar>}
                                                    title={comment.user}
                                                    subheader={new Date(comment.created_at).toLocaleString()}
                                                />
                                                <CardContent>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {comment.comment}
                                                    </Typography>
                                                </CardContent>
                                            </CommentCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography variant="body1" align="center">
                                    No comments yet. Be the first to comment!
                                </Typography>
                            )}
                        </CardContent>
                    </StyledCard>
                </Fade>

                <Fade in={true} timeout={2000}>
                    <StyledCard elevation={3}>
                        <CardHeader title="Add a Comment" />
                        <CardContent>
                            <AddCommentForm onCommentSubmit={handleCommentSubmit} />
                        </CardContent>
                    </StyledCard>
                </Fade>

                <ScrollTop>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message="Comment added successfully!"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default BlogPostPage;
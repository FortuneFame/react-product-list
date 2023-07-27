import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { CommentsState, fetchComments } from '../../redux/slices/comments.slice';
import LoaderPage from '../LoaderPage/LoaderPage';
import { Box, Typography, Button, Container, Card, CardContent, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Comments: FC = () => {
  const { id } = useParams();
  const postId = id && !isNaN(parseInt(id)) ? parseInt(id) : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const commentsState = useSelector<RootState, CommentsState>((state) => state.comments);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (postId !== undefined) {
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);

  if (commentsState.status === 'loading') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="90vh"><LoaderPage /></Box>;
  }

  if (commentsState.status === 'failed') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="90vh">Error: {commentsState.error}</Box>;
  }

  return (
    <Container style={{ padding: '50px' }} maxWidth={matches ? 'md' : 'sm'}>
      <Box marginBottom={'50px'} sx={{ marginTop: theme.spacing(2) }}>
        <Button style={{ width: '100%' }} variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
      {commentsState.comments.length === 0 ? (
        <Typography variant="h6" gutterBottom>No comments found for this post.</Typography>
      ) : (
        commentsState.comments.map((comment) => (
          <Card key={comment.id} sx={{ marginBottom: theme.spacing(4) }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>{comment.name.charAt(0).toUpperCase() + comment.name.slice(1)}</Typography>
              <Typography variant="body1" gutterBottom>{comment.body.charAt(0).toUpperCase() + comment.body.slice(1)}</Typography>
              <Link href={`/user/${comment.id}`} variant="body2">View User Details</Link>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Comments;

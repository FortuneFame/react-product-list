import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCommentUser } from '../../redux/slices/commentUser.slice';
import LoaderPage from '../LoaderPage/LoaderPage';
import { Avatar, Box, Typography, Button, Container, Card, CardContent, CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const UserPage: FC = () => {
  const { id } = useParams();
  const userId = id && !isNaN(parseInt(id)) ? parseInt(id) : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.commentUser);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchCommentUser(userId));
    }
  }, [userId, dispatch]);

  if (status === 'loading') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><LoaderPage /></Box>;
  }

  if (status === 'failed' || !user) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">Error: {error || 'User not found'}</Box>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
      <Container maxWidth={matches ? 'md' : 'sm'}>
        <Box marginBottom={'50px'} sx={{ marginTop: theme.spacing(4) }}>
          <Button style={{ width: '100%' }} variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
        </Box>
        <Card>
          <CardHeader
            avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
            title={<Typography variant="h5">{user.name}</Typography>}
          />
          <CardContent>
            <Typography variant="body1" gutterBottom><strong>Login:</strong> {user.username}</Typography>
            <Typography variant="body1" gutterBottom><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1" gutterBottom><strong>Phone:</strong> {user.phone}</Typography>
            <Typography variant="body1" gutterBottom><strong>Web:</strong> {user.website}</Typography>
            {user.address && (
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> city: {user.address.city}, street:{' '}
                {user.address.street}, {user.address.suite}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UserPage;

import { Link } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import { FC } from 'react';

const erorrPage = require('../../assets/404-page.svg').default;

const NotFound: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{
          marginBottom: {
            xs: '40px',
            md: '30px',
            lg: '30px',
            xl: '50px',
          },
          marginTop: {
            xs: theme.spacing(2),
            md: '30px',
            lg: '30px',
            xl: '30px',
          },
        }}>
          Go Home
        </Button>
      </Link>
      <Box
        component="img"
        src={erorrPage}
        alt="erorrPage"
        sx={{
          width: {
            xs: '100%',
            sm: '80%',
            md: '70%',
            lg: '50%',
            xl: '40%',
          },
        }}
      />
    </Box>
  );
};

export default NotFound;
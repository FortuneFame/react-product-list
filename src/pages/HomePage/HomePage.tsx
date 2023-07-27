import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ProductList from '../../components/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';
import { logoutUser } from '../../redux/slices/user.slice';
import { filterByAll, filterByExistence, filterByNotExistence } from '../../redux/slices/product.slice';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { filtered } = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleFilterExistence = () => {
    dispatch(filterByExistence());
  };

  const handleFilterNotExistence = () => {
    dispatch(filterByNotExistence());
  };

  const handleFilterAll = () => {
    dispatch(filterByAll());
  };

  return (
    <Grid alignItems={'center'} justifyContent={'center'} padding={'50px 20px'}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
        <Grid display={'flex'} justifyContent={'center'} flexWrap={'wrap'} item xs={12}>
          <Typography textAlign={'center'} m={'20px'} variant="h3">Welcome, {user?.name}!</Typography>
        </Grid>
        <Button style={{ padding: '20px', marginBottom: '50px' }} onClick={handleLogout} variant="contained">Logout</Button>
      </div>
      <Grid item xs={12} sm={6}>
        <ProductForm />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid display={'flex'} justifyContent={'center'} item xs={12}>
          <Button style={{ margin: '20px' }} onClick={handleFilterAll} variant="contained">All</Button>
          <Button style={{ margin: '20px' }} onClick={handleFilterExistence} variant="contained">Existing</Button>
          <Button style={{ margin: '20px' }} onClick={handleFilterNotExistence} variant="contained">Non-Existing</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign={'center'} m={'30px'}>
            There are {filtered.filter((product) => product.exist).length} existing products in the warehouse out of {filtered.length} total.
          </Typography>
        </Grid>
        <ProductList />
      </Grid>
    </Grid>
  );
};

export default HomePage;

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { logoutUser } from '../redux/slices/userSlice';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { list, filtered } = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>There are {filtered.length} existing products in the warehouse out of {list.length} total.</p>
      <Button onClick={handleLogout}>Logout</Button>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default HomePage;

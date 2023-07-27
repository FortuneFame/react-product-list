import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/slices/product.slice';
import { RootState } from '../../redux/store';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';

const ProductForm: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.list);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [exist, setExist] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (products.some(product => product.id === id)) {
      alert('Product with this ID already exists');
    } else {
      dispatch(addProduct({ id, title, content, exist }));
      setId(0);
      setTitle('');
      setContent('');
      setExist(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      maxWidth: '600px',
      margin: '0 auto',
      marginBottom: '50px',
      padding: '16px',
      boxSizing: 'border-box',
    }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add a New Product
      </Typography>
      <TextField
        size="small"
        type="number"
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="ID"
        required
        fullWidth
        variant="standard"
      />
      <TextField
        size="small"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        fullWidth
        variant="standard"
      />
      <TextField
        size="small"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        multiline
        rows={4}
        fullWidth
        variant="standard"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={exist}
            onChange={(e) => setExist(e.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Exist"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Box>
  );
};

export default ProductForm;



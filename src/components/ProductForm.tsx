import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';

const ProductForm = () => {
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
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="ID"
        required
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required />
      <input
        type="checkbox"
        checked={exist}
        onChange={(e) => setExist(e.target.checked)} />
      Exist
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;

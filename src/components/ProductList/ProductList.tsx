import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeProduct, updateProduct } from '../../redux/slices/product.slice';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Cancel, Delete, Edit, Save, Visibility } from '@mui/icons-material';

const ProductList: FC = () => {
  const dispatch = useDispatch();
  const { filtered } = useSelector((state: RootState) => state.product);

  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [exist, setExist] = useState<boolean>(false);

  const startEditing = (id: number, title: string, content: string, exist: boolean) => {
    setEditId(id);
    setTitle(title);
    setContent(content);
    setExist(exist);
  };

  const saveEdit = (id: number) => {
    dispatch(updateProduct({ id, title, content, exist }));
    setEditId(null);
  };

  return (
    filtered.length > 0 ? (
      <TableContainer style={{ padding: '10px' }} component={Paper}>
        <Table style={{ maxWidth: '90%', margin: 'auto' }}>
          <TableHead>
            <TableRow >
              <TableCell style={{ textAlign: 'center' }}>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Exist</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                {editId === product.id ? (
                  <>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <TextField size="small" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </TableCell>
                    <TableCell>
                      <TextField size="small" multiline value={content} onChange={(e) => setContent(e.target.value)} required />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={exist} onChange={(e) => setExist(e.target.checked)} />
                    </TableCell>
                    <TableCell style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', height: '50px' }}>
                      <Button onClick={() => saveEdit(product.id)} color="success" startIcon={<Save />}></Button>
                      <Button onClick={() => setEditId(null)} color="error" startIcon={<Cancel />}></Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell style={{ textAlign: 'center' }}>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.content}</TableCell>
                    <TableCell>{product.exist ? 'Yes' : 'No'}</TableCell>
                    <TableCell style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: 'auto' }}>
                      <Button onClick={() => dispatch(removeProduct(product.id))} color="error"><Delete /></Button>
                      <Button onClick={() => startEditing(product.id, product.title, product.content, product.exist)} color="secondary"><Edit /></Button>
                      <Link to={`/comments/${product.id}`}>
                        <Button><Visibility /></Button>
                      </Link>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : <div>No products to display</div>
  );
};

export default ProductList;

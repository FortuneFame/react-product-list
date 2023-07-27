import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeProduct, updateProduct } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.product);
  
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [exist, setExist] = useState<boolean>(false);

  const startEditing = (id: number, title: string, content: string, exist: boolean) => {
    setEditId(id);
    setTitle(title);
    setContent(content);
    setExist(exist);
  }

  const saveEdit = (id: number) => {
    dispatch(updateProduct({ id, title, content, exist }));
    setEditId(null);
  }
  return (
    list.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Exist</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product) => (
            <tr key={product.id}>
              {editId === product.id ? (
                <>
                  <td>{product.id}</td>
                  <td>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </td>
                  <td>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                  </td>
                  <td>
                    <input type="checkbox" checked={exist} onChange={(e) => setExist(e.target.checked)} />
                  </td>
                  <td>
                    <button onClick={() => saveEdit(product.id)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                    
                  </td>
                </>
              ) : (
                <>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.content}</td>
                  <td>{product.exist ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => dispatch(removeProduct(product.id))}>Delete</button>
                    <button onClick={() => startEditing(product.id, product.title, product.content, product.exist)}>Edit</button>
                    <Link to={`/comments/${product.id}`}>
                      <button>View Comments</button>
                    </Link>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    ) : null
  );
};

export default ProductList;



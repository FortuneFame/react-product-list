import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  content: string;
  exist: boolean;
}

interface ProductState {
  list: Product[];
  filtered: Product[];
  filterType: FilterType;
}

export type FilterType = 'all' | 'exist' | 'not_exist';

const initialState: ProductState = {
  list: JSON.parse(localStorage.getItem('products') || '[]'),
  filtered: JSON.parse(localStorage.getItem('products') || '[]'),
  filterType: 'all', 
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.push(action.payload);
      state.filtered = state.list.filter((product) => {
        if (state.filterType === 'all') {
          return true;
        } else if (state.filterType === 'exist') {
          return product.exist;
        } else {
          return !product.exist;
        }
      });
      localStorage.setItem('products', JSON.stringify(state.list));
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((product) => product.id !== action.payload);
      state.filtered = state.filtered.filter((product) => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.list));
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        state.filtered = state.filtered.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      }
      localStorage.setItem('products', JSON.stringify(state.list));
    },
    filterByExistence: (state) => {
      state.filtered = state.list.filter((product) => product.exist);
      state.filterType = 'exist';
    },

    filterByNotExistence: (state) => {
      state.filtered = state.list.filter((product) => !product.exist);
      state.filterType = 'not_exist';
    },

    filterByAll: (state) => {
      state.filtered = state.list;
      state.filterType = 'all';
    },
    selectProduct: (state, action: PayloadAction<number>) => {
      const selectedProductId = action.payload;
      state.filtered = state.list.filter((product) => product.id === selectedProductId);
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  filterByExistence,
  filterByNotExistence,
  selectProduct,
  filterByAll
} = productSlice.actions;

export default productSlice.reducer;

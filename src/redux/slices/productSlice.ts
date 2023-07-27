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
  list: [],
  filtered: [],
  filterType: 'all',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.push(action.payload);
      state.filtered = state.list.filter((product) => product.exist);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((product) => product.id !== action.payload);
      state.filtered = state.list.filter((product) => product.exist);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      state.filtered = state.list.filter((product) => product.exist);
    },
    filterByExistence: (state) => {
      state.filtered = state.list.filter((product) => product.exist);
    },

    filterByNotExistence: (state) => {
      state.filtered = state.list.filter((product) => !product.exist);
    },
    selectProduct: (state, action: PayloadAction<number>) => {
      const selectedProductId = action.payload;
      state.filtered = state.list.filter((product) => product.id === selectedProductId);
    },
  },
});

export const { addProduct, removeProduct, updateProduct, filterByExistence, filterByNotExistence,selectProduct } = productSlice.actions;

export default productSlice.reducer;

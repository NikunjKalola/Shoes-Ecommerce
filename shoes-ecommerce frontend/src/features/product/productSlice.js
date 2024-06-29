import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  fetchColors,
  fetchProductByID,
  fetchProductsByFilters,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  colors: [],
  selectedProduct: null,
};



export const fetchProductByIDAsync = createAsyncThunk(
  "product/fetchProductByIDAsync",
  async (id) => {
    const response = await fetchProductByID(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFiltersAsync",
  async ({ filter, sort, pagination, price,category }) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      pagination,
      price,
      category
    );
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const addProductAsync = createAsyncThunk(
  "product/addProductAsync",
  async (data) => {
    const response = await addProduct(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProductAsync",
  async (update) => {
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProductAsync",
  async (update) => {
    const response = await deleteProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.products += 1;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIDAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIDAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      })

      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectColors = (state) => state.product.colors;
export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;


export default productSlice.reducer;

import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "";

const useProductStore = create((set, get) => ({
  // products state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // form state for adding / updating product
  formData: {
    name: "",
    image: "",
    price: "",
  },

  setFormData: (data) => {
    set({ formData: data });
  },
  resetForm: () => {
    set({ formData: { name: "", image: "", price: "" } });
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, loading: false });
    } catch (error) {
      if (error.status === 429) {
        set({
          error: "Rate limit exceeded.",
          loading: false,
          products: [],
        });
      } else {
        set({ error: error.message, loading: false, products: [] });
      }
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }));
      toast.success("Product deleted successfully.");
    } catch (error) {
      set({ error: error.message, loading: false });
      console.log("Error in deleteProduct function", error);
      toast.error("Something went wrong.");
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/products`,
        get().formData
      );
      set((state) => ({
        products: [...state.products, response.data],
        loading: false,
      }));
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");

      document.getElementById("add_product_modal").close();
    } catch (error) {
      set({ error: error.message, loading: false });
      console.log("Error in addProduct function", error);
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  clearCurrentProduct: () => set({ currentProduct: null }),

  // (optional) safer fetchProduct mapping to avoid dumping extra fields into formData
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      const p = response.data.data;
      set({
        currentProduct: p,
        formData: {
          name: p.name ?? "",
          image: p.image ?? "",
          price: p.price ?? "",
        },
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        get().formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;

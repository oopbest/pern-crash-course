import React, { useEffect } from "react";
import useProductStore from "../store/useProductStore";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

export default function ProductPage() {
  const {
    currentProduct,
    fetchProduct,
    loading,
    error,
    updateProduct,
    formData,
    setFormData,
    deleteProduct,
    resetForm,
    clearCurrentProduct,
  } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id);

    // Cleanup when leaving this page
    return () => {
      resetForm();
      clearCurrentProduct?.();
    };
  }, [fetchProduct, id, resetForm, clearCurrentProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?"))
      await deleteProduct(id);
    navigate("/");
  };

  const goBack = () => {
    resetForm();
    clearCurrentProduct?.();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={goBack} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* product image */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="size-full object-cover"
          />
        </div>

        {/* product form */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id, formData);
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  className="input input-bordered"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Image URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              {/* form actions */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error"
                >
                  <Trash2Icon className="size-5 mr-2" />
                  Delete
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <SaveIcon className="size-5 mr-2" /> Save{" "}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

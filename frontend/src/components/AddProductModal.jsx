import { forwardRef, useImperativeHandle, useRef } from "react";
import useProductStore from "../store/useProductStore";
import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircle,
} from "lucide-react";

const AddProductModal = forwardRef(function AddProductModal(_, ref) {
  const dialogRef = useRef(null);
  const { addProduct, formData, setFormData, loading } = useProductStore();

  // expose open/close to parent
  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  const onSubmit = async (e) => {
    await addProduct(e); // your store handler handles preventDefault, etc.
    // if add succeeded you can close here; if you track error, check it first
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* close (X) button */}
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
        >
          ✕
        </button>

        {/* header */}
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        {/* main form (NOTE: this is the ONLY form inside modal-box) */}
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* product name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">
                Product Name
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                <Package2Icon className="size-5" />
              </div>
              <input
                type="text"
                placeholder="Enter product name"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-300"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* product price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Price</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                <DollarSignIcon className="size-5" />
              </div>
              <input
                type="number"
                min={0}
                step={0.01}
                placeholder="0.00"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-300"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
          </div>

          {/* product image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Image URL</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                <ImageIcon className="size-5" />
              </div>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-300"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
          </div>

          {/* actions (NO nested form here) */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.name || !formData.price || !formData.image || loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner text-white" />
              ) : (
                <>
                  <PlusCircle className="size-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* DaisyUI backdrop (kept OUTSIDE the main form) */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close backdrop">close</button>
      </form>
    </dialog>
  );
});

export default AddProductModal;

import useProductStore from "../store/useProductStore";
import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircle,
} from "lucide-react";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();
  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* close button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {/* modal header */}
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        {/* form */}
        <form className="space-y-6" onSubmit={addProduct}>
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Image URL</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-content/50">
                <ImageIcon className="size-5" />
              </div>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-300"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
          </div>
        </form>

        {/* modal actions */}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
          </form>
          <button
            type="submit"
            className="btn btn-primary min-w-[120px]"
            disabled={!formData.name || !formData.price || !formData.image}
          >
            {loading ? (
              <span className="loading loading-spinner text-white"></span>
            ) : (
              <>
                <PlusCircle className="size-5 mr-2" />
                Add Product
              </>
            )}
          </button>
        </div>
      </div>

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddProductModal;

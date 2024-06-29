import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  addProductAsync,
  fetchProductByIDAsync,
  selectProduct,
  updateProductAsync,
} from "../../product/productSlice";
function AdminProductForm() {
  const dispatch = useDispatch();
  let [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const params = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const product = useSelector(selectProduct);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIDAsync(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product && params.id) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("rating", product.rating);
      setValue("category", product.category);
      setValue("brand", product.brand);
      setValue("discountPercentage", product.discountPercentage);
      setValue("imageSrc", product.imageSrc);
      setValue("image1", product.images[0]);
      setValue("image2", product.images[1]);
      setValue("image3", product.images[2]);
      setValue("image4", product.images[3]);
      setValue("color", product.color);
      // const sizee = product.size
      // setValue("size", sizee[0].value);

    }
  }, [product]);

  const onSubmit = (data) => {
    const color = data.color;
    console.log(color);
    let colArray = typeof(color)=="string"?color.split(","):color;

    const formProduct = {
      ...data,
      imageSrc: image!==null?image:data.imageSrc,
      images: [data.image1, data.image2, data.image3, data.image4],
      color: colArray
    };
    console.log(formProduct);
    delete formProduct.image1;
    delete formProduct.image2;
    delete formProduct.image3;
    delete formProduct.image4;
    
    if (params.id) {
      dispatch(updateProductAsync({ ...formProduct, id: params.id }));
    } else {
      dispatch(addProductAsync(formProduct));
    }
    navigate("/admin");
  };
  //TODO : redirect to order sucess pages
  //clear cart after every order
  //change stocks number of items after order
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 p-12 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 ">
            <form className="" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Product Information
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          {...register("name", {
                            required: "Product name is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <span className="text-red-500">
                            {errors.name.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Discription
                      </label>
                      <div className="mt-2">
                        <input
                          id="description"
                          {...register("description", {
                            required: "description is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.description && (
                          <span className="text-red-500">
                            {errors.description.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        price
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register("price", {
                            required: "price is required",
                          })}
                          id="price"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.price && (
                          <span className="text-red-500">
                            {errors.price.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="discountPercentage"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Discount Percentage
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register("discountPercentage", {
                            required: "discount-percentage is required",
                          })}
                          id="discountPercentage"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.discountPercentage && (
                          <span className="text-red-500">
                            {errors.discountPercentage.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Rating
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register("rating", {
                            required: "rating is required",
                          })}
                          id="rating"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.rating && (
                          <span className="text-red-500">
                            {errors.rating.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="stock"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stock
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register("stock", {
                            required: "stock is required",
                          })}
                          id="stock"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.stock && (
                          <span className="text-red-500">
                            {errors.stock.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* <div className="sm:col-span-2">
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                      >
                        Brand
                      </label>
                      <div className="mt-2">
                        <input
                          id="brand"
                          {...register("brand", {
                            required: "brand is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.brand && (
                          <span className="text-red-500">
                            {errors.brand.message}
                          </span>
                        )}
                      </div>
                    </div> */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <input
                          id="category"
                          {...register("category", {
                            required: "category is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.category && (
                          <span className="text-red-500">
                            {errors.category.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Color
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="color"
                          id="color"
                          {...register("color", {
                            required: "Color is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.color && (
                          <span className="text-red-500">
                            {errors.color.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* <div className="sm:col-span-3">
                      <label
                        htmlFor="size"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Size
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="size"
                          id="size"
                          {...register("size", {
                            required: "Size is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.size && (
                          <span className="text-red-500">
                            {errors.size.message}
                          </span>
                        )}
                      </div>
                    </div> */}

                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Image thumbnail
                      </label>
                      <div className="mt-2">
                        <input
                          id="imageSrc"
                          {...register("imageSrc", {
                            required: "imageSrc is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.imageSrc && (
                          <span className="text-red-500">
                            {errors.imageSrc.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Image 1
                      </label>
                      <div className="mt-2">
                        <input
                          id="image1"
                          {...register("image1", {
                            required: "image1 is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.image1 && (
                          <span className="text-red-500">
                            {errors.image1.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Image 2
                      </label>
                      <div className="mt-2">
                        <input
                          id="image2"
                          {...register("image2", {
                            required: "image2 is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.image2 && (
                          <span className="text-red-500">
                            {errors.image2.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Image 3
                      </label>
                      <div className="mt-2">
                        <input
                          id="image3"
                          {...register("image3", {
                            required: "image3 is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.image3 && (
                          <span className="text-red-500">
                            {errors.image3.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Image 4
                      </label>
                      <div className="mt-2">
                        <input
                          id="image4"
                          {...register("image4", {
                            required: "image4 is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.image4 && (
                          <span className="text-red-500">
                            {errors.image4.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6  flex items-center justify-between gap-x-6">
                <Link
                  to="/admin"
                  className="text-sm font-semibold  leading-6 text-gray-900"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600   px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {params.id ? "Edit" : "Add"}
                </button>
              </div>
            </form>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {image && (
                <div>
                  <h2>Preview:</h2>
                  <img
                    src={image}
                    alt="Uploaded"
                    style={{ maxWidth: "300px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProductForm;

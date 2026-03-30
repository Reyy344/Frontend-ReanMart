import type React from "react";
import { useState } from "react";
import { FaStar, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductDetailLayout } from "../organism/ProductDetailLayout";
import { UserNavbar } from "../molecules/UserNavbar";
import { Breadcrumbs } from "../molecules/Breadcrumbs";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  is_available: boolean;
  ratings: number;
  total_sold: number;
}

export const ProductDetailTemplate: React.FC = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const getProductDetail = async (): Promise<Product> => {
    const response = await fetch(`http://localhost:8080/products/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product detail");
    }

    return response.json();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert(
        "Silahkan Login terlebih dahulu untuk menambahkan produk ini ke keranjang!",
      );
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("Silahkan Login terlebih dahulu untuk membeli produk ini!");
    }
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: getProductDetail,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading Produk...</p>;
  if (error) return <p>Error Loading Produk</p>;
  if (!product) return <p>Produknya ngga ketemu nih</p>;

  const productImages = [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url,
  ];

  const activeImage = productImages[selectedImageIndex];

  const shippingCost: number = 0;
  const subtotal = product.price * quantity;
  const totalPrice = subtotal + shippingCost;

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  return (
    <ProductDetailLayout>
      <UserNavbar
        brandHref="/"
        items={
          isLoggedIn
            ? [
                {
                  key: "cart",
                  label: "Keranjang",
                  onClick: () => navigate("/cart"),
                  // badge: cartCount,
                },
                {
                  key: "profile",
                  label: "Profile",
                  onClick: () => navigate("/profile"),
                },
                {
                  key: "logout",
                  label: "Logout",
                  onClick: handleLogout,
                  danger: true,
                },
              ]
            : [
                {
                  key: "login",
                  label: "Login",
                  onClick: () => navigate("/login"),
                },
              ]
        }
      />
      <main className="flex-1 px-4 pt-23 pb-26">
        <div className="p-6">
          <Breadcrumbs />
          <h1 className="mt-4">{product.name}</h1>
        </div>

        <div className="flex flex-row gap-4">
          <div className="mt-6 w-full max-w-xl flex flex-col">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="h-[420px] w-full rounded-xl object-cover"
              />
            </div>

            {/* GALLERY */}
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {productImages.map((image, index) => {
                const isActive = index === selectedImageIndex;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`overflow-hidden rounded-xl border-2 transition ${
                      isActive
                        ? "border-[#81A6C6]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10 flex-1 w-max">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <div className="flex items-center mt-2 gap-4">
              <div className="flex flex-row items-center gap-2">
                <FaStar className="text-xl text-[#FDC700]" />
                <FaStar className="text-xl text-[#FDC700]" />
                <FaStar className="text-xl text-[#FDC700]" />
                <FaStar className="text-xl text-[#FDC700]" />
                <FaStar className="text-xl text-[#FDC700]" />
              </div>

              <p className="font-semibold text-xl ">{product.ratings}</p>

              <p className="text-gray-300">|</p>

              <p className="text-xl">{product.total_sold} terjual</p>
            </div>

            <h3 className="mt-4 text-4xl font-bold">
              Rp {product.price.toLocaleString("id-ID")}
            </h3>
            <div className="mt-4 bg-[#81A6C6] p-4 rounded-full w-max">
              <p className="font-semibold text-gray-200">
                Stok tersedia: {product.stock}
              </p>
            </div>
            <div className="flex flex-col mt-6 flex gap-4">
              <h3 className="font-semibold text-xl">Deskripsi Produk</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>

          {/* PURCHASE OPTIONS */}
          <div className="mt-10 w-full max-w-[360px] shrink-0">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                Purchase Options
              </p>

              <div className="mt-5 rounded-[22px] bg-slate-100 p-3">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleDecreaseQuantity}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#3E7395] shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </button>

                  <span className="min-w-[40px] text-center text-2xl font-semibold text-slate-800">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncreaseQuantity}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#3E7395] shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={quantity >= product.stock}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-b border-slate-200 pb-6">
                <div className="flex items-center justify-between text-base text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-base text-slate-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#3E7395]">
                    {shippingCost === 0
                      ? "Free"
                      : `Rp ${shippingCost.toLocaleString("id-ID")}`}
                  </span>
                </div>

                <div className="flex items-end justify-between pt-1">
                  <span className="text-xl font-bold text-slate-800">
                    Total Price
                  </span>
                  <span className="text-3xl font-bold text-[#3E7395]">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#3E7395] px-4 py-4 text-lg font-semibold text-white transition hover:bg-[#355f7b]"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full rounded-2xl bg-[#B7D8F3] px-4 py-4 text-lg font-semibold text-[#2F5873] transition hover:bg-[#a7cae7]"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProductDetailLayout>
  );
};

// import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomepageLayout } from "../organism/HomepageLayout";
import { FaStar } from "react-icons/fa";
import { UserNavbar } from "../molecules/UserNavbar";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  is_available: boolean;
  ratings: boolean;
  total_sold: number;
}

// interface CartItem extends Product {
//   qty: number;
// }

interface Category {
  id: string;
  name: string;
  icon: string;
}

export const HomepageTemplate: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // const currentUsername = localStorage.getItem("username") || "User";
  // const cartKey = `cart_${currentUsername}`;
  // const [cartCount, setCartCount] = React.useState(0);
  // const [toast, setToast] = React.useState<string | null>(null);

  // const showToast = (message: string) => {
  //   setToast(message);
  //   setTimeout(() => setToast(null), 2000);
  // };

  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
  //   setCartCount(cart.length);
  // }, [cartKey]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  // const handleAddToCart = (product: Product) => {
  //   if (!isLoggedIn) {
  //     alert(
  //       "Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.",
  //     );
  //     return;
  //   }

  //   if (!product.is_available) {
  //     showToast(`${product.name} sedang tidak tersedia.`);
  //     return;
  //   }

  //   const raw = localStorage.getItem(cartKey);
  //   const cart: CartItem[] = raw ? JSON.parse(raw) : [];
  //   const existingIndex = cart.findIndex((item) => item.id === product.id);

  //   if (existingIndex !== -1) {
  //     // Produk sudah ada, tambah qty
  //     cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
  //   } else {
  //     // Produk baru
  //     cart.push({ ...product, qty: 1 });
  //   }

  //   localStorage.setItem(cartKey, JSON.stringify(cart));
  //   showToast(`${product.name} ditambahkan ke keranjang!`);

  //   setCartCount(cart.length);
  // };

  const getCategories = async (): Promise<Category[]> => {
    const response = await fetch("http://localhost:8080/categories");

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  };

  const getProducts = async (): Promise<Product[]> => {
    const response = await fetch("http://localhost:8080/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  };

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: products = [],
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <HomepageLayout>
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

      <main className="flex-1 px-4 pt-23 pb-6">
        {/* GAMBAR UTAMA */}
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Gambar Kiri */}
            <div className="min-h-[420px] flex-1 rounded-2xl bg-gray-300"></div>

            {/* Gambar Kanan */}
            <div className="flex flex-col gap-4 lg:w-[38%]">
              {/* Gambar Atas Kanan */}
              <div className="min-h-[202px] rounded-2xl bg-gray-300 "></div>

              {/* Gambar Bawah Kanan */}
              <div className="min-h-[202px] rounded-2xl bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* KATEGORI PRODUK */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex item-center gap-2">
            <div className="h-7 w-2 rounded-full bg-[#81A6C6]"></div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Kategori Teratas
            </h2>
          </div>

          {isCategoriesLoading ? (
            <p>Loading categories...</p>
          ) : categoriesError ? (
            <p>Error loading categories: {categoriesError.message}</p>
          ) : categories.length === 0 ? (
            <p>Belum ada kategori yang tersedia.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {categories?.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center bg-blue-500 rounded-full text-2xl text-white">
                    {category.icon}
                  </div>
                  <p className="text-center text-sm font-medium text-gray-900">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 p-6">
          <div className="mb-5 flex items-center gap-2">
            <div className="h-7 w-2 rounded-full bg-[#81A6C6]"></div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Produk Terkait
            </h2>
          </div>

          {isProductsLoading ? (
            <p>Loading Products...</p>
          ) : productsError ? (
            <p>Error loading products: {productsError.message}</p>
          ) : products.length === 0 ? (
            <p>Belum ada produk yang tersedia.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm p-4"
                >
                  {/* GAMBAR CARD */}
                  <div className="flex flex-col items-center">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-40 w-50 object-cover sm:h-32 lg:h-36"
                    />
                  </div>

                  {/* NAMA */}
                  <div className="mt-4 p-2.5 sm:p-3">
                    <h3 className="font-semibold text-sm">{product.name}</h3>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <FaStar className="text-[#FDC700]" />
                      <p className="text-sm text-[#4A596C]">
                        {product.ratings}
                      </p>
                      <p className="text-xs text-[#6D8AA3]">
                        ({product.total_sold} sold)
                      </p>
                    </div>

                    <h2 className="mt-4 font-bold text-xl">
                      Rp. {product.price.toLocaleString("id-ID")}
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-xl px-2 py-3 text-xs bg-[#AACDDC] font-semibold text-white sm:text-sm"
                  >
                    Tambahkan Ke Keranjang
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-linear-to-r from-[#6D8AA3] from-0% to-[#AACDDC] to-100% text-white">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 md:gap-10 lg:px-10">
          {/* Kiri */}
          <div>
            <h2 className="text-xl font-semibold mb-3">ReanMart</h2>
            <p className="text-sm leading-relaxed text-gray-200">
              ReanMart adalah sebuat platform untuk Belanja Online. Dimudahkan
              dengan fitur yang gampang untuk dijangkau dan Cepat.
            </p>
          </div>

          {/* Tengah */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Customer Service</h2>
            <ul className="text-sm space-y-2 text-gray-200">
              <li className="cursor-pointer hover:underline">Help Center</li>
              <li className="cursor-pointer hover:underline">Track Order</li>
              <li className="cursor-pointer hover:underline">Return</li>
              <li className="cursor-pointer hover:underline">Shipping Info</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <ul className="text-sm space-y-2 text-gray-200">
              <li className="cursor-pointer hover:underline">About Us</li>
              <li className="cursor-pointer hover:underline">Careers</li>
              <li className="cursor-pointer hover:underline">Press</li>
              <li className="cursor-pointer hover:underline">Blog</li>
            </ul>
          </div>

          {/* Kanan */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
            <p>We Accept:</p>
            <div className="flex gap-2">
              <div className="bg-white/46 rounded-sm items-center w-20">
                <p className="text-black">💳 Cards</p>
              </div>
              <div className="bg-white/46 rounded-sm items-center w-25">
                <p className="text-black">📱E-Wallets</p>
              </div>

              <div className="bg-white/46 rounded-sm items-center w-17">
                <p className="text-black">📲 QRIS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Garis */}
        <div className="mx-4 border-t border-white/30 sm:mx-6 lg:mx-10"></div>

        {/* Copyright */}
        <div className="text-center py-5 text-sm text-gray-200">
          © 2026 Rean Restaurant. All Rights Reserved.
        </div>
      </footer>
    </HomepageLayout>
  );
};

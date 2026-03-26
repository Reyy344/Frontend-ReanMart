import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

interface UserNavbarItem {
  key: string;
  label: string;
  onClick: () => void;
  badge?: number;
  danger?: boolean;
}

interface UserNavbarProps {
  items: UserNavbarItem[];
  brandHref?: string;
}

export const UserNavbar: React.FC<UserNavbarProps> = ({
  brandHref = "/",
  items,
}) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-linear-to-r from-[#81A6C6] from-3% to-[#AACDDC] to-67% px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4">
        {/* LEFT */}
        <a
          href={brandHref}
          className="min-w-[170px] font-poppins text-2xl font-bold text-white"
        >
          ReanMart
        </a>
        {/* CENTER */}
        <div className="flex-1">
          <div className="flex h-10 overflow-hidden rounded-xl bg-white">
            <input
              type="text"
              placeholder="Cari Produk..."
              className="w-full px-5 text-sm text-gray-700 outline-none"
            />
            <button
              type="button"
              className="flex w-14 items-center justify-center bg-[#7397BC] text-white"
            >
              <FaSearch className="text-lg" />
            </button>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex min-w-[120px] items-center justify-end gap-3">
          {items
            .filter((item) => item.key === "cart")
            .map((item) => (
              <button
                key={item.key}
                onClick={item.onClick}
                className="relative rounded-full p-2 text-white transition hover:bg-white/10"
                title={item.label}
              >
                <FaShoppingCart className="text-2xl" />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}

          {items
            .filter(
              (item) =>
                item.key === "login" ||
                item.key === "profile" ||
                item.key === "logout",
            )
            .map((item) => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`w-[120px] rounded-xl px-5 py-2 text-lg cursor-pointer font-semibold transition ${
                  item.danger
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : item.key === "profile"
                      ? "bg-white/20 text-white hover:bg-white/30"
                      : "bg-[#7397BC] text-white hover:bg-[#6489ae]"
                }`}
              >
                {item.label}
              </button>
            ))}
        </div>
      </div>
    </nav>
  );
};

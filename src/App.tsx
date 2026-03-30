import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import { HomepagePage } from "./components/pages/HomepagePage";
import { LoginPage } from "./components/pages/LoginPage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import ErrorPage from "./error";

const RootLayout = () => <Outlet />;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      handle: {
        breadcrumb: () => <Link to="/">Home</Link>,
      },
      children: [
        {
          index: true,
          element: <HomepagePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "products/:id",
          element: <ProductDetailPage />,
          handle: {
            breadcrumb: () => <span>Detail Produk</span>,
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

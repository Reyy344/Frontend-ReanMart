import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomepagePage } from "./components/pages/HomepagePage";
import { LoginPage } from "./components/pages/LoginPage";
import ErrorPage from "./error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomepagePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

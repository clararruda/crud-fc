import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./pages/home/App";
import { UserPage } from "./pages/list/userList";
import { UserEdit } from "./pages/edit/userEdit";
import { Login } from "./pages/login/login";
import { Register } from "./pages/create/create";
import { StoreProvider } from "./context/provider";
import { PassRecover } from "./pages/recover/passRecover";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 ERROR</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/userList",
    element: <UserPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/edit",
    element: <UserEdit />,
  },
  {
    path: "/recover",
    element: <PassRecover />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>
);

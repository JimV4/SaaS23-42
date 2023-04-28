import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyChartsLogo from "./components/UI/MyChartsLogo";
import HomePage from "./pages/HomePage";
import ConfirmLogin from "./components/Login/ConfirmLogin";
import MyAccountPage from "./pages/MyAccountPage";
import BuyCreditsPage from "./pages/BuyCreditsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyChartsLogo />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <ConfirmLogin />,
      },
      {
        path: "my-account",
        element: <MyAccountPage />,
      },
      {
        path: "buy-credits",
        element: <BuyCreditsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

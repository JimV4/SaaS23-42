import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyChartsLogo from "./components/UI/MyChartsLogo";
import HomePage from "./pages/HomePage";
import MyAccountPage from "./pages/MyAccountPage";
import BuyCreditsPage from "./pages/BuyCreditsPage";
import NewChartPage from "./pages/NewChartPage";
import ConfirmLoginPage from "./pages/ConfirmLoginPage";

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
        element: <ConfirmLoginPage />,
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
  {
    path: "new-chart",
    element: <NewChartPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

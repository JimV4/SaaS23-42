import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyChartsLogo from "./components/UI/MyChartsLogo";
import HomePage from "./pages/HomePage";
import MyAccountPage from "./pages/MyAccountPage";
import BuyCreditsPage from "./pages/BuyCreditsPage";
import NewChartPage from "./pages/NewChartPage";
import ConfirmLoginPage from "./pages/ConfirmLoginPage";
import CreatedChartPage from "./pages/CreatedChartPage";
import NotFoundPage from "./pages/NotFoundPage";
import useRequireAuth from "./components/hooks/useRequireAuth";
import ProtectedRoute from "./ProtectedRoute";
import MyChartsPage from "./pages/MyChartsPage";
import MyChartsLogoV from "./components/UI/MyChartsLogoV";
import AboutPage from "./pages/AboutPage";

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
      {
        path: "my-charts",
        element: <MyChartsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "new-chart",
        element: <NewChartPage />,
        children: [],
      },
    ],
  },

  {
    path: "new-chart/created-chart",
    element: <CreatedChartPage />,
  },
  /*  {
    path: "new-chart",
    element: (
      <div>
        <MyChartsLogoV />
        <NewChartPage />
      </div>
    ),
    children: [],
  },
  {
    path: "new-chart/created-chart",
    element: (
      <div>
        <MyChartsLogoV />
        <CreatedChartPage />
      </div>
    ),
  }, */
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

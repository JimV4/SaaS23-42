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
        element: <ProtectedRoute element={MyAccountPage} />,
      },
      {
        path: "buy-credits",
        element: <ProtectedRoute element={BuyCreditsPage} />,
      },
    ],
  },
  {
    path: "new-chart",
    element: <ProtectedRoute element={NewChartPage} />,
    children: [],
  },
  {
    path: "new-chart/created-chart",
    element: <ProtectedRoute element={CreatedChartPage} />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

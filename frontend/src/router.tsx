import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import SubtaskPage from "./pages/SubTaskPage";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tasks/:taskId/subtasks', 
        element: <SubtaskPage /> }
    ]
  }
]);

export default router;
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { TaskContextProvider } from "./contexts/TaskContext";

export function App() {
    return (
      <TaskContextProvider>
        <RouterProvider router={router} />
      </TaskContextProvider>
    );
}
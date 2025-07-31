// src/router.jsx
import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Chats from "./pages/Chats";
import ComplainBoard from "./pages/ComplainBoard";
import RequestBoard from "./pages/RequestBoard";
import EventsBoard from "./pages/EventsBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "chats", element: <Chats /> },
      { path: "complain-board", element: <ComplainBoard /> },
      { path: "request-board", element: <RequestBoard /> },
      { path: "events-board", element: <EventsBoard /> },
    ],
  },
]);

export default router;

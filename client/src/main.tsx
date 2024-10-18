import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import Authlayout from "./components/Authlayout.tsx";
import {
  LoginForm,
  SignupForm,
  Welcome,
  LikedVideo,
  History,
  Tweet,
  Playlist,
  Subscription,
  Dashboard,
  SinglevideoPage,
  ChannelProfilePage,
  PlaylistVideoPage,
} from "./pages/index.ts";

// eslint-disable-next-line react-refresh/only-export-components
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "liked-video",
        element: (
          <Authlayout auth={true}>
            <LikedVideo />
          </Authlayout>
        ),
      },
      {
        path: "history",
        element: (
          <Authlayout auth={true}>
            <History />
          </Authlayout>
        ),
      },
      {
        path: "tweet",
        element: <Tweet />,
      },
      {
        path: "playlist",
        element: (
          <Authlayout auth={true}>
            <Playlist />
          </Authlayout>
        ),
      },
      {
        path: "subscription",
        element: (
          <Authlayout auth={true}>
            <Subscription />
          </Authlayout>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Authlayout auth={false}>
            <Dashboard />
          </Authlayout>
        ),
      },
      {
        path: "watch/:videoId",
        element: (
          <Authlayout auth={true}>
            <SinglevideoPage />
          </Authlayout>
        ),
      },
      {
        path: "channel/:channelId",
        element: (
          <Authlayout auth={true}>
            <ChannelProfilePage />
          </Authlayout>
        ),
      },
      {
        path: "playlist/:playlistId",
        element: (
          <Authlayout auth={true}>
            <PlaylistVideoPage />
          </Authlayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

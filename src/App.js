import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCar from "./Pages/AddCar/AddCar";
import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Page404 from "./Pages/Page404/Page404";
import UpdateCar from "./Pages/UpdateCar/UpdateCar";
import { getUser } from "./redux/authSlice";

function App() {
  const currentUser = useSelector(getUser);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Auth />} />
          <Route path="dashboard">
            <Route
              index
              element={
                <RequireAuth>
                  <Dashboard />{" "}
                </RequireAuth>
              }
            />
            <Route
              path="addcar"
              element={
                <RequireAuth>
                  <AddCar />
                </RequireAuth>
              }
            />
            <Route
              path="update/:id"
              element={
                <RequireAuth>
                  <UpdateCar />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

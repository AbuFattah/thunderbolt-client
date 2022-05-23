import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Purchase from "./pages/Purchase";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignIn/SignUp";
import RequireAuth from "./components/Login/RequireAuth";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/MyOrders/MyOrders";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="my-orders" element={<MyOrders />}></Route>
          <Route path="my-profile" element={<p>hello</p>}></Route>
          <Route path="add-review" element={<p>hello</p>}></Route>
        </Route>
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        ></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;

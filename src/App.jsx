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
import NotFound from "./pages/NotFound";
import MyProfile from "./pages/Dashboard/MyProfile";
import AddReview from "./pages/Dashboard/AddReview";
import ManageOrders from "./pages/Dashboard/Admin/ManageOrders";
import ManageProducts from "./pages/Dashboard/Admin/ManageProducts";
import AddProduct from "./pages/Dashboard/Admin/AddProduct";
import RequireAdmin from "./components/Admin/RequireAdmin";
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
          <Route
            index
            element={
              <RequireAuth>
                <MyProfile />
              </RequireAuth>
            }
          ></Route>
          <Route path="my-orders" element={<MyOrders />}></Route>
          <Route path="add-review" element={<AddReview />}></Route>
          <Route
            path="manage-orders"
            element={
              <RequireAdmin>
                <ManageOrders />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manage-products"
            element={
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="add-product"
            element={
              <RequireAdmin>
                <AddProduct />
              </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;

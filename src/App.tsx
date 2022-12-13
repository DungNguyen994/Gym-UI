import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import PersitLogin from "./Authentication/PersistLogin";
import Register from "./Authentication/Register";
import RequiredAuth from "./Authentication/RequiredAuth";
import Layout from "./Generic Components/Layout";
import { usePrivateClient } from "./hooks/usePrivateClient";
import Home from "./Pages/Home";
import MemberDetails from "./Pages/Members/MemberDetails";
import FindMember from "./Pages/Members/FindMember";
import Inventory from "./Pages/Inventory";
import Products from "./Pages/Products";
import AddNewProduct from "./Pages/Products/AddNewProduct";
import { ROUTES } from "./routes";
import ProductDetails from "./Pages/Products/ProductDetails";

export default function App() {
  const client = usePrivateClient();
  return (
    <ApolloProvider client={client}>
      <Routes>
        {/*public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*protected routes */}
        <Route element={<PersitLogin />}>
          <Route element={<RequiredAuth />}>
            <Route path="/" element={<Layout />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.FINDMEMBER} element={<FindMember />} />
              <Route path={ROUTES.ADDMEMBER} element={<MemberDetails />} />
              <Route path={ROUTES.EDITMEMBER} element={<MemberDetails />} />
              <Route path={ROUTES.INVENTORY} element={<Inventory />} />
              <Route path={ROUTES.PRODUCTS} element={<Products />} />
              <Route path={ROUTES.NEWPRODUCT} element={<AddNewProduct />} />
              <Route path={ROUTES.EDITPRODUCT} element={<ProductDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

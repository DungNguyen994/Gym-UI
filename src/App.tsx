import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import PersitLogin from "./Authentication/PersistLogin";
import Register from "./Authentication/Register";
import RequiredAuth from "./Authentication/RequiredAuth";
import Layout from "./Generic Components/Layout";
import Inventory from "./Pages/Inventory";
import FindMember from "./Pages/Members/FindMember";
import MemberDetails from "./Pages/Members/MemberDetails";
import POS from "./Pages/POS";
import Products from "./Pages/Products";
import AddNewProduct from "./Pages/Products/AddNewProduct";
import ProductDetails from "./Pages/Products/ProductDetails";
import { usePrivateClient } from "./hooks/usePrivateClient";
import { ROUTES } from "./routes";
import { useEffect } from "react";
import VisitHistoryPage from "./Pages/VisitHistory";

export default function App() {
  const client = usePrivateClient();
  //clear store cache everyday
  useEffect(() => {
    const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
    const interval = setInterval(async () => {
      client.resetStore();
      console.log("Cache is Clear!");
    }, DAY_IN_MILISECONDS);

    return () => clearInterval(interval);
  }, [client]);
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
              <Route path={ROUTES.HOME} element={<FindMember />} />
              <Route path={ROUTES.FINDMEMBER} element={<FindMember />} />
              <Route path={ROUTES.ADDMEMBER} element={<MemberDetails />} />
              <Route path={ROUTES.EDITMEMBER} element={<MemberDetails />} />
              <Route path={ROUTES.POS} element={<POS />} />
              <Route path={ROUTES.INVENTORY} element={<Inventory />} />
              <Route path={ROUTES.PRODUCTS} element={<Products />} />
              <Route path={ROUTES.NEWPRODUCT} element={<AddNewProduct />} />
              <Route path={ROUTES.EDITPRODUCT} element={<ProductDetails />} />
              <Route path={ROUTES.VISIT} element={<VisitHistoryPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

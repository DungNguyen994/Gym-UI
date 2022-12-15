import { useQuery } from "@apollo/client";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Grid, IconButton, Stack } from "@mui/material";
import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { GET_INVENTORY } from "../../graphql/queries/inventory";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import ShoppingCartDrawer from "./ShoppingCart";
import produce from "immer";

export default function POS() {
  const { data, loading } = useQuery(GET_INVENTORY);
  const products = data?.inventory?.data as Product[];
  const [openShoppingCart, setOpenShoppingCart] = useState(false);
  const closeShoppingCart = () => setOpenShoppingCart(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>();
  const totalQuantity =
    selectedProducts?.reduce((total, product) => {
      if (!product.buyQuantity) return total;
      return total + product.buyQuantity;
    }, 0) || 0;
  const onAddToCart = (product: Product) => {
    const nextState = produce(selectedProducts, (draftState) => {
      if (!draftState) {
        return [{ ...product, buyQuantity: 1 }];
      } else if (draftState && draftState.length > 0) {
        const foundProduct = draftState.find(
          (p) => p.productId === product.productId
        );
        if (foundProduct && foundProduct.buyQuantity) {
          foundProduct.buyQuantity++;
          return draftState;
        } else return [...draftState, { ...product, buyQuantity: 1 }];
      }
      return [...draftState, { ...product, buyQuantity: 1 }];
    });
    setSelectedProducts(nextState);
  };
  return (
    <Box sx={{ padding: "15px 2% 10px" }}>
      {loading && <LoadingSpinner />}
      <ShoppingCartDrawer
        open={openShoppingCart}
        onClose={closeShoppingCart}
        selectedProducts={selectedProducts}
      />
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <SearchBar
            placeholder="Search product..."
            style={{ width: "50%", marginLeft: "16px" }}
            onChange={() => {}}
            onCancelSearch={() => {}}
          />
          <IconButton
            size="large"
            color="info"
            onClick={() => setOpenShoppingCart(true)}
          >
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCart fontSize="large" />
            </Badge>
          </IconButton>
        </Stack>
        <Grid container spacing={2}>
          {products?.map((product) => (
            <ProductCard product={product} addToCart={onAddToCart} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

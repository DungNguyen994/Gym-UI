import { useQuery } from "@apollo/client";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Grid, IconButton, Stack } from "@mui/material";
import produce from "immer";
import { useCallback, useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import SearchBar from "../../Generic Components/SearchBar";
import { GET_INVENTORY } from "../../graphql/queries/inventory";
import { Product } from "../../types";
import { searchData } from "../../utils";
import ProductCard from "./ProductCard";
import ShoppingCartDrawer from "./ShoppingCart";
import DialogModal from "../../Generic Components/Dialog";

export default function POS() {
  const { data, loading } = useQuery(GET_INVENTORY);
  const products = useMemo(
    () =>
      data?.inventory?.data?.filter(
        (i: Product) => i.quantity && i.quantity > 0
      ) as Product[],
    [data]
  );
  const [searchedProducts, setSearchedProducts] = useState(products);
  const [openShoppingCart, setOpenShoppingCart] = useState(false);
  const [outOfStockWarning, setOutOfStockWarning] = useState(false);
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
        if (foundProduct && foundProduct.buyQuantity && foundProduct.quantity) {
          if (foundProduct.quantity > foundProduct.buyQuantity)
            foundProduct.buyQuantity++;
          else setOutOfStockWarning(true);
          return draftState;
        } else return [...draftState, { ...product, buyQuantity: 1 }];
      }
      return [...draftState, { ...product, buyQuantity: 1 }];
    });
    setSelectedProducts(nextState);
  };
  const removeOneItem = (productId: string) => {
    const nextState = produce(selectedProducts, (draftState) => {
      if (draftState && draftState.length > 0) {
        const foundProduct = draftState.find((p) => p.productId === productId);
        if (foundProduct) {
          if (foundProduct.buyQuantity && foundProduct.buyQuantity > 1)
            foundProduct.buyQuantity--;
          else return draftState.filter((p) => p.productId !== productId);
        }
      }
      return draftState;
    });
    setSelectedProducts(nextState);
  };
  const removeProduct = (productId: string) => {
    setSelectedProducts((pre) => pre?.filter((p) => p.productId !== productId));
  };
  const clearCart = () => setSelectedProducts([]);

  useEffect(() => {
    setSearchedProducts(products);
  }, [products]);
  const onSearch = useCallback(
    (value: string) => {
      const searchedData = searchData(products, value, ["photo", "id"]);
      setSearchedProducts(searchedData);
    },
    [products]
  );

  return (
    <Box sx={{ padding: "15px 2% 10px" }}>
      {loading && <LoadingSpinner />}
      <ShoppingCartDrawer
        open={openShoppingCart}
        onClose={closeShoppingCart}
        selectedProducts={selectedProducts}
        removeProduct={removeProduct}
        removeOneItem={removeOneItem}
        addOneItem={onAddToCart}
        clearCart={clearCart}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <SearchBar placeholder="Search Product" onSearch={onSearch} />
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
      <Grid container spacing={{ xs: 0, md: 1 }}>
        {searchedProducts?.map((product) => (
          <ProductCard product={product} addToCart={onAddToCart} />
        ))}
      </Grid>
      <DialogModal
        title="Info!"
        open={outOfStockWarning}
        handleClose={() => setOutOfStockWarning(false)}
        content="You have selected all stocks available for the item!"
        noLabel="Close"
        disableYes
      />
    </Box>
  );
}

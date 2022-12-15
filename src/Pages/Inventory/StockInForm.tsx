import { useQuery } from "@apollo/client";
import { Grid, Autocomplete, TextField } from "@mui/material";
import TextInput from "../../Generic Components/Form/TextInput";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { GET_PRODUCTS } from "../../graphql/queries/products";
import { Product } from "../../types";
import { useFormContext, useWatch } from "react-hook-form";

export default function StockInForm() {
  const { data, loading } = useQuery(GET_PRODUCTS);
  const products = data?.products?.data as Product[];
  const productOptions =
    products?.map((product) => ({
      label: `${product.productName} - ${product.supplier}`,
      value: product.id,
    })) || [];
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const product = useWatch({ name: "product" });
  const errorMessage = errors.product?.message as string | undefined;
  return (
    <Grid container direction="row" spacing={2}>
      {loading && <LoadingSpinner />}
      <Grid item xs={12}>
        <Autocomplete
          value={product || []}
          disablePortal
          onChange={(e, newValue) => setValue("product", newValue)}
          id="combo-box"
          options={productOptions}
          fullWidth
          getOptionLabel={(option) => option.label || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product"
              error={Boolean(errors.product) && !product}
              variant="standard"
              helperText={!product && errorMessage}
            />
          )}
        />
      </Grid>
      <TextInput
        label="Quantity"
        fieldName="quantity"
        md={12}
        lg={12}
        type="number"
      />
    </Grid>
  );
}

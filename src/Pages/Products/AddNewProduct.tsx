import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Box } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { PRODUCT_TYPES } from "../../constants";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { ADD_PRODUCT } from "../../graphql/mutations/addProduct";
import { GET_PRODUCTS } from "../../graphql/queries/products";
import { Product } from "../../types";
import { uploadPhoto } from "../../utils";
import Information from "./Information";
import LeftPanel from "./LeftPanel";
import { validationSchema } from "./validationSchema";

function AddNewProduct() {
  const methods = useForm<Product>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      productType: PRODUCT_TYPES[0],
      discountPercent: 0,
    },
  });
  const { handleSubmit, reset } = methods;
  const [addProduct, { loading }] = useMutation(ADD_PRODUCT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSave = (data: Product, photoUrl: string) => {
    addProduct({
      variables: {
        ...data,
        discountPercent: Number(data.discountPercent),
        photo: photoUrl,
      },
      refetchQueries: [{ query: GET_PRODUCTS }],
    })
      .then(() => {
        reset();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  const onSubmit: SubmitHandler<Product> = (data) => {
    if (data.photo instanceof FileList && data.photo.length > 0) {
      setIsSubmitting(true);
      uploadPhoto(
        data.photo[0],
        (photoUrl: string) => {
          console.log("upload photo successfully");
          onSave(data, photoUrl);
        },
        setIsSubmitting,
        "product-images"
      );
    } else {
      onSave(data, "");
    }
  };
  return (
    <Box p={1}>
      {(loading || isSubmitting) && <LoadingSpinner />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="row">
            <Grid
              item
              xs={0}
              md={2}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <LeftPanel isAddNew={true} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack direction="column">
                <Information />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}

export default AddNewProduct;

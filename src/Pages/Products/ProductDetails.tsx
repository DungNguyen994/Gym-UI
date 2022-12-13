import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { UPDATE_PRODUCT } from "../../graphql/mutations/updateProduct";
import { GET_PRODUCT } from "../../graphql/queries/product";
import { GET_PRODUCTS } from "../../graphql/queries/products";
import { Product } from "../../types";
import { uploadPhoto } from "../../utils";
import Information from "./Information";
import LeftPanel from "./LeftPanel";
import { validationSchema } from "./validationSchema";

function ProductDetails() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: { productId: id },
  });
  const product = data?.product?.data;
  const methods = useForm<Product>({
    resolver: yupResolver(validationSchema),
    defaultValues: product,
  });
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    reset(product);
  }, [product, reset]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateProduct, { loading: updateLoading }] =
    useMutation(UPDATE_PRODUCT);
  const onSave = (data: Product, photoUrl: string) => {
    updateProduct({
      variables: {
        ...data,
        photo: photoUrl,
        discountPercent: Number(data.discountPercent),
      },
      refetchQueries: [
        { query: GET_PRODUCTS },
        { query: GET_PRODUCT, variables: { productId: id } },
      ],
    }).finally(() => {
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
      onSave(data, product.photo);
    }
  };
  return (
    <div className="new-product">
      {(loading || isSubmitting || updateLoading) && <LoadingSpinner />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="row">
            <Grid item xs={2}>
              <LeftPanel isAddNew={false} photo={product?.photo} />
            </Grid>
            <Grid item xs={7}>
              <Stack direction="column">
                <Information />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}

export default ProductDetails;

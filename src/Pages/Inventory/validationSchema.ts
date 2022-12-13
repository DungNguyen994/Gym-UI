import * as yup from "yup";

export const validationSchema = yup
  .object({
    product: yup.string().required("Enter Product"),
    quantity: yup.number().required("Enter Quantity"),
  })
  .required();

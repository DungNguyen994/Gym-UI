import * as yup from "yup";

export const validationSchema = yup
  .object({
    productName: yup.string().required("Enter Product Name"),
    productType: yup.string().required("Enter Product Type"),
    unitPrice: yup.number().required("Enter Unit Price"),
  })
  .required();

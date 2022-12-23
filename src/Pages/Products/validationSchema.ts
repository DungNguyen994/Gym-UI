import * as yup from "yup";

export const validationSchema = yup
  .object({
    productName: yup.string().required("Enter Product Name"),
    productType: yup.string().required("Enter Product Type"),
    unitPrice: yup
      .number()
      .typeError("Enter a number please")
      .required("Enter Unit Price")
      .moreThan(0, "Must be greater than 0"),
  })
  .required();

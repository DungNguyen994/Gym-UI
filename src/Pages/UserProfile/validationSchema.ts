import * as yup from "yup";

export const validationSchema = yup
  .object({
    firstName: yup.string().required("Enter First Name"),
    lastName: yup.string().required("Enter Last Name"),
  })
  .required();

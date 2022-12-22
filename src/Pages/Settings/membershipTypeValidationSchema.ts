import * as yup from "yup";

export const validationSchema = yup
  .object({
    name: yup.string().required("Enter Membership Type Name"),
    pricePerMonth: yup
      .number()
      .required("Enter Monthly Fee")
      .moreThan(0, "Must be greater than 0"),
    discountPercent: yup
      .number()
      .required("Enter Discount Percent")
      .positive("Must be positive number"),
  })
  .required();

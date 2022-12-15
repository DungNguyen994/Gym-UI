import * as yup from "yup";

export const validationSchema = yup
  .object({
    product: yup.object().required("Enter Product").typeError("Enter Product"),
    quantity: yup
      .number()
      .integer("You must specify an integer")
      .required("Enter Quantity")
      .typeError("You must specify a number")
      .test(
        "Is positive?",
        "The number must be greater than 0!",
        (value) => value !== undefined && value > 0
      ),
  })
  .required();

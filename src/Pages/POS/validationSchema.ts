import * as yup from "yup";
import { PAYMENT_METHODS } from "../../constants";

export const validationSchema = yup
  .object({
    paymentMethod: yup
      .string()
      .oneOf(PAYMENT_METHODS, "Choose a valid payment method!"),
    total: yup.number().required(),
    collected: yup
      .number()
      .typeError("Please enter a number")
      .when("paymentMethod", {
        is: PAYMENT_METHODS[0],
        then: yup
          .number()
          .typeError("Please enter a number")
          .required("Please collect Money")
          .min(yup.ref("total"), "Please collect more money!"),
      }),
  })
  .required();

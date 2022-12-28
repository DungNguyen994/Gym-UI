import * as yup from "yup";
import { PAYMENT_METHODS, VALID_PHONE_REGEX } from "../../constants";

export const validationSchema = yup
  .object({
    firstName: yup.string().required("Enter First Name"),
    lastName: yup.string().required("Enter Last Name"),
    email: yup.string().email("Email must be a valid Email"),
    phoneNumber: yup
      .string()
      .required("Enter phone number")
      .matches(VALID_PHONE_REGEX, "Phone number is not valid"),
    birthDate: yup
      .date()
      .nullable()
      .typeError("Enter a valid date")
      .max(new Date(), "Birth Date can not be a future date"),
    newMembership: yup
      .object({
        membershipType: yup.string().required("Enter Membership Type"),
        term: yup.string().required("Enter Term"),
        startDate: yup
          .date()
          .required("Enter Start Date")
          .typeError("You must specify a date"),
      })
      .notRequired()
      .default(undefined),
    payment: yup
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
      .notRequired()
      .default(undefined),
  })
  .required();

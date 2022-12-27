import * as yup from "yup";
import { VALID_PHONE_REGEX } from "../../constants";

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
    newMembership: yup.object({
      membershipType: yup.string().required("Enter Membership Type"),
      term: yup.string().required("Enter Term"),
      startDate: yup
        .date()
        .required("Enter Start Date")
        .typeError("You must specify a date"),
    }),
  })
  .required();

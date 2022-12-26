import * as yup from "yup";
import { VALID_PHONE_REGEX } from "../../constants";

export const validationSchema = yup
  .object({
    firstName: yup.string().required("Enter First Name"),
    lastName: yup.string().required("Enter Last Name"),
    phoneNumber: yup
      .string()
      .matches(VALID_PHONE_REGEX, "Phone number is not valid")
      .nullable(),
  })
  .required();

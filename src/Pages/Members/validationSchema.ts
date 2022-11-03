import dayjs from "dayjs";
import * as yup from "yup";
import { VALID_PHONE_REGEX } from "../../constants";

export const validationSchema = yup
  .object({
    firstName: yup.string().required("Enter First Name"),
    lastName: yup.string().required("Enter Last Name"),
    address: yup.string().required("Enter Last Name"),
    email: yup.string().email("Email must be a valid Email"),
    phoneNumber: yup
      .string()
      .required("Enter phone number")
      .matches(VALID_PHONE_REGEX, "Phone number is not valid"),
    birthDate: yup
      .date()
      .typeError("Enter a valid date")
      .max(new Date(), "Birth Date can not be a future date"),
    startDate: yup
      .date()
      .min(dayjs().add(-1, "day"), "Start Date must be on or after today"),
  })
  .required();

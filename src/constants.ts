import { Gender } from "./types";

export const VALID_PHONE_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const membershipTypes = ["Standard", "Premimum"];
export const periodOptions = ["1 Month", "3 Months", "6 Months", "1 Year"];
export const BASIC_PRICE = 100;
export const PAYMENT_TYPES = [
  "Cash",
  "Checks",
  "Debit Cards",
  "Credit Cards",
  "Mobile payments",
  "Electronic Bank Transfers",
];
export const SHOW_OPTIONS = ["All", "Active", "Inactive"];
export const DATE_FORMAT = "DD/MM/YYYY";
export const products = [
  "Water (sm)",
  "Water (lg)",
  "Gym gloves",
  "Whey Bulk Powder",
  "Whey Bulk Powder",
];
export const GENDER_OPTIONS = [
  {
    value: Gender.Male,
    label: Gender.Male,
  },
  {
    value: Gender.Female,
    label: Gender.Female,
  },
];

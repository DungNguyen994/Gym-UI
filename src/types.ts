import { Dayjs } from "dayjs";
import { ReactNode } from "react";

export type Member = {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  birthDate?: Dayjs | string;
  email?: string;
  address?: string;
  photo?: FileList | string;
  note?: string;
  term?: string;
  membershipType?: string;
  paymentType?: string;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
};

export interface CommonFieldProps {
  label: string;
  fieldName: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}
export enum ToolbarSelection {
  Info = "info",
  NewMembership = "newMembership",
  POS = "pos",
  Notes = "notes",
}
export enum Gender {
  Male = "Male",
  Female = "Female",
}

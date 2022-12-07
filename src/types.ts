import { Dayjs } from "dayjs";
import { ReactNode } from "react";

interface Payment {
  productName: string;
  membershipType: string;
  unitPrice: number;
  total: number;
  collected: number;
  change: number;
  term: string;
  paymentMethod: string;
}
export type Membership = {
  membershipType: string;
  term: string;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
};

export type NewMember = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: string;
  birthDate?: Dayjs | string;
  email?: string;
  address?: string;
  photo?: FileList | string;
  note?: string;
  membership: Membership;
  payment: Payment;
};

export type Member = {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  birthDate?: Dayjs | string;
  email?: string;
  address?: string;
  photo?: FileList | string;
  note?: string;
  memberships?: Membership[];
  name?: string;
  status?: string;
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

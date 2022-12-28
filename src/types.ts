import { Dayjs } from "dayjs";
import { ReactNode } from "react";

interface Payment {
  productName?: string;
  membershipType?: string;
  unitPrice?: number;
  total: number;
  collected: number;
  change: number;
  term?: string;
  paymentMethod: string;
}
interface NewMembershipPayment {
  membershipType: string;
  total: number;
  collected?: number;
  change?: number;
  term: string;
  paymentMethod: string;
  memberId?: string;
}

interface NewMembershipPaymentForm {
  membershipType: string;
  total: number;
  collected?: number;
  change?: number;
  term: string;
  paymentMethod: string;
  memberId?: string;
}

export type NewMembership = {
  membershipType: string;
  term: string;
  startDate: Dayjs | string;
  endDate: Dayjs | string;
};
export type Membership = {
  id?: string;
  membershipType: string;
  term: string;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
  isNew?: boolean;
  status?: String;
};

export type NewMember = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: string;
  birthDate?: string | Dayjs;
  email?: string;
  address?: string;
  photo?: FileList | string;
  note?: string;
  newMembership: NewMembership;
  payment: NewMembershipPayment;
};
export type NewMemberForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: string;
  birthDate?: Dayjs | string;
  email?: string;
  address?: string;
  photo?: FileList | string;
  note?: string;
  newMembership: NewMembership;
  payment: NewMembershipPaymentForm;
};

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: string;
  birthDate?: Dayjs | string;
  email?: string;
  address?: string;
  photo?: FileList | string;
  note?: string;
  newMembership?: Membership;
  payment?: NewMembershipPayment;
  memberships?: Membership[];
  currentMembershipType?: string;
  status?: string;
  remainingDays?: number;
  createdAt?: string;
};

export type UpdateMemberPayload = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: string;
  birthDate?: Dayjs | string;
  email?: string;
  address?: string;
  photo?: string | FileList;
  note?: string;
  newMembership?: Membership;
  payment?: NewMembershipPayment;
};
export type Product = {
  id?: string;
  inventoryId?: string;
  productId: string;
  productName: string;
  productType: string;
  supplier?: string;
  unitPrice: number;
  discountPercent?: number;
  photo?: FileList | string;
  quantity?: number;
  buyQuantity?: number;
};
export type PaymentRes = {
  id?: string;
  memberId?: string;
  products?: Product[];
  membershipType?: string;
  term?: string;
  supplier?: string;
  paymentMethod?: string;
  memberName?: string;
  total: number;
  change: number;
  collected: number;
  createdAt: string;
};

export type VisitHistory = {
  id?: string;
  memberId?: string;
  date: string;
  memberName: string;
};

type ProductOption = {
  label: string;
  value: string;
};
export type InventoryType = {
  id?: string;
  product: ProductOption;
  quantity: number;
};
export type MembershipType = {
  id?: string;
  name: string;
  pricePerMonth: number;
  discountPercent: number;
  isNew?: boolean;
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
  xs?: number;
  md?: number;
  lg?: number;
  type?: React.HTMLInputTypeAttribute;
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
export enum MembershipStatus {
  A = "A",
  H = "H",
  E = "E",
}

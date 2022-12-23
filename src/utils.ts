import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import RelativeTime from "dayjs/plugin/relativeTime";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config/firebase";
import { MEMBERSHIP_STATUS, periodOptions } from "./constants";
import { Member, PaymentRes } from "./types";
import { round, subtract } from "lodash";

export const getUniqueObjArray = (array: any[], key: string) => [
  ...new Map(array.map((item) => [item[key], item])).values(),
];
export const formatCurrency = (value: string | undefined) =>
  value
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(value))
    : "";
export const calculateAmount = (
  term: string | undefined,
  pricePerMonth: number,
  discountPercent: number
) => {
  if (!term) return "0.00";
  let amount;
  switch (term) {
    case periodOptions[0]:
      amount = pricePerMonth * round(subtract(1, discountPercent / 100), 2);
      break;
    case periodOptions[1]:
      amount = pricePerMonth * 3 * round(subtract(1, discountPercent / 100), 2);
      break;
    case periodOptions[2]:
      amount = pricePerMonth * 6 * round(subtract(1, discountPercent / 100), 2);
      break;
    case periodOptions[3]:
      amount =
        pricePerMonth * 12 * round(subtract(1, discountPercent / 100), 2);
      break;
    default:
  }
  return amount?.toString();
};

export const uploadPhoto = (
  file: File,
  successCallBack: any,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  folder?: string
) => {
  if (file) {
    const path = `/${folder || "images"}/${file.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        console.log(err);
        setIsSubmitting(false);
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          successCallBack(url);
        });
      }
    );
  }
};
export const getRemainingTime = (days: number) => {
  if (days <= 0) return "";
  dayjs.extend(RelativeTime);
  return dayjs().add(days, "day").fromNow();
};

export const getTimeToNow = (date: string) => {
  dayjs.extend(RelativeTime);
  return dayjs().to(dayjs(date)) + ` (At ${dayjs(date).format("HH:mm")})`;
};
export const _isToday = (date: string) => {
  dayjs.extend(isToday);
  return dayjs(date).isToday();
};

export const formatMemberTableData = (data: Member[] | undefined) => {
  if (!data) return [];
  return data.map((member) => ({
    ...member,
    name: member.firstName + " " + member.lastName,
    remainingTime: getRemainingTime(member.remainingDays),
  }));
};
export const searchData = (data: any[], value: string, blacklist: string[]) =>
  data.reduce((result, item) => {
    const listKey = Object.keys(item);
    const isValid = listKey.some(
      (key) =>
        item[key]
          ?.toString()
          .toUpperCase()
          .includes(value?.toUpperCase() ?? "") && !blacklist.includes(key)
    );
    if (isValid) result.push(item);
    return result;
  }, []);
export const getMinDate = (dates: string[] | undefined) => {
  if (dates?.length === 0) return;
  return dates?.reduce((pre, cur) =>
    Date.parse(pre) > Date.parse(cur) ? cur : pre
  );
};
export const getMaxDate = (dates: string[] | undefined) => {
  if (dates?.length === 0) return;
  return dates?.reduce((pre, cur) =>
    Date.parse(pre) < Date.parse(cur) ? cur : pre
  );
};
export const getButtonStatusColor = (value: string | undefined) => {
  if (!value) return "inherit";
  return value === MEMBERSHIP_STATUS.ACTIVE
    ? "success"
    : value === MEMBERSHIP_STATUS.EXPIRED
    ? "error"
    : "inherit";
};

const monthlyPayment = (month: number, payments: PaymentRes[]) => {
  return payments
    .filter((p) => dayjs(p.createdAt).get("month") === month)
    .reduce((total, p) => total + p.total, 0);
};
export const calculateMoneyReceived = (
  year: number,
  payments: PaymentRes[] | undefined
) => {
  if (!payments) return [];
  const paymentsOfTheYear = payments.filter(
    (p) => dayjs(p.createdAt).get("year") === year
  );
  return [...Array(12).keys()].reduce(
    (result: number[], month) => [
      ...result,
      monthlyPayment(month, paymentsOfTheYear),
    ],
    []
  );
};
const monthlyMemberNumber = (month: number, members: Member[]) => {
  return members.filter((p) => dayjs(p.createdAt).get("month") === month)
    .length;
};
export const calculateTotalNewMemberByYear = (
  year: number,
  members: Member[] | undefined
) => {
  if (!members) return [];
  const membersOfTheYear = members.filter(
    (p) => dayjs(p.createdAt).get("year") === year
  );
  return [...Array(12).keys()].reduce(
    (result: number[], month) => [
      ...result,
      monthlyMemberNumber(month, membersOfTheYear),
    ],
    []
  );
};

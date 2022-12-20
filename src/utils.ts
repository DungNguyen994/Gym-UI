import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config/firebase";
import {
  BASIC_PRICE,
  MEMBERSHIP_STATUS,
  membershipTypes,
  periodOptions,
} from "./constants";
import { Member } from "./types";

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
  membershipType: string | undefined
) => {
  if (!term || !membershipType) return {};
  let amount;
  let basisPrice = BASIC_PRICE;
  let discountPercent = 0;
  switch (term) {
    case periodOptions[0]:
      if (membershipType === membershipTypes[0]) amount = basisPrice;
      else amount = 2 * basisPrice;
      break;
    case periodOptions[1]:
      basisPrice = BASIC_PRICE * 3 * 0.9;
      discountPercent = 10;
      if (membershipType === membershipTypes[0]) amount = basisPrice;
      else amount = basisPrice * 2;
      break;
    case periodOptions[2]:
      discountPercent = 20;
      basisPrice = BASIC_PRICE * 6 * 0.8;
      if (membershipType === membershipTypes[0]) amount = basisPrice;
      else amount = basisPrice * 2;
      break;
    case periodOptions[3]:
      discountPercent = 30;
      basisPrice = BASIC_PRICE * 12 * 0.7;
      if (membershipType === membershipTypes[0]) amount = basisPrice;
      else amount = basisPrice * 2;
      break;
    default:
  }
  return { amount: amount?.toString(), discountPercent };
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

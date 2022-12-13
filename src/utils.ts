import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config/firebase";
import {
  BASIC_PRICE,
  membershipTypes,
  MEMBERSHIP_STATUS,
  periodOptions,
} from "./constants";
import { Member, Membership } from "./types";

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
const getMemberStatus = (memberships: Membership[]) => {
  if (
    memberships.some(
      (membership) => membership.status === MEMBERSHIP_STATUS.ACTIVE
    )
  ) {
    return "Active";
  } else if (
    memberships.every(
      (membership) => membership.status === MEMBERSHIP_STATUS.EXPIRED
    )
  ) {
    return "Expired";
  } else {
    return "On Hold";
  }
};
export const formatMemberTableData = (data: Member[] | undefined) => {
  if (!data) return [];
  dayjs.extend(RelativeTime);
  return data.map((member) => ({
    ...member,
    name: member.firstName + " " + member.lastName,
    membershipType:
      (member.memberships &&
        member.memberships.find(
          (membership) => membership.status === MEMBERSHIP_STATUS.ACTIVE
        )?.membershipType) ||
      "",
    remainingTime:
      member.memberships &&
      dayjs(
        getMaxDate(member.memberships.map((m) => m.endDate as string))
      ).fromNow(),
    status: member.memberships && getMemberStatus(member.memberships),
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

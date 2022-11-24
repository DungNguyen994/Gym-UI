import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config/firebase";
import { BASIC_PRICE, membershipTypes, periodOptions } from "./constants";

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

export const uploadPhoto = (file: File, successCallBack: any) => {
  if (file) {
    const path = `/images/${file.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          successCallBack(url);
        });
      }
    );
  }
};

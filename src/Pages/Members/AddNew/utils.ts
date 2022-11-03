import dayjs from "dayjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import produce from "immer";
import { storage } from "../../../config/firebase";
import {
  BASIC_PRICE,
  DATE_FORMAT,
  membershipTypes,
  periodOptions,
} from "../../../constants";
import { Member } from "../../../types";

export const calculateAmount = (term: string, membershipType: string) => {
  let amount;
  let basisPrice = BASIC_PRICE;
  let discountPercent;
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

export const mapMemberPayload = (data: Member, photoUrl?: string) => {
  const newData = produce(data, (draftState) => {
    if (draftState.birthDate instanceof Date) {
      draftState.birthDate = dayjs(draftState.birthDate).format(DATE_FORMAT);
    }
    draftState.photo = photoUrl;
  });
  return newData;
};

export const upLoadMemberPhoto = (
  fileList: FileList,
  onComplete: (photo: string) => void
) => {
  if (
    fileList &&
    fileList.length &&
    fileList.length > 0 &&
    fileList instanceof FileList
  ) {
    const file = fileList[0];
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
          onComplete(url);
        });
      }
    );
  }
};

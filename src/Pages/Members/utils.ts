import { isDayjs } from "dayjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { omitBy } from "lodash";
import { storage } from "../../config/firebase";
import { DATE_FORMAT } from "../../constants";
import {
  Member,
  NewMemberForm,
  NewMemberPayload,
  UpdateMemberPayload,
} from "../../types";

export const createNewMemberPayload = (
  data: NewMemberForm,
  photoUrl?: string
) => {
  return {
    birthDate: data.birthDate?.format(DATE_FORMAT),
    firstName: data.firstName,
    lastName: data.lastName,
    photo: photoUrl,
    newMembership: data.newMembership,
    payment: {
      membershipType: data.newMembership.membershipType,
      term: data.newMembership.term,
      collected: Number(data.payment.collected),
      change: Number(data.payment.change),
      total: Number(data.payment.total),
      paymentMethod: data.payment.paymentMethod,
    },
    address: data.address,
    note: data.note,
    phoneNumber: data.phoneNumber,
    email: data.email,
    gender: data.gender,
  } as NewMemberPayload;
};
export const createUpdateMemberPayload = (data: Member, photoUrl?: string) => {
  return omitBy(
    {
      birthDate: isDayjs(data.birthDate)
        ? data.birthDate?.format(DATE_FORMAT)
        : data.birthDate,
      firstName: data.firstName,
      lastName: data.lastName,
      photo: photoUrl,
      newMembership: data.newMembership
        ? {
            startDate: isDayjs(data.newMembership.startDate)
              ? data.newMembership.startDate.format(DATE_FORMAT)
              : data.newMembership.startDate,
            endDate: isDayjs(data.newMembership.endDate)
              ? data.newMembership.endDate.format(DATE_FORMAT)
              : data.newMembership.endDate,
            membershipType: data.newMembership.membershipType,
            term: data.newMembership.term,
            status: data.newMembership.status,
          }
        : undefined,
      payment:
        data.newMembership && data.payment
          ? {
              membershipType: data.newMembership.membershipType,
              term: data.newMembership.term,
              collected: Number(data.payment.collected),
              change: Number(data.payment.change),
              total: Number(data.payment.total),
              paymentMethod: data.payment.paymentMethod,
            }
          : undefined,
      address: data.address,
      note: data.note,
      phoneNumber: data.phoneNumber,
      email: data.email,
      gender: data.gender,
      id: data.id,
    },
    (v) => v === undefined
  ) as UpdateMemberPayload;
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

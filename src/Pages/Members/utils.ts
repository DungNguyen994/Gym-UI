import { isDayjs } from "dayjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import produce from "immer";
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
  const newData: UpdateMemberPayload = produce(data, (draftState) => {
    if (isDayjs(data.birthDate)) {
      draftState.birthDate = data.birthDate.format(DATE_FORMAT);
    }
    draftState.photo = photoUrl;
    if (data.payment && data.newMembership) {
      draftState.payment = data.payment;
      draftState.payment.membershipType = data.newMembership.membershipType;
      draftState.payment.term = data.newMembership.term;
      draftState.payment.collected = Number(draftState.payment.collected);
    }
    if (draftState.newMembership) {
      delete draftState.newMembership.isNew;
      delete draftState.newMembership.id;
    }
    delete draftState.remainingDays;
    delete draftState.status;
    delete draftState.createdAt;
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

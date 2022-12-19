import dayjs from "dayjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import produce from "immer";
import { storage } from "../../config/firebase";
import { DATE_FORMAT } from "../../constants";
import { Member } from "../../types";

export const mapMemberPayload = (data: Member, photoUrl?: string) => {
  const newData = produce(data, (draftState) => {
    if (draftState.birthDate instanceof Date) {
      draftState.birthDate = dayjs(draftState.birthDate).format(DATE_FORMAT);
    }
    draftState.photo = photoUrl;
    if (draftState.payment && draftState.newMembership) {
      draftState.payment.membershipType =
        draftState.newMembership.membershipType;
      draftState.payment.term = draftState.newMembership.term;
      draftState.payment.collected = Number(draftState.payment.collected);
    }
  });
  return newData;
};
export const mapUpdateMemberPayload = (data: Member, photoUrl?: string) => {
  const newData = produce(data, (draftState) => {
    if (draftState.birthDate instanceof Date) {
      draftState.birthDate = dayjs(draftState.birthDate).format(DATE_FORMAT);
    }
    draftState.photo = photoUrl;
    if (draftState.payment && draftState.newMembership) {
      draftState.payment.membershipType =
        draftState.newMembership.membershipType;
      draftState.payment.term = draftState.newMembership.term;
      draftState.payment.collected = Number(draftState.payment.collected);
    }
    if (draftState.newMembership) {
      delete draftState.newMembership.isNew;
      delete draftState.newMembership.id;
    }
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

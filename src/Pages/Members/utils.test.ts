import dayjs from "dayjs";
import { DATE_FORMAT } from "../../constants";
import { Member, NewMemberForm } from "../../types";
import { createNewMemberPayload, createUpdateMemberPayload } from "./utils";

describe("Test all the logic to util functions", () => {
  test("if createNewMemberPayload works", () => {
    const testData: NewMemberForm = {
      newMembership: {
        startDate: "2022-12-27T11:31:23.000Z",
        term: "1 Month",
        membershipType: "Standard",
        endDate: "2023-01-27T11:31:23.440Z",
      },
      phoneNumber: "1313131",
      lastName: "Nguyen",
      firstName: "Dung",
      gender: "Male",
      birthDate: dayjs(),
      payment: {
        paymentMethod: "Cash",
        change: 0,
        total: 100,
        collected: 100,
        membershipType: "",
        term: "",
      },
    };
    const returnValue = createNewMemberPayload(testData, "");
    const expectedValue = {
      newMembership: {
        startDate: "2022-12-27T11:31:23.000Z",
        term: "1 Month",
        membershipType: "Standard",
        endDate: "2023-01-27T11:31:23.440Z",
      },
      phoneNumber: "1313131",
      lastName: "Nguyen",
      firstName: "Dung",
      gender: "Male",
      photo: "",
      birthDate: dayjs().format(DATE_FORMAT),
      payment: {
        paymentMethod: "Cash",
        change: 0,
        membershipType: "Standard",
        term: "1 Month",
        total: 100,
        collected: 100,
      },
    };
    expect(returnValue).toEqual(expectedValue);
  });

  test("if createUpdateMemberPayload works", () => {
    const testData: Member = {
      id: "a",
      newMembership: {
        startDate: "2022-12-27T11:31:23.000Z",
        term: "1 Month",
        membershipType: "Standard",
        endDate: "2023-01-27T11:31:23.440Z",
      },
      phoneNumber: "1313131",
      lastName: "Nguyen",
      firstName: "Dung",
      gender: "Male",
      birthDate: dayjs(),
      status: "A",
      remainingDays: 30,
      createdAt: "2023-01-27T11:31:23.440Z",
      payment: {
        paymentMethod: "Cash",
        change: 0,
        total: 100,
        collected: 100,
        membershipType: "",
        term: "",
      },
    };
    const returnValue = createUpdateMemberPayload(testData, "");
    const expectedValue = {
      id: "a",
      newMembership: {
        startDate: "2022-12-27T11:31:23.000Z",
        term: "1 Month",
        membershipType: "Standard",
        endDate: "2023-01-27T11:31:23.440Z",
      },
      phoneNumber: "1313131",
      lastName: "Nguyen",
      firstName: "Dung",
      gender: "Male",
      photo: "",
      birthDate: dayjs().format(DATE_FORMAT),
      payment: {
        paymentMethod: "Cash",
        change: 0,
        membershipType: "Standard",
        term: "1 Month",
        total: 100,
        collected: 100,
      },
    };
    expect(returnValue).toEqual(expectedValue);
  });
});

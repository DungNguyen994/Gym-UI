import { ApolloProvider } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MemberDetails from ".";
import { client } from "../../../config/publicClient";
import { GET_MEMBER } from "../../../graphql/queries/member";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "1",
  }),
}));
const mocks = [
  {
    request: {
      query: GET_MEMBER,
      variables: {
        memberId: "1",
      },
    },
    result: {
      data: {
        member: {
          data: {
            address: "Argentina",
            birthDate: "December 01, 2022",
            email: "messi@gmail.com",
            firstName: "Lionel",
            gender: "Male",
            id: "1",
            lastName: "Messi",
            memberships: [
              {
                endDate: "2023-01-22T04:21:20.632Z",
                membershipType: "Standard",
                startDate: "2022-12-22T04:21:20.632Z",
                term: "1 Month",
                status: "A",
                id: "63a3db5a6003daea522fe682",
              },
              {
                endDate: "2023-02-22T04:21:20.632Z",
                membershipType: "Standard",
                startDate: "2023-01-22T04:21:20.632Z",
                term: "1 Month",
                status: "H",
                id: "63a4017164153f266a9ba774",
              },
              {
                endDate: "2023-03-22T04:21:20.632Z",
                membershipType: "Standard",
                startDate: "2023-02-22T04:21:20.632Z",
                term: "1 Month",
                status: "H",
                id: "63a45531c391c33d6f54d001",
              },
            ],
            status: "A",
            currentMembershipType: "Standard",
            remainingDays: 82,
            note: "Hi from Argentina",
            phoneNumber: "1234215421",
            photo:
              "https://firebasestorage.googleapis.com/v0/b/gym-management-7a3e5.appspot.com/o/images%2Fmessi.jpg?alt=media&token=72f49d15-d6ad-469e-9e95-0612b5c64ecf",
          },
          errors: null,
        },
      },
    },
  },
];

describe("Test UI elements", () => {
  test("Fields are rendered", async () => {
    render(
      <BrowserRouter>
        <ApolloProvider client={client}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <MemberDetails />
          </MockedProvider>
        </ApolloProvider>
      </BrowserRouter>
    );
    expect(await screen.findByText("Lionel Messi")).toBeInTheDocument();
    expect(screen.getByText(/change photo/i)).toBeInTheDocument();
    expect(screen.getByText(/membership type/i)).toBeInTheDocument();
    expect(screen.getAllByText(/active/i)).toHaveLength(2);
    expect(screen.getByText(/expired in 3 months/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();
    expect(screen.getAllByText(/check in/i)).toHaveLength(2);
    expect(screen.getByText(/purchase/i)).toBeInTheDocument();
    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByText(/add membership/i)).toBeInTheDocument();
  });
});

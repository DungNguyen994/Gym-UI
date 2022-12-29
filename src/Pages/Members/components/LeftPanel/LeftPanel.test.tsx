import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { client } from "../../../../config/publicClient";
import LeftPanel from "./LeftPanel";
import { Member } from "../../../../types";

describe("Add New Member Left Panel renders content correctly", () => {
  test("there is a blank image", () => {
    render(
      <Router>
        <ApolloProvider client={client}>
          <LeftPanel isAddNew />
        </ApolloProvider>
      </Router>
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/profile-icon.png");
  });

  test("there is a Choose Photo button", () => {
    render(
      <Router>
        <ApolloProvider client={client}>
          <LeftPanel isAddNew />
        </ApolloProvider>
      </Router>
    );
    const btn = screen.getByLabelText(/choose photo/i);
    expect(btn).toBeTruthy();
  });
});

describe("Update Member Left Panel renders content correctly", () => {
  const member: Member = {
    id: "1",
    photo: "my-photo.png",
    firstName: "Dung",
    lastName: "Nguyen",
    phoneNumber: "1002901209",
    status: "A",
    remainingDays: 30,
  };
  test("there is a member image", () => {
    render(
      <Router>
        <ApolloProvider client={client}>
          <LeftPanel member={member} />
        </ApolloProvider>
      </Router>
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", member.photo);
  });

  test("there is a Change Photo button", () => {
    render(
      <Router>
        <ApolloProvider client={client}>
          <LeftPanel member={member} />
        </ApolloProvider>
      </Router>
    );
    const btn = screen.getByLabelText(/change photo/i);
    expect(btn).toBeTruthy();
  });

  test("membership status", () => {
    render(
      <Router>
        <ApolloProvider client={client}>
          <LeftPanel member={member} />
        </ApolloProvider>
      </Router>
    );
    expect(screen.getByText(/membership status/i)).toBeTruthy();
    expect(screen.getByText(/active/i)).toBeTruthy();
    expect(screen.getByText(/expired in a month/i)).toBeTruthy();
  });

  test("there are action buttons", () => {
    render(
      <Router>
        <ApolloProvider client={client}>
          <LeftPanel member={member} />
        </ApolloProvider>
      </Router>
    );
    expect(screen.getByText(/actions/i)).toBeTruthy();
    expect(screen.getByText(/check in/i)).toBeTruthy();
    expect(screen.getByText(/purchase/i)).toBeTruthy();
  });
});

import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { client } from "../../../../config/publicClient";
import LeftPanel from "./LeftPanel";

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
});

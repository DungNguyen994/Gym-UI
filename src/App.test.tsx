import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("Test routing logic of the application", () => {
  test("Navigate to not found page when user enter invalid route", () => {
    const badRoute = "/some/bad/route";

    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    // verify navigation to "no match" route
    expect(screen.getByText(/Look like you're lost/i)).toBeInTheDocument();
  });
});

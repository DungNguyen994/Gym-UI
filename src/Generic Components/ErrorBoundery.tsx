import { Container } from "@mui/material";
import React from "react";
import BackToHome from "./BackToHome";

interface Props {
  children: JSX.Element;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false } as State;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <h1>Something went wrong!</h1>
          <BackToHome />
        </Container>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

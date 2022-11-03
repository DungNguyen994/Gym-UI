import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URI,
  credentials: "include",
});
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

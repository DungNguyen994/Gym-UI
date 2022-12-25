import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  useLazyQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuthUser, setUser } from "../Redux-toolkit/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../Redux-toolkit/hooks";
import { onError } from "@apollo/client/link/error";
import { client } from "../config/publicClient";
import { REFRESH_TOKEN } from "../graphql/queries/refreshToken";
import jwtDecode from "jwt-decode";
import { TokenPayload } from "../Authentication/Login";

export const usePrivateClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URI,
    credentials: "include",
  });
  const user = useAppSelector(getAuthUser);
  const token = user?.accessToken;
  const [refresh] = useLazyQuery(REFRESH_TOKEN, {
    client,
    fetchPolicy: "network-only",
  });
  const authLink = setContext(async (_, { headers }) => {
    if (token)
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
  });

  const refreshLink = setContext(async (_, { headers, hasError }) => {
    if (hasError) {
      const { data } = await refresh();
      const accessToken = data?.refreshToken?.data;
      if (accessToken) {
        const { user } = jwtDecode(accessToken) as TokenPayload;
        const { username, role, firstName, lastName } = user;
        dispatch(setUser({ username, role, accessToken, firstName, lastName }));
        return {
          hasError: false,
          headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      } else {
        dispatch(setUser(undefined));
        return {
          hasError: false,
          headers,
        };
      }
    }
    return {
      headers,
    };
  });
  const dispatch = useAppDispatch();
  const errorLink = onError(
    ({ forward, operation, networkError, graphQLErrors }) => {
      if (networkError && !graphQLErrors) {
        operation.setContext({
          hasError: true,
        });
      }
      return forward(operation);
    }
  );

  const _client = new ApolloClient({
    link: authLink.concat(errorLink).concat(refreshLink).concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
  return _client;
};

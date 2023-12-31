import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
const TOKEN = "token";
const DARK_MODE = "DARK_MODE ";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDearkMode = () => {
  localStorage.removeItem(DARK_MODE, "enabled");
  darkModeVar(false);
};
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context) => ({
    headers: {
      ...context.headers,
      token: localStorage.getItem(TOKEN),
    },
  }));
  return forward(operation);
});
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
  connectToDevTools: true,
});

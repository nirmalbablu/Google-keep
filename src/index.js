import ReactDom from "react-dom";
import Mainpage from "./pages/Mainpage/mainpage";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
const httpLink = new RestLink({
  uri: "/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDom.render(
  <ApolloProvider client={client}>
    <Mainpage />
  </ApolloProvider>,
  document.getElementById("root")
);

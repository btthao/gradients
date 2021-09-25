import { withApollo } from "next-apollo";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { NextPageContext } from "next";
import { GetGradientsReturn } from "../generated/graphql";

export const apolloClient = (
  ctx: NextPageContext
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getGradients: {
              keyArgs: [],
              merge(
                existing: GetGradientsReturn[],
                incoming: GetGradientsReturn
              ): GetGradientsReturn[] {
                return [...(existing || []), incoming];
              },
            },
          },
        },
      },
    }),
  });

export default withApollo(apolloClient);

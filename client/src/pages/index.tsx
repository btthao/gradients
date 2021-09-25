import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import Background from "../components/Background";
import Filter from "../components/Filter";
import GradientBox from "../components/GradientBox";
import Loading from "../components/Loading";
import NavigateBtn from "../components/NavigateBtn";
import {
  GetGradientsDocument,
  Gradient,
  useGetGradientsQuery,
} from "../generated/graphql";
import { useAppContext } from "../utils/context";
import withApollo from "../utils/withApollo";

const Home: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { limit, page, tags } = state.pageQuery;
  const { loading, error, data, fetchMore } = useGetGradientsQuery({
    variables: {
      getGradientsInput: {
        cursor: null,
        limit,
        tags,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const apolloClient = useApolloClient();
  const loadingBox = new Array(limit).fill("Loading...");

  useEffect(() => {
    if (!state.initialLoad.database && !loading) {
      dispatch({
        type: "SET_LOAD_STATUS",
        payload: {
          database: true,
        },
      });
    }
  }, [loading, dispatch, state.initialLoad.database]);

  return (
    <>
      <Background />

      {(!state.initialLoad.colorPicker || !state.initialLoad.database) && (
        <Loading />
      )}

      {!error && <Filter />}

      <div className=" text-center font-bold text-xl text-blue-600 mx-6 xs:mx-16">
        {error
          ? "Oops! Can't connect to database. Please try again later."
          : data?.getGradients[0]?.results.length == 0
          ? "No results :/ Add new entries to database!"
          : ""}
      </div>

      <div className=" w-full  m-auto mb-16 max-w-6xl grid place-items-center gap-8 sm:grid-cols-2 sm:px-4 lg:grid-cols-3  ">
        {loading &&
          loadingBox.map((name: string, idx: number) => (
            <GradientBox
              isLoading={loading}
              name={name}
              _id={idx.toString()}
              colors={["#cbcbcb", "#e8e8e8"]}
              stops={["0%", "74%"]}
              direction="120deg"
              key={idx}
              idx={idx}
            />
          ))}
        {!loading &&
          data?.getGradients[page]?.results.map(
            (gradient: Gradient, idx: number) => (
              <GradientBox
                isLoading={loading}
                key={gradient._id}
                idx={page * limit + (idx + 1)}
                {...gradient}
              />
            )
          )}
      </div>

      {data?.getGradients[0]?.results.length > 0 && (
        <div className="m-auto  max-w-xs mb-40 flex items-center justify-evenly ">
          <NavigateBtn
            navigateto="prev"
            disabled={page == 0}
            onClick={() => {
              dispatch({
                type: "SET_PAGE",
                payload: {
                  page: page - 1,
                },
              });
            }}
          />
          <p>Page {page + 1} </p>
          <NavigateBtn
            navigateto="next"
            disabled={!data?.getGradients[page]?.next}
            onClick={() => {
              const existed = apolloClient.readQuery({
                query: GetGradientsDocument,
              });

              if (page == existed.getGradients.length - 1) {
                fetchMore({
                  variables: {
                    getGradientsInput: {
                      cursor: data.getGradients[page].next,
                      limit,
                      tags,
                    },
                  },
                });
              }

              dispatch({
                type: "SET_PAGE",
                payload: {
                  page: page + 1,
                },
              });
            }}
          />
        </div>
      )}
    </>
  );
};

export default withApollo({ ssr: true })(Home);

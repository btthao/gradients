import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateGradientResponse = {
  __typename?: 'CreateGradientResponse';
  completed?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type GetGradientsInput = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetGradientsReturn = {
  __typename?: 'GetGradientsReturn';
  next?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Gradient>>;
};

export type Gradient = {
  __typename?: 'Gradient';
  _id: Scalars['ID'];
  colors?: Maybe<Array<Scalars['String']>>;
  direction: Scalars['String'];
  name: Scalars['String'];
  stops?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type GradientInput = {
  colors?: Maybe<Array<Scalars['String']>>;
  direction: Scalars['String'];
  name: Scalars['String'];
  stops?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGradient?: Maybe<CreateGradientResponse>;
};


export type MutationCreateGradientArgs = {
  input?: Maybe<GradientInput>;
};

export type Query = {
  __typename?: 'Query';
  getGradients?: Maybe<GetGradientsReturn>;
};


export type QueryGetGradientsArgs = {
  input?: Maybe<GetGradientsInput>;
};

export type CreateGradientMutationVariables = Exact<{
  createGradientInput?: Maybe<GradientInput>;
}>;


export type CreateGradientMutation = { __typename?: 'Mutation', createGradient?: Maybe<{ __typename?: 'CreateGradientResponse', completed?: Maybe<boolean>, error?: Maybe<string> }> };

export type GetGradientsQueryVariables = Exact<{
  getGradientsInput?: Maybe<GetGradientsInput>;
}>;


export type GetGradientsQuery = { __typename?: 'Query', getGradients?: Maybe<{ __typename?: 'GetGradientsReturn', next?: Maybe<string>, results?: Maybe<Array<{ __typename?: 'Gradient', _id: string, name: string, colors?: Maybe<Array<string>>, direction: string, stops?: Maybe<Array<string>>, tags?: Maybe<Array<string>> }>> }> };


export const CreateGradientDocument = gql`
    mutation CreateGradient($createGradientInput: GradientInput) {
  createGradient(input: $createGradientInput) {
    completed
    error
  }
}
    `;
export type CreateGradientMutationFn = Apollo.MutationFunction<CreateGradientMutation, CreateGradientMutationVariables>;

/**
 * __useCreateGradientMutation__
 *
 * To run a mutation, you first call `useCreateGradientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGradientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGradientMutation, { data, loading, error }] = useCreateGradientMutation({
 *   variables: {
 *      createGradientInput: // value for 'createGradientInput'
 *   },
 * });
 */
export function useCreateGradientMutation(baseOptions?: Apollo.MutationHookOptions<CreateGradientMutation, CreateGradientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGradientMutation, CreateGradientMutationVariables>(CreateGradientDocument, options);
      }
export type CreateGradientMutationHookResult = ReturnType<typeof useCreateGradientMutation>;
export type CreateGradientMutationResult = Apollo.MutationResult<CreateGradientMutation>;
export type CreateGradientMutationOptions = Apollo.BaseMutationOptions<CreateGradientMutation, CreateGradientMutationVariables>;
export const GetGradientsDocument = gql`
    query GetGradients($getGradientsInput: GetGradientsInput) {
  getGradients(input: $getGradientsInput) {
    results {
      _id
      name
      colors
      direction
      stops
      tags
    }
    next
  }
}
    `;

/**
 * __useGetGradientsQuery__
 *
 * To run a query within a React component, call `useGetGradientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGradientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGradientsQuery({
 *   variables: {
 *      getGradientsInput: // value for 'getGradientsInput'
 *   },
 * });
 */
export function useGetGradientsQuery(baseOptions?: Apollo.QueryHookOptions<GetGradientsQuery, GetGradientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGradientsQuery, GetGradientsQueryVariables>(GetGradientsDocument, options);
      }
export function useGetGradientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGradientsQuery, GetGradientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGradientsQuery, GetGradientsQueryVariables>(GetGradientsDocument, options);
        }
export type GetGradientsQueryHookResult = ReturnType<typeof useGetGradientsQuery>;
export type GetGradientsLazyQueryHookResult = ReturnType<typeof useGetGradientsLazyQuery>;
export type GetGradientsQueryResult = Apollo.QueryResult<GetGradientsQuery, GetGradientsQueryVariables>;
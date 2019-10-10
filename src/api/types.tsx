/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};

export type AddDishToLunchInput = {
  lunchId: Scalars['ID'],
  dishId: Scalars['ID'],
  quantity?: Maybe<Scalars['Int']>,
};

export type CreateDishInput = {
  name: Scalars['String'],
  price: Scalars['String'],
  vendorId: Scalars['String'],
};

export type CreateLunchInput = {
  occasion: Scalars['String'],
  vendorId: Scalars['ID'],
  userId: Scalars['ID'],
  date?: Maybe<Scalars['Date']>,
  description?: Maybe<Scalars['String']>,
};

export type CreateVendorInput = {
  name: Scalars['String'],
  description: Scalars['String'],
  address: Scalars['String'],
};


export type Dish = {
  __typename?: 'Dish',
  id: Scalars['ID'],
  name: Scalars['String'],
  price?: Maybe<Scalars['String']>,
  vendorId: Scalars['ID'],
};

/** The connection type for Dish. */
export type DishConnection = {
  __typename?: 'DishConnection',
  /** A list of edges. */
  edges: Array<DishEdge>,
  /** A list of nodes. */
  nodes: Array<Dish>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  totalCount: Scalars['Int'],
};

/** An edge in a connection. */
export type DishEdge = {
  __typename?: 'DishEdge',
  /** A cursor for use in pagination. */
  cursor: Scalars['String'],
  /** The item at the end of the edge. */
  node: Dish,
};

export type Lunch = {
  __typename?: 'Lunch',
  date?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  lunchDishes: LunchDishConnection,
  occasion?: Maybe<Scalars['String']>,
  user: User,
  vendor: Vendor,
};


export type LunchLunchDishesArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

/** The connection type for Lunch. */
export type LunchConnection = {
  __typename?: 'LunchConnection',
  /** A list of edges. */
  edges: Array<LunchEdge>,
  /** A list of nodes. */
  nodes: Array<Lunch>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  totalCount: Scalars['Int'],
};

export type LunchDish = {
  __typename?: 'LunchDish',
  dish: Dish,
  dishId: Scalars['ID'],
  lunchId: Scalars['ID'],
  quantity?: Maybe<Scalars['Int']>,
};

/** The connection type for LunchDish. */
export type LunchDishConnection = {
  __typename?: 'LunchDishConnection',
  /** A list of edges. */
  edges: Array<LunchDishEdge>,
  /** A list of nodes. */
  nodes: Array<LunchDish>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  totalCount: Scalars['Int'],
};

/** An edge in a connection. */
export type LunchDishEdge = {
  __typename?: 'LunchDishEdge',
  /** A cursor for use in pagination. */
  cursor: Scalars['String'],
  /** The item at the end of the edge. */
  node: LunchDish,
};

/** An edge in a connection. */
export type LunchEdge = {
  __typename?: 'LunchEdge',
  /** A cursor for use in pagination. */
  cursor: Scalars['String'],
  /** The item at the end of the edge. */
  node: Lunch,
};

export type Mutation = {
  __typename?: 'Mutation',
  addDishToLunch: LunchDish,
  createLunch: Lunch,
  createVendor: Vendor,
  createVendorDish: Dish,
  deleteLunch: Lunch,
  removeDishFromLunch: LunchDish,
  updateLunch: Lunch,
  updateVendor: Vendor,
};


export type MutationAddDishToLunchArgs = {
  input: AddDishToLunchInput
};


export type MutationCreateLunchArgs = {
  input: CreateLunchInput
};


export type MutationCreateVendorArgs = {
  input: CreateVendorInput
};


export type MutationCreateVendorDishArgs = {
  input: CreateDishInput
};


export type MutationDeleteLunchArgs = {
  id: Scalars['ID']
};


export type MutationRemoveDishFromLunchArgs = {
  id: Scalars['ID']
};


export type MutationUpdateLunchArgs = {
  input: UpdateLunchInput
};


export type MutationUpdateVendorArgs = {
  input: UpdateVendorInput
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo',
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>,
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>,
};

export type Query = {
  __typename?: 'Query',
  dish: Dish,
  dishes: DishConnection,
  lunch: Lunch,
  lunchDish: LunchDish,
  lunches: LunchConnection,
  user: User,
  vendor: Vendor,
  vendors: VendorConnection,
};


export type QueryDishArgs = {
  id: Scalars['ID']
};


export type QueryDishesArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryLunchArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryLunchDishArgs = {
  id: Scalars['ID']
};


export type QueryLunchesArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryVendorArgs = {
  id: Scalars['ID']
};


export type QueryVendorsArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type UpdateLunchInput = {
  id: Scalars['ID'],
  occasion?: Maybe<Scalars['String']>,
  vendorId?: Maybe<Scalars['ID']>,
  userId?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateVendorInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  address: Scalars['String'],
};

export type User = {
  __typename?: 'User',
  birthdate: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  first_name: Scalars['String'],
  id: Scalars['ID'],
  last_name?: Maybe<Scalars['String']>,
};

export type Vendor = {
  __typename?: 'Vendor',
  address?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  dishes: DishConnection,
  id: Scalars['ID'],
  lunches: LunchConnection,
  name: Scalars['String'],
};


export type VendorDishesArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type VendorLunchesArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

/** The connection type for Vendor. */
export type VendorConnection = {
  __typename?: 'VendorConnection',
  /** A list of edges. */
  edges: Array<VendorEdge>,
  /** A list of nodes. */
  nodes: Array<Vendor>,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  totalCount: Scalars['Int'],
};

/** An edge in a connection. */
export type VendorEdge = {
  __typename?: 'VendorEdge',
  /** A cursor for use in pagination. */
  cursor: Scalars['String'],
  /** The item at the end of the edge. */
  node: Vendor,
};
export type CreateLunchMutationVariables = {
  input: CreateLunchInput
};


export type CreateLunchMutation = (
  { __typename?: 'Mutation' }
  & { createLunch: { __typename?: 'Lunch' }
    & LunchDetailsFragment
   }
);

export type LunchQueryVariables = {
  id: Scalars['ID']
};


export type LunchQuery = (
  { __typename?: 'Query' }
  & { lunch: { __typename?: 'Lunch' }
    & LunchDetailsFragment
   }
);

export type LunchDetailsFragment = (
  { __typename?: 'Lunch' }
  & Pick<Lunch, 'id' | 'date' | 'occasion' | 'description'>
  & { vendor: (
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'name'>
  ) }
);

export type LunchOptionFragment = (
  { __typename?: 'Lunch' }
  & Pick<Lunch, 'id' | 'date' | 'occasion'>
  & { vendor: (
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'name'>
  ) }
);

export type LunchOptionsQueryVariables = {
  first: Scalars['Int']
};


export type LunchOptionsQuery = (
  { __typename?: 'Query' }
  & { lunches: (
    { __typename?: 'LunchConnection' }
    & { edges: Array<(
      { __typename?: 'LunchEdge' }
      & { node: { __typename?: 'Lunch' }
        & LunchOptionFragment
       }
    )> }
  ) }
);

export type LunchesQueryVariables = {
  first: Scalars['Int']
};


export type LunchesQuery = (
  { __typename?: 'Query' }
  & { lunches: (
    { __typename?: 'LunchConnection' }
    & { edges: Array<(
      { __typename?: 'LunchEdge' }
      & { node: { __typename?: 'Lunch' }
        & LunchDetailsFragment
       }
    )> }
  ) }
);

export type UpdateLunchMutationVariables = {
  input: UpdateLunchInput
};


export type UpdateLunchMutation = (
  { __typename?: 'Mutation' }
  & { updateLunch: { __typename?: 'Lunch' }
    & LunchDetailsFragment
   }
);

export type CreateVendorMutationVariables = {
  input: CreateVendorInput
};


export type CreateVendorMutation = (
  { __typename?: 'Mutation' }
  & { createVendor: { __typename?: 'Vendor' }
    & VendorOptionFragment
   }
);

export type DishDetailsFragment = (
  { __typename?: 'Dish' }
  & Pick<Dish, 'id' | 'name'>
);

export type DishOptionFragment = (
  { __typename?: 'Dish' }
  & Pick<Dish, 'id' | 'name'>
);

export type UpdateVendorMutationVariables = {
  input: UpdateVendorInput
};


export type UpdateVendorMutation = (
  { __typename?: 'Mutation' }
  & { updateVendor: { __typename?: 'Vendor' }
    & VendorDetailsFragment
   }
);

export type VendorQueryVariables = {
  id: Scalars['ID']
};


export type VendorQuery = (
  { __typename?: 'Query' }
  & { vendor: { __typename?: 'Vendor' }
    & VendorDetailsFragment
   }
);

export type VendorDetailsFragment = (
  { __typename?: 'Vendor' }
  & Pick<Vendor, 'id' | 'address' | 'description' | 'name'>
  & { dishes: (
    { __typename?: 'DishConnection' }
    & { edges: Array<(
      { __typename?: 'DishEdge' }
      & { node: { __typename?: 'Dish' }
        & DishOptionFragment
       }
    )> }
  ) }
);

export type VendorOptionFragment = (
  { __typename?: 'Vendor' }
  & Pick<Vendor, 'id' | 'name'>
);

export type VendorOptionsQueryVariables = {
  first: Scalars['Int']
};


export type VendorOptionsQuery = (
  { __typename?: 'Query' }
  & { vendors: (
    { __typename?: 'VendorConnection' }
    & { edges: Array<(
      { __typename?: 'VendorEdge' }
      & { node: { __typename?: 'Vendor' }
        & VendorOptionFragment
       }
    )> }
  ) }
);

export type VendorsQueryVariables = {
  first: Scalars['Int']
};


export type VendorsQuery = (
  { __typename?: 'Query' }
  & { vendors: (
    { __typename?: 'VendorConnection' }
    & { edges: Array<(
      { __typename?: 'VendorEdge' }
      & { node: { __typename?: 'Vendor' }
        & VendorDetailsFragment
       }
    )> }
  ) }
);
export const LunchDetailsFragmentDoc = gql`
    fragment LunchDetails on Lunch {
  id
  date
  occasion
  description
  vendor {
    id
    name
  }
}
    `;
export const LunchOptionFragmentDoc = gql`
    fragment LunchOption on Lunch {
  id
  date
  occasion
  vendor {
    id
    name
  }
}
    `;
export const DishDetailsFragmentDoc = gql`
    fragment DishDetails on Dish {
  id
  name
}
    `;
export const DishOptionFragmentDoc = gql`
    fragment DishOption on Dish {
  id
  name
}
    `;
export const VendorDetailsFragmentDoc = gql`
    fragment VendorDetails on Vendor {
  id
  address
  description
  name
  dishes(first: 100) {
    edges {
      node {
        ...DishOption
      }
    }
  }
}
    ${DishOptionFragmentDoc}`;
export const VendorOptionFragmentDoc = gql`
    fragment VendorOption on Vendor {
  id
  name
}
    `;
export const CreateLunchDocument = gql`
    mutation CreateLunch($input: CreateLunchInput!) {
  createLunch(input: $input) {
    ...LunchDetails
  }
}
    ${LunchDetailsFragmentDoc}`;
export type CreateLunchMutationFn = ApolloReactCommon.MutationFunction<CreateLunchMutation, CreateLunchMutationVariables>;

    export function useCreateLunchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLunchMutation, CreateLunchMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateLunchMutation, CreateLunchMutationVariables>(CreateLunchDocument, baseOptions);
    };
export type CreateLunchMutationHookResult = ReturnType<typeof useCreateLunchMutation>;
export type CreateLunchMutationResult = ApolloReactCommon.MutationResult<CreateLunchMutation>;
export type CreateLunchMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateLunchMutation, CreateLunchMutationVariables>;
export const LunchDocument = gql`
    query Lunch($id: ID!) {
  lunch(id: $id) {
    ...LunchDetails
  }
}
    ${LunchDetailsFragmentDoc}`;

    export function useLunchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LunchQuery, LunchQueryVariables>) {
      return ApolloReactHooks.useQuery<LunchQuery, LunchQueryVariables>(LunchDocument, baseOptions);
    };
      export function useLunchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LunchQuery, LunchQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<LunchQuery, LunchQueryVariables>(LunchDocument, baseOptions);
      };
      
export type LunchQueryHookResult = ReturnType<typeof useLunchQuery>;
export type LunchQueryResult = ApolloReactCommon.QueryResult<LunchQuery, LunchQueryVariables>;
export const LunchOptionsDocument = gql`
    query LunchOptions($first: Int!) {
  lunches(first: $first) {
    edges {
      node {
        ...LunchOption
      }
    }
  }
}
    ${LunchOptionFragmentDoc}`;

    export function useLunchOptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LunchOptionsQuery, LunchOptionsQueryVariables>) {
      return ApolloReactHooks.useQuery<LunchOptionsQuery, LunchOptionsQueryVariables>(LunchOptionsDocument, baseOptions);
    };
      export function useLunchOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LunchOptionsQuery, LunchOptionsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<LunchOptionsQuery, LunchOptionsQueryVariables>(LunchOptionsDocument, baseOptions);
      };
      
export type LunchOptionsQueryHookResult = ReturnType<typeof useLunchOptionsQuery>;
export type LunchOptionsQueryResult = ApolloReactCommon.QueryResult<LunchOptionsQuery, LunchOptionsQueryVariables>;
export const LunchesDocument = gql`
    query Lunches($first: Int!) {
  lunches(first: $first) {
    edges {
      node {
        ...LunchDetails
      }
    }
  }
}
    ${LunchDetailsFragmentDoc}`;

    export function useLunchesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LunchesQuery, LunchesQueryVariables>) {
      return ApolloReactHooks.useQuery<LunchesQuery, LunchesQueryVariables>(LunchesDocument, baseOptions);
    };
      export function useLunchesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LunchesQuery, LunchesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<LunchesQuery, LunchesQueryVariables>(LunchesDocument, baseOptions);
      };
      
export type LunchesQueryHookResult = ReturnType<typeof useLunchesQuery>;
export type LunchesQueryResult = ApolloReactCommon.QueryResult<LunchesQuery, LunchesQueryVariables>;
export const UpdateLunchDocument = gql`
    mutation UpdateLunch($input: UpdateLunchInput!) {
  updateLunch(input: $input) {
    ...LunchDetails
  }
}
    ${LunchDetailsFragmentDoc}`;
export type UpdateLunchMutationFn = ApolloReactCommon.MutationFunction<UpdateLunchMutation, UpdateLunchMutationVariables>;

    export function useUpdateLunchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLunchMutation, UpdateLunchMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateLunchMutation, UpdateLunchMutationVariables>(UpdateLunchDocument, baseOptions);
    };
export type UpdateLunchMutationHookResult = ReturnType<typeof useUpdateLunchMutation>;
export type UpdateLunchMutationResult = ApolloReactCommon.MutationResult<UpdateLunchMutation>;
export type UpdateLunchMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLunchMutation, UpdateLunchMutationVariables>;
export const CreateVendorDocument = gql`
    mutation CreateVendor($input: CreateVendorInput!) {
  createVendor(input: $input) {
    ...VendorOption
  }
}
    ${VendorOptionFragmentDoc}`;
export type CreateVendorMutationFn = ApolloReactCommon.MutationFunction<CreateVendorMutation, CreateVendorMutationVariables>;

    export function useCreateVendorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVendorMutation, CreateVendorMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateVendorMutation, CreateVendorMutationVariables>(CreateVendorDocument, baseOptions);
    };
export type CreateVendorMutationHookResult = ReturnType<typeof useCreateVendorMutation>;
export type CreateVendorMutationResult = ApolloReactCommon.MutationResult<CreateVendorMutation>;
export type CreateVendorMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVendorMutation, CreateVendorMutationVariables>;
export const UpdateVendorDocument = gql`
    mutation UpdateVendor($input: UpdateVendorInput!) {
  updateVendor(input: $input) {
    ...VendorDetails
  }
}
    ${VendorDetailsFragmentDoc}`;
export type UpdateVendorMutationFn = ApolloReactCommon.MutationFunction<UpdateVendorMutation, UpdateVendorMutationVariables>;

    export function useUpdateVendorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateVendorMutation, UpdateVendorMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateVendorMutation, UpdateVendorMutationVariables>(UpdateVendorDocument, baseOptions);
    };
export type UpdateVendorMutationHookResult = ReturnType<typeof useUpdateVendorMutation>;
export type UpdateVendorMutationResult = ApolloReactCommon.MutationResult<UpdateVendorMutation>;
export type UpdateVendorMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateVendorMutation, UpdateVendorMutationVariables>;
export const VendorDocument = gql`
    query Vendor($id: ID!) {
  vendor(id: $id) {
    ...VendorDetails
  }
}
    ${VendorDetailsFragmentDoc}`;

    export function useVendorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VendorQuery, VendorQueryVariables>) {
      return ApolloReactHooks.useQuery<VendorQuery, VendorQueryVariables>(VendorDocument, baseOptions);
    };
      export function useVendorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VendorQuery, VendorQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<VendorQuery, VendorQueryVariables>(VendorDocument, baseOptions);
      };
      
export type VendorQueryHookResult = ReturnType<typeof useVendorQuery>;
export type VendorQueryResult = ApolloReactCommon.QueryResult<VendorQuery, VendorQueryVariables>;
export const VendorOptionsDocument = gql`
    query VendorOptions($first: Int!) {
  vendors(first: $first) {
    edges {
      node {
        ...VendorOption
      }
    }
  }
}
    ${VendorOptionFragmentDoc}`;

    export function useVendorOptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VendorOptionsQuery, VendorOptionsQueryVariables>) {
      return ApolloReactHooks.useQuery<VendorOptionsQuery, VendorOptionsQueryVariables>(VendorOptionsDocument, baseOptions);
    };
      export function useVendorOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VendorOptionsQuery, VendorOptionsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<VendorOptionsQuery, VendorOptionsQueryVariables>(VendorOptionsDocument, baseOptions);
      };
      
export type VendorOptionsQueryHookResult = ReturnType<typeof useVendorOptionsQuery>;
export type VendorOptionsQueryResult = ApolloReactCommon.QueryResult<VendorOptionsQuery, VendorOptionsQueryVariables>;
export const VendorsDocument = gql`
    query Vendors($first: Int!) {
  vendors(first: $first) {
    edges {
      node {
        ...VendorDetails
      }
    }
  }
}
    ${VendorDetailsFragmentDoc}`;

    export function useVendorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VendorsQuery, VendorsQueryVariables>) {
      return ApolloReactHooks.useQuery<VendorsQuery, VendorsQueryVariables>(VendorsDocument, baseOptions);
    };
      export function useVendorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VendorsQuery, VendorsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<VendorsQuery, VendorsQueryVariables>(VendorsDocument, baseOptions);
      };
      
export type VendorsQueryHookResult = ReturnType<typeof useVendorsQuery>;
export type VendorsQueryResult = ApolloReactCommon.QueryResult<VendorsQuery, VendorsQueryVariables>;
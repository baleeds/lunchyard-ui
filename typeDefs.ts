export const typeDefs = `
input AddDishToLunchInput {
  lunchId: ID!
  dishId: ID!
  quantity: Int
}

input CreateDishInput {
  name: String!
  price: String!
  vendorId: String!
}

input CreateLunchInput {
  occasion: String!
  vendorId: ID!
  userId: ID!
  date: Date
  description: String
}

input CreateVendorInput {
  name: String!
  description: String!
  address: String!
}

scalar Date

type Dish {
  id: ID!
  name: String!
  price: String
  vendorId: ID!
}

"""The connection type for Dish."""
type DishConnection {
  """A list of edges."""
  edges: [DishEdge!]!

  """A list of nodes."""
  nodes: [Dish!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """Total objects number of items"""
  totalCount: Int!
}

"""An edge in a connection."""
type DishEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: Dish!
}

type Lunch {
  date: String
  description: String
  id: ID!
  lunchDishes(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): LunchDishConnection!
  occasion: String
  user: User!
  vendor: Vendor!
}

"""The connection type for Lunch."""
type LunchConnection {
  """A list of edges."""
  edges: [LunchEdge!]!

  """A list of nodes."""
  nodes: [Lunch!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """Total objects number of items"""
  totalCount: Int!
}

type LunchDish {
  dish: Dish!
  dishId: ID!
  id: ID!
  lunchId: ID!
  quantity: Int
}

"""The connection type for LunchDish."""
type LunchDishConnection {
  """A list of edges."""
  edges: [LunchDishEdge!]!

  """A list of nodes."""
  nodes: [LunchDish!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """Total objects number of items"""
  totalCount: Int!
}

"""An edge in a connection."""
type LunchDishEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: LunchDish!
}

"""An edge in a connection."""
type LunchEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: Lunch!
}

type Mutation {
  addDishToLunch(input: AddDishToLunchInput!): LunchDish!
  createLunch(input: CreateLunchInput!): Lunch!
  createVendor(input: CreateVendorInput!): Vendor!
  createVendorDish(input: CreateDishInput!): Dish!
  deleteLunch(id: ID!): Lunch!
  deleteVendor(id: ID!): Vendor!
  removeDishFromLunch(id: ID!): LunchDish!
  updateLunch(input: UpdateLunchInput!): Lunch!
  updateVendor(input: UpdateVendorInput!): Vendor!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, the cursor to continue."""
  endCursor: String

  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String
}

type Query {
  dish(id: ID!): Dish!
  dishes(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): DishConnection!
  lunch(id: ID): Lunch!
  lunchDish(id: ID!): LunchDish!
  lunches(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): LunchConnection!
  user(id: ID!): User!
  vendor(id: ID!): Vendor!
  vendors(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): VendorConnection!
}

input UpdateLunchInput {
  id: ID!
  occasion: String
  vendorId: ID
  userId: ID
  date: String
  description: String
}

input UpdateVendorInput {
  id: ID!
  name: String
  description: String
  address: String
}

type User {
  birthdate: String!
  email: String
  first_name: String!
  id: ID!
  last_name: String
}

type Vendor {
  address: String
  description: String
  dishes(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): DishConnection!
  id: ID!
  lunches(
    """Returns the elements in the list that come after the specified cursor."""
    after: String

    """
    Returns the elements in the list that come before the specified cursor.
    """
    before: String

    """Returns the first _n_ elements from the list."""
    first: Int

    """Returns the last _n_ elements from the list."""
    last: Int
  ): LunchConnection!
  name: String!
}

"""The connection type for Vendor."""
type VendorConnection {
  """A list of edges."""
  edges: [VendorEdge!]!

  """A list of nodes."""
  nodes: [Vendor!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """Total objects number of items"""
  totalCount: Int!
}

"""An edge in a connection."""
type VendorEdge {
  """A cursor for use in pagination."""
  cursor: String!

  """The item at the end of the edge."""
  node: Vendor!
}
`
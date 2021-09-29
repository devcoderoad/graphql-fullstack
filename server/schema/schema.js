const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const dummyBooks = [
  {
    id: "1",
    name: "Test one",
    genre: "Scifi",
    authorId: "2",
  },
  {
    id: "2",
    name: "Test two",
    genre: "Drama",
    authorId: "3",
  },
  {
    id: "3",
    name: "Test three",
    genre: "Biography",
    authorId: "1",
  },
  {
    id: "4",
    name: "Test four",
    genre: "Scifi",
    authorId: "2",
  },
  {
    id: "5",
    name: "Test five",
    genre: "Drama",
    authorId: "3",
  },
  {
    id: "6",
    name: "Test six",
    genre: "Biography",
    authorId: "1",
  },
  {
    id: "7",
    name: "Test Seven",
    genre: "Scifi",
    authorId: "2",
  },
  {
    id: "8",
    name: "Test Eight",
    genre: "Drama",
    authorId: "3",
  },
  {
    id: "9",
    name: "Test Seven",
    genre: "Biography",
    authorId: "1",
  },
  {
    id: "10",
    name: "Test Ten",
    genre: "Biography",
    authorId: "1",
  },
];

const dummyAuthors = [
  {
    id: "1",
    name: "Mr. Author One",
    age: 24,
  },
  {
    id: "2",
    name: "Mrs. Author Two",
    age: 19,
  },
  {
    id: "3",
    name: "Mr. Author Three",
    age: 34,
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent); // parent
        // console.log(args); // args.id
        return dummyAuthors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return dummyBooks.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from data/db source
        // console.log(args); // args.id;
        return dummyBooks.find((book) => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from data/db source
        // console.log(args); // args.id;
        return dummyAuthors.find((author) => author.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // code to get data from data/db source
        // console.log(args); // args.id;
        return dummyBooks;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // code to get data from data/db source
        // console.log(args); // args.id;
        return dummyAuthors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

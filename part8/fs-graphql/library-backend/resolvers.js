require("dotenv").config();
const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const User = require("./models/user");
var jwt = require("jsonwebtoken");

const AuthError = new GraphQLError("User not authenticated", {
  extensions: {
    code: "UNAUTHENTICATED",
    reason: "Missing or invalid JWT",
  },
});

const AuthPassError = new GraphQLError("Wrong password or username", {
  extensions: {
    code: "BAD_USER_INPUT",
    reason: "wrong password or username",
  },
});

const resolvers = {
  Query: {
    me: async (root, args, { currentUser }) => {
      return currentUser;
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const query = {};
      if (author) {
        const authorDoc = await Author.findOne({ name: author });

        if (!authorDoc) {
          return [];
        }

        query.author = authorDoc._id;
      }
      if (genre) query.genres = genre;
      return Book.find(query).populate("author");
    },

    allAuthors: async () => Author.find(),
  },

  Mutation: {
    addBook: async (
      root,
      { title, author, published, genres },
      { currentUser },
    ) => {
      if (!currentUser) throw AuthError;

      let hasAuthor = await Author.findOne({ name: author });

      try {
        if (!hasAuthor) {
          hasAuthor = new Author({ name: author });
        }

        await hasAuthor.save();
        let book = new Book({
          title,
          author: hasAuthor._id,
          published,
          genres,
        });

        await book.save();
        await book.populate("author");
        return book;
      } catch (err) {
        let message = "Saving book failed";

        if (err.code === 11000) {
          message = "Duplicate value";
        } else if (err.errors?.title) {
          message = "Title is too short";
        } else if (err.errors?.name) {
          message = "Author name is too short";
        }
        throw new GraphQLError(message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: Object.keys(err.errors || {}),
            error: err.message,
          },
        });
      }
    },
    editAuthor: async (root, { name, setBornTo: born }, { currentUser }) => {
      if (!currentUser) return AuthError;
      const hasAuthor = await Author.findOne({ name });
      if (!hasAuthor) {
        return null;
      }
      hasAuthor.born = born;
      await hasAuthor.save();
      return hasAuthor;
    },
    createUser: async (root, { username, favoriteGenre }) => {
      let user = await User.findOne({ username });
      if (user) return null;

      try {
        user = new User({ username, favoriteGenre });
        await user.save();
        return user;
      } catch (err) {
        let message = "Saving book failed";

        if (err.code === 11000) {
          message = "Duplicate value";
        } else if (err.errors?.username) {
          message = "username is too short";
        }
        throw new GraphQLError(message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: Object.keys(err.errors || {}),
            error: err.message,
          },
        });
      }
    },
    login: async (root, { username, password }) => {
      // we should chewck pass using bcrypt here
      if (password !== "secret") throw AuthPassError;
      let user = await User.findOne({ username });
      if (!user) throw AuthPassError;
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );
      return { value: token };
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== "test") {
        throw new GraphQLError("_resetDatabase is only available in test mode");
      }
      await Author.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});
      return true;
    },
  },
};

module.exports = resolvers;

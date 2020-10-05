//スキーマ: GraphQLのAPIの仕様を表現するもの、データやデータのリレーション等を記載
const graphql = require("graphql"); //required "npm install graphql"
const Movie = require("../models/movie");
const Director = require("../models/director");

// type(型)のひな形
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  //fieldsに、取得したいデータとその型を入力
  //その際、クロージャ―でラップ
  //∵他の型とリレーションを組む際に読み込み順番によってリレーション先の型を読み込めない場合があるためまずクロージャ―で囲みカプセル化
  fields: () => ({
    //GraphQLには標準で型が定義されているのでそれを使用し定義する(GraphQLIDなど)
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      //movieに関連するDirector情報を取得するためresolve()関数を定義
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType), //hasmanyでListになるのでGraphQLListを使用
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

//定義したMovieTypeを外部から参照できるようにRootQueryを作成
//特定のIDのデータ取得およびデータ一覧取得
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } }, //API検索時に渡すパラメータ
      resolve(parents, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } }, //GraphQLIDはstringとintを許容し、string型で格納
      resolve(parents, args) {
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },
  },
});
// データ新規登録および更新
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parents, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save(); //saveしてその結果が返却されるようにreturn
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parents, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }, //ID値でnotnull制約
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateMovie = {};
        args.name && (updateMovie.name = args.name);
        args.genre && (updateMovie.genre = args.genre);
        args.directorId && (updateMovie.directorId = args.directorId);
        return Movie.findByIdAndUpdate(args.id, updateMovie, {
          new: true,
        }); //第三引数に{new:true}を渡すことで結果が返却
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }, //IDで検索するので含める//GraphQLNonNull(GraphQLID):ID値にnonnull制約
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateDirector = {};
        args.name && (updateDirector.name = args.name);
        args.age && (updateDirector.age = args.age);
        return Director.findByIdAndUpdate(args.id, updateDirector, {
          new: true,
        }); //第三引数に{new:true}を渡すことで結果が返却
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movie.findByIdAndRemove(args.id);
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Director.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

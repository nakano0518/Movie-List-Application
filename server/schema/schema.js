//スキーマ: GraphQLのAPIの仕様を表現するもの、データやデータのリレーション等を記載
const graphql = require("graphql"); //required "npm install graphql"
const Movie = require("../models/movie");
// type(型)のひな形
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql;

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
  }),
});

//定義したMovieTypeを外部から参照できるようにRootQueryを作成
//特定のIDのデータ取得
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } }, //API検索時に渡すパラメータ
      resolve(parents, args) {
        return Movie.findById(args.id);
      },
    },
  },
});
// データ新規登録
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parents, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
        });
        return movie.save(); //saveしてその結果が返却されるようにreturn
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

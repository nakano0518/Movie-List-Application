//スキーマ: GraphQLのAPIの仕様を表現するもの、データやデータのリレーション等を記載
const graphql = require("graphql"); //required "npm install graphql"

// type(型)のひな形
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

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

//外部から定義したMovieTypeを参照できるようにRootQueryを作成
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  field: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } }, //API検索時に渡すパラメータ
      resolve(parents, args) {},
    },
  },
});

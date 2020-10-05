const express = require("express"); //required "npm install express"
const graphqlHTTP = require("express-graphql").graphqlHTTP; //required "npm install express-graphql"
const mongoose = require("mongoose"); //required "npm install mongoose"
const schema = require("./schema/schema");
const app = express(); // appオブジェクトは、expressでWebアプリを構築する際に必要な変数・メソッドが保持
require("dotenv").config();

//mongoDBへの接続
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//イベントリスナ―にconsole.logで接続されたことを確認
mongoose.connection.once("open", () => {
  console.log("db connected");
});

// GraphQLにおける1つのエンドポイント(のためのミドルウェア)を作成(appのuseメソッド)
// 第一引数(パス)、第二引数(ハンドラー)、ハンドラーでスキーマを定義
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, //バックエンドのみでテストができるようにするツール
  })
);

// サーバー起動、第一引数(ポート番号)、第二引数(コールバック関数)
// ホットリロード機能にするため、npm install nodemonを実行、nodemon appで起動しホットリロード機能が有効
app.listen(4000, () => {
  console.log("listening port 4000");
});

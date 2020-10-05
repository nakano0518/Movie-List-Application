import { gql } from "apollo-boost";

// graphiqlで、GraphQLのクエリを作成・実行し正常に返却されたことを確認したうえで、下記にて使用すると間違いが起きない
export const MOVIE_LIST = gql`
  {
    movies {
      id
      name
      genre
      director {
        name
      }
    }
  }
`;

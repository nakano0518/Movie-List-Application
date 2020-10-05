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

export const DIRECTOR_LIST = gql`
  {
    directors {
      id
      name
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      name
      genre
    }
  }
`;

export const ADD_DIRECTOR = gql`
  mutation($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      name
      age
    }
  }
`;

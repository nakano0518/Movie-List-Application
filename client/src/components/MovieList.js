import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
// eslint-disable-next-line
import { gql } from "apollo-boost";
import { Button, Card, CardBody, Table } from "reactstrap";
import { MOVIE_LIST, DELETE_MOVIE } from "../queries/queries";

function MovieList() {
  const { loading, error, data } = useQuery(MOVIE_LIST);
  const [deleteMutation] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  });
  const handleDeleteMovie = (id) => {
    deleteMutation({ variables: { id } });
  };
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error</p>;
  } else {
    return (
      <Card>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>ジャンル</th>
                <th colSpan="2">監督</th>
              </tr>
            </thead>
            <tbody>
              {data.movies.map(({ id, name, genre, director }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{genre}</td>
                  <td>{director?.name}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => handleDeleteMovie(id)}
                    >
                      削除
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default MovieList;

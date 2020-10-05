import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
} from "reactstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useForm } from "react-hook-form"; // yarn add react-hook-form //Formの入力値の一元管理
import {
  DIRECTOR_LIST,
  ADD_MOVIE,
  MOVIE_LIST,
  ADD_DIRECTOR,
} from "../queries/queries";

function SideNav() {
  const { data } = useQuery(DIRECTOR_LIST);
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  }); //refetchQueries: ADD_MOVIE後にList再取得
  const [addDirector] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [{ query: DIRECTOR_LIST }],
    awaitRefetchQueries: true,
  });
  const { register, handleSubmit } = useForm(); //handleSubmitに加え、errorsも追加できる(今回は省略)
  const {
    register: registerDirector,
    handleSubmit: handleSubmitDirector,
  } = useForm(); // 上に記載済みなのでDirector用に別名を与える
  const onSubmit = ({ movieName, movieGenre, directorId }, e) => {
    addMovie({ variables: { name: movieName, genre: movieGenre, directorId } }); //directorIdは、プロパティ名値が同じなので、オブジェクトリテラルの省略形
    e.target.reset();
  };
  const onSubmitDirector = ({ directorName, directorAge }, e) => {
    const IntAge = parseInt(directorAge);
    addDirector({ variables: { name: directorName, age: IntAge } }); //GraphQLのクエリの引数の変数部分に代入
    e.target.reset();
  };
  return (
    <div>
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              {/* reactstrapでinputコンポーネントは存在するが、React Hooks Form Libraryと相性が悪いためinput要素に */}
              <input
                className="form-control"
                type="text"
                name="directorName"
                placeholder="監督名"
                ref={registerDirector}
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="number"
                name="directorAge"
                placeholder="年齢"
                ref={registerDirector}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="movieName"
                placeholder="タイトル"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control"
                type="text"
                name="movieGenre"
                placeholder="ジャンル"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <select
                className="form-control"
                type="select"
                name="directorId"
                ref={register}
              >
                {data &&
                  data.directors.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SideNav;

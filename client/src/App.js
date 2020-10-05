import React from "react";
//apollo clientの導入方法および使用方法は公式参照
//yarn add apollo-boost @apollo/react-hooks graphql
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks"; //Reduxの<Provider store={store}>のようなもの
import { Col, Container, Row } from "reactstrap";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import SideNav from "./components/SideNav";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <div className="App">
      <Header />
      <ApolloProvider client={client}>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <SideNav />
            </Col>
            <Col xs={12} sm={8}>
              <MovieList />
            </Col>
          </Row>
        </Container>
      </ApolloProvider>
    </div>
  );
}

export default App;

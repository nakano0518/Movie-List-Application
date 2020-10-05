import React from "react";
import { Col, Container, Row } from "reactstrap";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div className="App">
      <Header />
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
    </div>
  );
}

export default App;

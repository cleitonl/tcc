import React from "react";
import logo from "../../assets/logo.png";
import { Col, Row, Container } from "reactstrap";

const HeaderMenu = ({ title }) => (
  <header
    style={{ backgroundColor: "#F5F5F5", width: "100%", minHeight: "70px" }}
  >
    <Container fluid={true}>
      <Row style={{ color: "#014188", marginTop: "6px" }}>
        <Col sm="4">
          <img src={logo} alt="logo" height="50px" />
          <h6 style={{ fontWeight: "bolder" }}>Celular Restrito</h6>
        </Col>
        <Col sm="6" md={{ size: 6, offset: 1 }}>
          <h4 style={{ fontWeight: "bolder", marginTop: "22px" }}>{title}</h4>
        </Col>
      </Row>
    </Container>
  </header>
);

export default HeaderMenu;

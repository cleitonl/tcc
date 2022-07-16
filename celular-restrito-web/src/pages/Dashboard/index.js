import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Alert, Table, Row, Col } from "reactstrap";
import HeaderMenu from "../../components/HeaderMenu";
import "./styles.css";
import ModalNovoAparelho from "../../components/ModalNovoAparelho";
import ModalApagarAparelho from "../../components/ModalApagarAparelho";
import ModalEditarAparelho from "../../components/ModalEditarAparelho";
import ModalAlertarAparelho from "../../components/ModalAlertarAparelho";

import Loading from "../../components/Loader";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logedIn: "",
      loading: false,
      success: "",
      message: "",
      aparelhos: [],
    };
  }

  componentDidMount() {
    this.getAparelhos();
  }

  getAparelhos = async () => {
    this.setState({ loading: true });
    const requestInfo = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    try {
      let response = await fetch("http://localhost:8080/aparelho", requestInfo);
      let responseJson = await response.json();

      if (responseJson.success === true) {
        this.setState({ loading: false, aparelhos: responseJson.data });
      } else
        this.setState({
          loading: false,
          success: false,
          message: responseJson.error,
        });
    } catch (error) {
      this.setState({
        loading: false,
        success: false,
        message: "Erro de Servidor!",
      });
    }
  };

  deleteAparelho = async (id) => {
    this.setState({ loading: true });
    const requestInfo = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    try {
      let response = await fetch(
        "http://localhost:8080/aparelho/" + id,
        requestInfo
      );
      let responseJson = await response.json();

      if (responseJson.success === true) {
        this.getAparelhos();
      } else
        this.setState({
          loading: false,
          success: false,
          message: responseJson.error,
        });
    } catch (error) {
      this.setState({
        loading: false,
        success: false,
        message: "Erro de Servidor!",
      });
    }
  };

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <HeaderMenu title={"Meus Aparelhos"} />
        </Row>
        <Row>
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Serial</th>
                  <th>Operadora</th>
                  <th>Numero</th>
                  <th>Imei</th>
                  <th>Situação</th>
                  <th>Editar</th>
                  <th>Restrição</th>
                  <th>Apagar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.aparelhos.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.marca}</td>
                      <td>{item.modelo}</td>
                      <td>{item.serial}</td>
                      <td>{item.operadora}</td>
                      <td>{item.numero}</td>
                      <td>{item.imei}</td>
                      <td>
                        {item.situacao === false ? (
                          <span
                            style={{ fontWeight: "bold", color: "LimeGreen" }}
                          >
                            Sem restrição
                          </span>
                        ) : (
                            <span
                              style={{ fontWeight: "bold", color: "Crimson" }}
                            >
                              Com restrição
                            </span>
                          )}
                      </td>
                      <td className="tabelaIcon">
                        <ModalEditarAparelho
                          item={item}
                          executar={() => this.getAparelhos()}
                        />
                      </td>
                      <td className="tabelaIcon">
                        <ModalAlertarAparelho
                          item={item}
                          executar={() => this.getAparelhos()}
                        />
                      </td>
                      <td className="tabelaIcon">
                        <ModalApagarAparelho
                          executar={() => this.deleteAparelho(item.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row style={{ textAlign: "center" }}>
              <Col>
                <ModalNovoAparelho updateData={this.getAparelhos.bind(this)} />
              </Col>
              <Col>
                <Link className="btn btn-outline-primary buttonLink" to="/user">
                  {" "}
                  Meus Dados{" "}
                </Link>
              </Col>
              <Col>
                <Link
                  className="btn btn-outline-primary buttonLink"
                  to="/logout"
                >
                  {" "}
                  Sair{" "}
                </Link>
              </Col>
            </Row>
          </Container>
        </Row>
        <Loading show={this.state.loading} />
        {this.state.message !== "" ? (
          <Alert color="danger" className="text-center">
            {" "}
            {this.state.message}{" "}
          </Alert>
        ) : null}
      </Container>
    );
  }
}

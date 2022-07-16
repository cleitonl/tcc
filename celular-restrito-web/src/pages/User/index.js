import React, { Component } from "react";
import {
  Container,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  Row,
  Button,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import HeaderMenu from "../../components/HeaderMenu";
import { cpfMask, phoneMask } from "../../components/masks";
import Loading from "../../components/Loader";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loading: false,
      success: null,
      id: "",
      nomeCompleto: "",
      nomeMae: "",
      nomePai: "",
      cpf: "",
      dataNasc: null,
      rg: "",
      orgExped: "",
      uf: "",
      contato: "",
      contatoAd: "",
      nomeContatoAd: "",
      email: "",
      senha: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const id = event.target.id;
    switch (id) {
      case "cpf":
        this.setState({ cpf: cpfMask(value) });
        break;
      case "numero":
        this.setState({ numero: phoneMask(value) });
        break;
      case "contatoAd":
        this.setState({ contatoAd: phoneMask(value) });
        break;
      default:
        this.setState({ [id]: value });
        break;
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loading: true });
    const requestInfo = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    try {
      let response = await fetch("http://localhost:8080/usuario", requestInfo);
      let responseJson = await response.json();
      let data = responseJson.data;
      if (responseJson.success === true) {
        this.setState({
          id: data.id,
          nomeCompleto: data.nomeCompleto,
          nomeMae: data.nomeMae,
          nomePai: data.nomePai,
          cpf: data.cpf,
          dataNasc: data.dataNasc,
          rg: data.rg,
          orgExped: data.orgExped,
          uf: data.uf,
          contato: data.contato,
          contatoAd: data.contatoAd,
          nomeContatoAd: data.nomeContatoAd,
          email: data.email,
          senha: data.senha,
        });
        this.setState({ loading: false });
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

  updateUser = async () => {
    this.setState({ loading: true });
    const id = this.state.id;
    const data = {
      nomeCompleto: this.state.nomeCompleto,
      nomeMae: this.state.nomeMae,
      nomePai: this.state.nomePai,
      cpf: this.state.cpf,
      dataNasc: this.state.dataNasc,
      rg: this.state.rg,
      orgExped: this.state.orgExped,
      uf: this.state.uf,
      contato: this.state.contato,
      contatoAd: this.state.contatoAd,
      nomeContatoAd: this.state.nomeContatoAd,
      email: this.state.email,
      senha: this.state.senha,
    };
    const requestInfo = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    try {
      let response = await fetch(
        "http://localhost:8080/usuario/" + id,
        requestInfo
      );
      let responseJson = await response.json();

      if (responseJson.success === true) {
        this.setState({
          loading: false,
          success: true,
          message: "Usuario Atualizado!",
        });
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

  alerts() {
    switch (this.state.success) {
      case true:
        return (
          <Alert color="success" className="text-center">
            {" "}
            {this.state.message}{" "}
          </Alert>
        );
      case false:
        return (
          <Alert color="danger" className="text-center">
            {" "}
            {this.state.message}{" "}
          </Alert>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <HeaderMenu title={" Meus Dados"} />
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            {this.alerts()}

            <Form style={{ color: "#60788B" }}>
              <h4 style={{ fontWeight: "bolder" }}>Seus dados</h4>

              <FormGroup>
                <Label for="nomeCompleto">Nome completo</Label>
                <Input
                  type="text"
                  id="nomeCompleto"
                  value={this.state.nomeCompleto || ""}
                  onChange={this.handleInputChange}
                ></Input>

                <Label for="nomeMae">Nome mãe</Label>
                <Input
                  type="text"
                  id="nomeMae"
                  value={this.state.nomeMae || ""}
                  onChange={this.handleInputChange}
                ></Input>

                <Label for="nomePai">Nome pai</Label>
                <Input
                  type="text"
                  id="nomePai"
                  value={this.state.nomePai || ""}
                  onChange={this.handleInputChange}
                ></Input>
              </FormGroup>

              <Row>
                <Col xs="5">
                  <FormGroup>
                    <Label for="rg">RG</Label>
                    <Input
                      type="text"
                      id="rg"
                      maxLength="7"
                      value={this.state.rg || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="orgExped">Orgão Expedidor</Label>
                    <Input
                      type="text"
                      id="orgExped"
                      value={this.state.orgExped || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="uf">UF</Label>
                    <Input
                      type="text"
                      id="uf"
                      maxLength="2"
                      value={this.state.uf || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="cpf">CPF</Label>
                    <Input
                      type="text"
                      id="cpf"
                      maxLength="14"
                      value={this.state.cpf || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="dataNasc">Data de Nascimento</Label>
                    <Input
                      type="date"
                      id="dataNasc"
                      value={this.state.dataNasc || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="contato">Telefone</Label>
                    <Input
                      type="text"
                      id="contato"
                      value={this.state.contato || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>

              <h4 style={{ fontWeight: "bolder" }}>Contato adicional</h4>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="nomeContatoAd">Nome do contato adicional</Label>
                    <Input
                      type="text"
                      id="nomeContatoAd"
                      value={this.state.nomeContatoAd || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="contatoAd">Telefone</Label>
                    <Input
                      type="text"
                      id="contatoAd"
                      value={this.state.contatoAd || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>

              <p style={{ textAlign: "justify", color: "#D1B3AD" }}>
                O contato adicional é utilizado para entrar em contato em caso
                de recuperação do aparelho e o proprietário não esteja mais
                utilizando o mesmo numero cadastrado.
              </p>

              <h4 style={{ fontWeight: "bolder" }}>
                Dados para acesso ao sistema
              </h4>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      autoComplete="off"
                      id="email"
                      value={this.state.email || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="senha">Senha</Label>
                    <Input
                      type="password"
                      autoComplete="off"
                      id="senha"
                      value={this.state.senha || ""}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup style={{ textAlign: "center" }}>
                <Button
                  style={{ width: "100pt", margin: "5pt" }}
                  color="primary"
                  onClick={this.updateUser}
                >
                  {" "}
                  Salvar{" "}
                </Button>
                <Link
                  style={{ width: "100pt", margin: "5pt" }}
                  to="/dashboard"
                  className="btn btn-outline-secondary"
                >
                  {" "}
                  Voltar{" "}
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Loading show={this.state.loading} />
      </Container>
    );
  }
}

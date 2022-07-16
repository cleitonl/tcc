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
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loading: false,
      success: null,
      cpf: "",
      contato: "",
      contatoAd: "",
    };
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange(e) {
    switch (e.target.id) {
      case "cpf":
        this.setState({ cpf: cpfMask(e.target.value) });
        break;
      case "contato":
        this.setState({ contato: phoneMask(e.target.value) });
        break;
      case "contatoAd":
        this.setState({ contatoAd: phoneMask(e.target.value) });
        break;
      default:
        break;
    }
  }

  signUp = async () => {
    this.setState({ loading: true });
    const data = {
      nomeCompleto: this.nomeCompleto,
      nomeMae: this.nomeMae,
      nomePai: this.nomePai,
      cpf: this.state.cpf,
      dataNasc: this.dataNasc,
      rg: this.rg,
      orgExped: this.orgExped,
      uf: this.uf,
      contato: this.state.contato,
      contatoAd: this.state.contatoAd,
      nomeContatoAd: this.nomeContatoAd,
      email: this.email,
      senha: this.senha,
    };

    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: "Bearer undefined",
      }),
    };
    try {
      let response = await fetch("http://localhost:8080/usuario/", requestInfo);
      let responseJson = await response.json();

      if (responseJson.success === true) {
        this.setState({
          loading: false,
          success: true,
          message:
            "Usuario Cadastrado, Volte a pagina inicial para ter acesso ao sistema!",
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
          <HeaderMenu title={"Cadastro do Usuário"} />
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
                  onChange={(e) => (this.nomeCompleto = e.target.value)}
                ></Input>

                <Label for="nomeMae">Nome mãe</Label>
                <Input
                  type="text"
                  id="nomeMae"
                  onChange={(e) => (this.nomeMae = e.target.value)}
                ></Input>

                <Label for="nomePai">Nome pai</Label>
                <Input
                  type="text"
                  id="nomePai"
                  onChange={(e) => (this.nomePai = e.target.value)}
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
                      onChange={(e) => (this.rg = e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="orgExped">Orgão Expedidor</Label>
                    <Input
                      type="text"
                      id="orgExped"
                      onChange={(e) => (this.orgExped = e.target.value)}
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
                      onChange={(e) => (this.uf = e.target.value)}
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
                      value={this.state.cpf}
                      onChange={this.handlechange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="dataNasc">Data de Nascimento</Label>
                    <Input
                      type="date"
                      id="dataNasc"
                      onChange={(e) => (this.dataNasc = e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="contato">Telefone</Label>
                    <Input
                      type="text"
                      id="contato"
                      value={this.state.contato}
                      onChange={this.handlechange}
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
                      onChange={(e) => (this.nomeContatoAd = e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="contatoAd">Telefone</Label>
                    <Input
                      type="text"
                      id="contatoAd"
                      value={this.state.contatoAd}
                      onChange={this.handlechange}
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
                      onChange={(e) => (this.email = e.target.value)}
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
                      onChange={(e) => (this.senha = e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup style={{ textAlign: "center" }}>
                <Button
                  style={{ width: "100pt", margin: "5pt" }}
                  color="primary"
                  onClick={this.signUp}
                >
                  {" "}
                  Salvar{" "}
                </Button>
                <Link
                  style={{ width: "100pt", margin: "5pt" }}
                  to="/"
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

import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Loading from "../../components/Loader";
import './index.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.location.state
        ? this.props.location.state.message
        : "",
      loading: false,
    };
  }

  signIn = () => {
    this.setState({ loading: true });
    const data = {
      email: this.email,
      senha: this.senha,
    };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    fetch("http://localhost:8080/token", requestInfo)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        this.setState({ loading: false });
        throw new Error("Dados de login inválidos...");
      })
      .then((data) => {
        this.setState({ loading: false });
        localStorage.setItem("token", data.token);
        this.props.history.push("/dashboard");
        return;
      })
      .catch((e) => {
        this.setState({ loading: false });
        this.setState(
          e.message === "Failed to fetch"
            ? { message: "Erro de servidor!" }
            : { message: e.message }
        );
      });
  }
  render() {
    return (
      <div className="Fundo col-lg-4" >
        <div>
          <Header title="Celular Restrito" />
        </div>
        {this.state.message !== "" ? (
          <Alert color="danger" className="text-center">
            {" "}
            {this.state.message}{" "}
          </Alert>
        ) : null}
        <div >
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                autoComplete="username"
                id="email"
                onChange={(e) => (this.email = e.target.value)}
                placeholder="Informe seu e-mail"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="password">Senha</Label>
              <Input
                type="password"
                autoComplete="current-password"
                id="senha"
                onChange={(e) => (this.senha = e.target.value)}
                placeholder="Informe a senha"
              ></Input>
            </FormGroup>
            <FormGroup style={{ textAlign: "center" }}>
              <Button
                style={{ width: "100pt", margin: "5pt" }}
                color="primary"
                onClick={this.signIn}
              >
                {" "}
                Entrar{" "}
              </Button>
              <Link
                style={{ width: "100pt", margin: "5pt" }}
                to="/signup"
                className="btn btn-outline-secondary"
              >
                {" "}
                Cadastrar{" "}
              </Link>
            </FormGroup>
          </Form>
          <Loading show={this.state.loading} />
          <p className="text-justify" style={{ fontSize: 12 }}>
            O <span className="font-weight-bold">Celular Restrito</span>{" "}
            funciona a partir do cadastro do IMEI (NÚMERO DE IDENTIFICAÇÃO DO
            DISPOSITIVO) em nosso sistema. Em caso de perda, roubo ou furto, não
            só a policia mais qualquer pessoa pode consultar e encontrar o seu
            aparelho e devolvê-lo a você.
          </p>
        </div>
      </div>
    );
  }
}

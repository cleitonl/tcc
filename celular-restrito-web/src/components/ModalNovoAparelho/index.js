import React, { Component } from "react";
import {
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import { phoneMask } from "../masks";

export default class ModalNovoAparelho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marca: "",
      modelo: "",
      serial: "",
      operadora: "",
      imei: "",
      situacao: false,
      numero: "",
      modal: false,
      message: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  toggle = () =>
    this.setState({
      modal: !this.state.modal,
    });

  inputClear = () =>
    this.setState({
      marca: "",
      modelo: "",
      serial: "",
      operadora: "",
      imei: "",
      numero: "",
    });

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "numero") {
      this.setState({ numero: phoneMask(value) });
    } else this.setState({ [name]: value });
  }

  createDevices = async (e) => {
    const data = {
      marca: this.state.marca,
      modelo: this.state.modelo,
      serial: this.state.serial,
      operadora: this.state.operadora,
      imei: this.state.imei,
      situacao: false,
      numero: this.state.numero,
    };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };

    try {
      let response = await fetch(
        "http://localhost:8080/aparelho/",
        requestInfo
      );
      let responseJson = await response.json();

      if (responseJson.success === true) {
        this.setState({ message: "Aparelho Cadastrado!" });
        this.updateDashboardData();
        this.inputClear();
      } else this.setState({ message: responseJson.error });
    } catch (error) {
      console.log(error);
      this.setState({ message: "Erro de Servidor!" });
    }
  };

  updateDashboardData(props) {
    this.props.updateData();
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Novo Aparelho
        </Button>
        <Modal
          onOpened={() => this.inputClear()}
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Novo Aparelho</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs="6">
                  <FormGroup>
                    <Label for="marca">Marca</Label>
                    <Input
                      type="select"
                      name="marca"
                      id="marca"
                      value={this.state.marca}
                      onChange={this.handleInputChange}
                    >
                      <option>Samsung</option>
                      <option>Apple</option>
                      <option>Motorola</option>
                      <option>Asus</option>
                      <option>LG</option>
                      <option>Huawei</option>
                      <option>Xiaomi</option>
                      <option>Sony</option>
                      <option>Nokia</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="modelo">Modelo</Label>
                    <Input
                      type="text"
                      name="modelo"
                      id="modelo"
                      value={this.state.modelo}
                      onChange={this.handleInputChange}
                    >
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="7">
                  <FormGroup>
                    <Label for="serial">Serial</Label>
                    <Input
                      type="text"
                      name="serial"
                      id="serial"
                      value={this.state.serial}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="operadora">Operadora</Label>
                    <Input
                      type="select"
                      name="operadora"
                      id="operadora"
                      value={this.state.operadora}
                      onChange={this.handleInputChange}
                    >
                      <option>OI</option>
                      <option>TIM</option>
                      <option>CLARO</option>
                      <option>VIVO</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="6">
                  <FormGroup>
                    <Label for="numero">Numero do Aparelho</Label>
                    <Input
                      type="text"
                      name="numero"
                      id="numero"
                      value={this.state.numero}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="imei">Imei</Label>
                    <Input
                      type="text"
                      name="imei"
                      id="imei"
                      maxLength="15"
                      value={this.state.imei}
                      onChange={this.handleInputChange}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            {this.state.message !== "" ? (
              <Alert color="secondary" className="text-center">
                {" "}
                {this.state.message}{" "}
              </Alert>
            ) : null}
            <Button color="primary" onClick={this.createDevices}>
              Cadastrar
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Sair
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

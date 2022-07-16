import React, { useState } from "react";
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
import editicon from "../../assets/edit.png";

export default function ModalEditarAparelho(props) {
  const { executar, item } = props;

  const data = {
    marca: "",
    modelo: "",
    serial: "",
    operadora: "",
    numero: "",
    imei: "",
  };

  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  const updateAparelho = async () => {
    if (
      !data.marca ||
      !data.modelo ||
      !data.serial ||
      !data.operadora ||
      !data.numero ||
      !data.imei
    ) {
      setMessage("Preencha todos os campos!");
    } else {
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
          "http://localhost:8080/aparelho/" + item.id,
          requestInfo
        );
        let responseJson = await response.json();

        if (responseJson.success === true) {
          setMessage("Aparelho Atualizado!!");
          executar();
          setTimeout(() => {
            toggle();
          }, 700);
        } else setMessage(responseJson.error);
      } catch (error) {
        setMessage("Erro de Servidor!");
      }
    }
  };

  const preencheCampos = async () => {
    document.getElementById("marca").value = item.marca;
    data.marca = item.marca;
    document.getElementById("modelo").value = item.modelo;
    data.modelo = item.modelo;
    document.getElementById("serial").value = item.serial;
    data.serial = item.serial;
    document.getElementById("operadora").value = item.operadora;
    data.operadora = item.operadora;
    document.getElementById("numero").value = item.numero;
    data.numero = item.numero;
    document.getElementById("imei").value = item.imei;
    data.imei = item.imei;
  };

  return (
    <div>
      <button className="buttonTable" onClick={toggle}>
        <img src={editicon} alt="editicon" height="28px" />
      </button>
      <Modal
        isOpen={modal}
        onOpened={() => preencheCampos(item.id)}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Editar Aparelho</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="marca">Marca</Label>
                  <Input
                    type="select"
                    name="form_txt"
                    id="marca"
                    onChange={(e) => (data.marca = e.target.value)}
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
                    name="form_txt"
                    id="modelo"
                    onChange={(e) => (data.modelo = e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="7">
                <FormGroup>
                  <Label for="serial">Serial</Label>
                  <Input
                    type="text"
                    name="form_txt"
                    id="serial"
                    onChange={(e) => (data.serial = e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="operadora">Operadora</Label>
                  <Input
                    type="select"
                    name="form_txt"
                    id="operadora"
                    onChange={(e) => (data.operadora = e.target.value)}
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
                    maxLength="14"
                    name="form_txt"
                    id="numero"
                    onChange={(e) => (data.numero = e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="imei">Imei</Label>
                  <Input
                    type="text"
                    name="form_txt"
                    id="imei"
                    maxLength="15"
                    onChange={(e) => (data.imei = e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          {message !== null ? (
            <Alert color="secondary" className="text-center">
              {" "}
              {message}{" "}
            </Alert>
          ) : null}
          <Button color="primary" onClick={updateAparelho}>
            Salvar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Sair
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

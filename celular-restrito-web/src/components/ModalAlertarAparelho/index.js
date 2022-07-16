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
import alerticon from "../../assets/alert.png";

export default function ModalAlertarAparelho(props) {
  const { executar, item } = props;

  const data = {
    bo: "",
    situacao: item.situacao,
    dataFato: null,
  };

  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  const updateAparelho = async () => {
    data.situacao = !data.situacao;
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
        setTimeout(() => {
          toggle();
        }, 700);
      } else setMessage(responseJson.error);
      executar();
    } catch (error) {
      setMessage("Erro de Servidor!");
    }
  };

  return (
    <div>
      <button className="buttonTable" onClick={toggle}>
        <img src={alerticon} alt="alerticon" height="28px" />
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alertar Aparelho</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="data">Data do fato</Label>
                  <Input
                    disabled={item.situacao}
                    type="date"
                    name="form_txt"
                    id="data"
                    onChange={(e) => (data.dataFato = e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="bo">Numero do BO</Label>
                  <Input
                    disabled={item.situacao}
                    type="text"
                    name="form_txt"
                    id="bo"
                    onChange={(e) => (data.bo = e.target.value)}
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
            {item.situacao ? "Retirar Restrição" : "Restringir"}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Sair
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

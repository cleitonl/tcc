import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, Input, Label, FormGroup } from 'reactstrap';

const ModalNovoAparelho = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  //const Btn = () => (<Button color="secondary" onClick={() => {props.executar()}}>Sair</Button>)

  return (
    <div>
      <Button color="primary" onClick={toggle}>Novo Aparelho</Button>
      <Modal onClosed={() => {}} isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Novo Aparelho</ModalHeader>
        <ModalBody>
          <Form style={{ color: "#60788B" }}>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for='marca'>Marca</Label>
                  <Input type='text' id='marca' onChange={e => this.marca = e.target.value}></Input>
                </FormGroup>
              </Col>
              <Col >
                <FormGroup>
                  <Label for='modelo'>Modelo</Label>
                  <Input type='text' id='modelo' onChange={e => this.modelo = e.target.value}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="7">
                <FormGroup>
                  <Label for='serial'>Serial</Label>
                  <Input type='text' id='serial' onChange={e => this.serial = e.target.value}></Input>
                </FormGroup>
              </Col>
              <Col >
                <FormGroup>
                  <Label for='operadora'>Operadora</Label>
                  <Input type='text' id='operadora' onChange={e => this.operadora = e.target.value}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for='numero'>Numero do Aparelho</Label>
                  <Input type='text' id='numero' onChange={e => this.numero = e.target.value}></Input>
                </FormGroup>
              </Col>
              <Col >
                <FormGroup>
                  <Label for='imei'>Imei</Label>
                  <Input type='text' id='imei' onChange={e => this.imei = e.target.value}></Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
         <Button color="primary" onClick={toggle}>Cadastrar</Button>
         <Button color="secondary" onClick={() => {props.executar()}}>Sair</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalNovoAparelho;
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import deleteicon from "../../assets/delete.png";

export default function ModalApagar(props) {
  const { executar } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <button className="buttonTable" onClick={toggle}>
        <img src={deleteicon} alt="deleteIcon" height="28px" />
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Apagar Aparelho</ModalHeader>
        <ModalBody>
          <p>Tem certeza que você deseja excluir este aparelho?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={executar}>
            Apagar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Voltar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

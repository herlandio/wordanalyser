import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { ItemInputProps } from "../types/components/ItemInputProps";

const ItemInput: React.FC<ItemInputProps> = ({ addRootNode }) => {
  const [rootName, setRootName] = useState<string>("");

  const handleAddRoot = () => {
    if (rootName.trim()) {
      addRootNode(rootName);
      setRootName("");
    }
  };

  return (
    <Form className="my-3">
      <Row>
        <Col>
          <Form.Control
            type="text"
            value={rootName}
            placeholder="Novo Item"
            onChange={(e) => setRootName(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddRoot}>
            Adicionar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ItemInput;
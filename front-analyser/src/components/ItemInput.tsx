import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ItemInputProps } from '../interfaces/components/ItemInputProps';

const ItemInput: React.FC<ItemInputProps> = ({ newItem, setNewItem, addItem }) => (
  <Form>
    <Form.Group as={Row} className="align-items-center mb-3">
      <Form.Label column sm="2">
        Item:
      </Form.Label>
      <Col sm="8">
        <Form.Control
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Digite o item"
        />
      </Col>
      <Col sm="2">
        <Button variant="primary" onClick={addItem}>
          Adicionar
        </Button>
      </Col>
    </Form.Group>
  </Form>
);

export default ItemInput;

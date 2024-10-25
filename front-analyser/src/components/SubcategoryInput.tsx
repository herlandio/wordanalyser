import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { SubcategoryInputProps } from '../interfaces/components/SubcategoryInputProps';

const SubcategoryInput: React.FC<SubcategoryInputProps> = ({ newSubcategory, setNewSubcategory, addSubcategory }) => (
  <Form>
    <Form.Group as={Row} className="align-items-center mb-3">
      <Form.Label column sm="2">
        Subcategoria:
      </Form.Label>
      <Col sm="8">
        <Form.Control
          type="text"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          placeholder="Digite a subcategoria"
        />
      </Col>
      <Col sm="2">
        <Button variant="primary" onClick={addSubcategory}>
          Adicionar
        </Button>
      </Col>
    </Form.Group>
  </Form>
);

export default SubcategoryInput;

import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { CategoryInputProps } from '../interfaces/components/CategoryInputProps';

const CategoryInput: React.FC<CategoryInputProps> = ({ newCategory, setNewCategory, addCategory }) => (
  <Container>
    <Row className="justify-content-center">
      <Col md={12}>
        <Form>
          <Form.Group controlId="formCategory">
            <Form.Label>Nova Categoria:</Form.Label>
            <Form.Control
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Digite a nova categoria"
            />
          </Form.Group>
          <div className="d-flex mt-3">
            <Button variant="primary" onClick={addCategory}>
              Salvar Categoria
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default CategoryInput;

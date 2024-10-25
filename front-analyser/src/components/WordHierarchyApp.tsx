import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import CategoryInput from './CategoryInput';
import SubcategoryInput from './SubcategoryInput';
import ItemInput from './ItemInput';
import HierarchyList from './HierarchyList';
import useWordHierarchy from '../hooks/useWordHierarchy';
import { saveToJsonFile } from '../services/hierarchyService';

const WordHierarchyApp: React.FC = () => {
  const {
    hierarchy,
    newCategory,
    setNewCategory,
    currentCategory,
    newSubcategory,
    setNewSubcategory,
    newItem,
    setNewItem,
    addCategory,
    addSubcategory,
    addItem,
  } = useWordHierarchy();

  return (
    <Container className="py-4" style={{ height: '100vh' }}>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <h1 className="text-center">Hierarquia de Palavras</h1>
          
          <Card className="p-3 mb-3">
            <CategoryInput 
              newCategory={newCategory} 
              setNewCategory={setNewCategory} 
              addCategory={addCategory} 
            />
          </Card>

          {currentCategory && (
            <Card className="p-3 mb-3">
              <h3 className="text-center">Adicionar Subcategoria para: {currentCategory}</h3>
              <SubcategoryInput 
                newSubcategory={newSubcategory} 
                setNewSubcategory={setNewSubcategory} 
                addSubcategory={addSubcategory} 
              />
              <ItemInput 
                newItem={newItem} 
                setNewItem={setNewItem} 
                addItem={addItem} 
              />
            </Card>
          )}

          <Card className="p-3 mb-3" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <h2 className="text-center">Hierarquia Visual</h2>
            <HierarchyList hierarchy={hierarchy} />
          </Card>

          <Button 
            variant="primary" 
            onClick={() => saveToJsonFile(hierarchy)} 
            className="w-100 mb-4"
          >
            Salvar como JSON
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default WordHierarchyApp;

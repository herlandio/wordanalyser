import React from "react";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import HierarchyList from "./HierarchyList";
import ItemInput from "./ItemInput";
import useWordHierarchy from "../hooks/useWordHierarchy";
import { saveJsonToFile } from "../services/hierarchyService";
import { WordHierarchy } from "../types/hooks/WordHierarchy";
import TreeView from "./TreeView";
import { TreeNode } from "../types/components/TreeViewProps";

const WordHierarchyApp: React.FC = () => {
  const { nodes, addRootNode, addChildNode, removeNode, convertTreeToObject } = useWordHierarchy();

  const handleSaveJson = async () => {
    const treeObject = convertTreeToObject(nodes);
    await saveJsonToFile(treeObject);
  };

  const convertToTreeNode = (data: WordHierarchy[]): TreeNode[] => {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      children: convertToTreeNode(item.children)
    }));
  };

  return (
    <Container className="mt-4" style={{ height: '85vh' }}>
      <Row className="justify-content-center">
        <Col className="bg-light p-4 rounded" md={8}>
          <h2>Criar árvore</h2>
          <ItemInput addRootNode={addRootNode} />
          {
            nodes.map((node) => (
              <HierarchyList key={node.id} node={node} addChildNode={addChildNode} removeNode={removeNode} />
            ))
          }
            <Card className="mt-4">
              <Card.Body>
              <h5>{!nodes.length ? "Sua árvore esta vazia, crie uma!" : "Sua árvore"}</h5>
              {
                nodes.length > 0 && (
                  <TreeView data={convertToTreeNode(nodes)} />      
                )
              }
                <Button onClick={handleSaveJson} className="mt-2" variant="primary" disabled={!nodes.length}>
                  Salvar JSON
                </Button>
              </Card.Body> 
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

export default WordHierarchyApp;

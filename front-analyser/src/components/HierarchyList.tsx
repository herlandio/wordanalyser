import React, { useState } from "react";
import { Button, Row, Col, Form, InputGroup, Card } from "react-bootstrap";
import { HierarchyListProps } from "../types/components/HierarchyListProps";

const HierarchyList: React.FC<HierarchyListProps> = ({ node, addChildNode, removeNode }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [newChildName, setNewChildName] = useState<string>("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddChild = () => {
    if (newChildName.trim()) {
      addChildNode(node, newChildName);
      setNewChildName("");
      setIsExpanded(true);
    }
  };

  const handleRemoveNode = () => {
    removeNode(node);
  };

  return (
    <Card className="my-2" style={{ marginLeft: 20 }}>
      <Card.Body>
        <Row>
          <Col xs="auto">
            <Button variant="secondary" onClick={toggleExpand} size="sm">
              {isExpanded ? "Fechar" : "Criar"}
            </Button>
          </Col>
          <Col><strong>{node.name}</strong></Col>
          <Col className="text-end">
            <Button variant="danger" onClick={handleRemoveNode} size="sm" style={{ marginLeft: 10 }}>
              Remover
            </Button>
          </Col>
        </Row>
        {isExpanded && (
          <>
            <InputGroup className="my-2">
              <Form.Control
                type="text"
                value={newChildName}
                placeholder="Novo Item"
                onChange={(e) => setNewChildName(e.target.value)}
              />
              <Button variant="primary" onClick={handleAddChild}>
                Adicionar
              </Button>
            </InputGroup>
            <div className="ml-3">
              {node.children.map((child) => (
                <HierarchyList 
                  key={child.id} 
                  node={child} 
                  addChildNode={addChildNode} 
                  removeNode={removeNode} 
                />
              ))}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default HierarchyList;

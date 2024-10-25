import React from 'react';
import { ListGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { HierarchyListProps } from '../interfaces/components/HierarchyListProps';

const HierarchyList: React.FC<HierarchyListProps> = ({ hierarchy }) => {
  const renderHierarchy = (hierarchy: any) => {
    return Object.keys(hierarchy).map((categoryKey) => (
      <ListGroup.Item key={categoryKey}>
        <Card className="mb-3">
          <Card.Header as="h5">{categoryKey}</Card.Header>
          <ListGroup variant="flush">
            {Object.keys(hierarchy[categoryKey]).map((subcategoryKey) => (
              <ListGroup.Item key={subcategoryKey}>
                <strong>{subcategoryKey}</strong>
                <ListGroup className="mt-2">
                  {(hierarchy[categoryKey][subcategoryKey] as string[]).map((item, index) => (
                    <ListGroup.Item key={index}>{item}</ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </ListGroup.Item>
    ));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <ListGroup>{renderHierarchy(hierarchy)}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default HierarchyList;

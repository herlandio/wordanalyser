import { useState } from "react";
import { WordHierarchy } from "../types/hooks/WordHierarchy";

const useWordHierarchy = () => {
  const [nodes, setNodes] = useState<WordHierarchy[]>([]);

  const addRootNode = (rootName: string) => {
    const rootExists = nodes.some(node => node.name === rootName);
    
    if (rootExists) {
      alert(`O nó raiz "${rootName}" já existe!`);
      return;
    }

    const newRoot: WordHierarchy = {
      id: `root-${nodes.length + 1}`,
      name: rootName,
      children: []
    };
    setNodes((prevNodes) => [...prevNodes, newRoot]);
  };

  const addChildNode = (parentNode: WordHierarchy, childName: string) => {
    const childExists = parentNode.children.some(child => child.name === childName);
    
    if (childExists) {
      alert(`O nó "${childName}" já existe como filho de "${parentNode.name}"!`);
      return;
    }

    const newChild: WordHierarchy = {
      id: `${parentNode.id}-${parentNode.children.length + 1}`,
      name: childName,
      children: []
    };

    const addNodeRecursively = (node: WordHierarchy): WordHierarchy => {
      if (node.id === parentNode.id) {
        return { ...node, children: [...node.children, newChild] };
      }
      return {
        ...node,
        children: node.children.map(addNodeRecursively)
      };
    };

    setNodes((prevNodes) => prevNodes.map(addNodeRecursively));
  };

  const removeNode = (nodeToRemove: WordHierarchy) => {
    const removeNodeRecursively = (nodes: WordHierarchy[]): WordHierarchy[] => {
      return nodes
        .filter(node => node.id !== nodeToRemove.id)
        .map(node => ({
          ...node,
          children: removeNodeRecursively(node.children),
        }));
    };
  
    setNodes((prevNodes) => removeNodeRecursively(prevNodes));
  };

  const convertTreeToObject = (nodes: WordHierarchy[]): any => {
    const result: any = {};
    nodes.forEach((node) => {
      if (node.children.length > 0) {
        if (node.children.every((child) => child.children.length === 0)) {
          result[node.name] = node.children.map((child) => child.name);
        } else {
          result[node.name] = convertTreeToObject(node.children);
        }
      }
    });
    return result;
  };

  return {
    nodes,
    addRootNode,
    addChildNode,
    removeNode,
    convertTreeToObject
  };
};

export default useWordHierarchy;

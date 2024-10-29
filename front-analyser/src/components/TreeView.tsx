import React from 'react';
import { TreeViewProps } from '../types/components/TreeViewProps';

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  return (
    <ul>
      {data.map((node, index) => (
        <li key={index}>
          {node.name}
          {node.children.length > 0 && (
            <TreeView data={node.children} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TreeView;

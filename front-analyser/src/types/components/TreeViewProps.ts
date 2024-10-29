export interface TreeNode {
    id: string;
    name: string;
    children: TreeNode[];
}

export interface TreeViewProps {
    data: TreeNode[];
}
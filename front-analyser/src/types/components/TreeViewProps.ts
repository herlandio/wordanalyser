export interface TreeNode {
    name: string;
    children: TreeNode[];
}

export interface TreeViewProps {
    data: TreeNode[];
}
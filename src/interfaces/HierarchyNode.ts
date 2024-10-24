export interface HierarchyNode {
    [key: string]: string[] | HierarchyNode;
}
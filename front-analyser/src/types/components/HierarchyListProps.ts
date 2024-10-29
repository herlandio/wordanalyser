import { WordHierarchy } from "../hooks/WordHierarchy";

export interface HierarchyListProps {
    node: WordHierarchy;
    addChildNode: (parentNode: WordHierarchy, childName: string) => void;
    removeNode: (node: WordHierarchy) => void;
}
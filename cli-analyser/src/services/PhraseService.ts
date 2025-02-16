import { HierarchyRepository } from '../repositories/HierarchyRepository'; 
import { HierarchyNode } from '../interfaces/HierarchyNode';

export class PhraseService {
    private repository: HierarchyRepository;
    private hierarchy: HierarchyNode;

    constructor() {
        this.repository = new HierarchyRepository();
        this.hierarchy = this.repository.loadHierarchies();
    }

    public analyzePhrase(phrase: string, depth: number): Record<string, number> {
        const wordCount: Record<string, number> = {};
        const wordsInPhrase = phrase.toLowerCase().split(/\s+/);
        const keyMap: Record<string, string> = {};
    
        const buildKeyMap = (node: HierarchyNode, parentKey: string | null = null, currentDepth: number = 0): void => {
            if (currentDepth >= depth) return;
            for (const key in node) {
                if (Array.isArray(node[key])) {
                    node[key].forEach(word => {
                        keyMap[word.toLowerCase()] = parentKey || key;
                    });
                } else if (typeof node[key] === 'object') {
                    buildKeyMap(node[key] as HierarchyNode, key, currentDepth + 1);
                }
            }
        };
    
        buildKeyMap(this.hierarchy);
    
        wordsInPhrase.forEach(word => {
            const lowerCaseWord = word.toLowerCase();
            if (keyMap[lowerCaseWord]) {
                const category = keyMap[lowerCaseWord];
                if (category) {
                    wordCount[category] = (wordCount[category] || 0) + 1;
                }
            }
        });

        return wordCount;
    }
}

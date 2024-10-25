import { readFileSync } from 'fs';
import * as path from 'path';

export class HierarchyRepository {
    private filePath: string;

    constructor() {
        this.filePath = path.join(__dirname, '..', '..', 'dicts', 'words.json');
    }

    public loadHierarchy(): any {
        const data = readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
}

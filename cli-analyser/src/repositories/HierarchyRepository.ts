import path from 'path';
import fs from 'fs';
import { readFileSync } from 'fs';

export class HierarchyRepository {
    private directoryPath: string;

    constructor() {
        this.directoryPath = path.join(__dirname, '..', '..', 'dicts');
    }

    public loadHierarchies(): any[] {
        const files = fs.readdirSync(this.directoryPath);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        return jsonFiles.map(file => {
            const filePath = path.join(this.directoryPath, file);
            const data = readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        });
    }
}

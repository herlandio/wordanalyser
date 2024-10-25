import { HierarchyRepository } from '../../src/repositories/HierarchyRepository';
import * as fs from 'fs';

describe('HierarchyRepository', () => {
    let repository: HierarchyRepository;

    beforeEach(() => {
        repository = new HierarchyRepository();
    });

    it('should load hierarchy from file', () => {
        const mockData = [
            {
                hierarchy: [
                    { name: 'root', children: [{ name: 'child1' }, { name: 'child2' }] }
                ]
            }
        ];
    
        jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockData[0])); // Return the first element
    
        const result = repository.loadHierarchies();
    
        expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('words.json'), 'utf-8');
        expect(result).toEqual(mockData); // Compare with the adjusted structure
    
        (fs.readFileSync as jest.Mock).mockRestore();
    });
    
});
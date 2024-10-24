import { PhraseService } from '../src/services/PhraseService';
import { HierarchyRepository } from '../src/repositories/HierarchyRepository';
import { HierarchyNode } from '../src/interfaces/HierarchyNode';

describe('PhraseService', () => {
    let phraseService: PhraseService;
    const mockHierarchy: HierarchyNode = {
        animal: ['dog', 'cat', 'fish', 'bird'],
        plant: ['tree', 'flower', 'bush'],
    };

    beforeEach(() => {
        const hierarchyRepositorySpy = jest.spyOn(HierarchyRepository.prototype, 'loadHierarchy');
        hierarchyRepositorySpy.mockReturnValue(mockHierarchy);
        phraseService = new PhraseService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return correct word count by category', () => {
        const phrase = 'The dog and the cat climbed a tree and a flower';
        const expectedResult = {
            animal: 2,
            plant: 2,
        };
    
        const result = phraseService.analyzePhrase(phrase);
    
        expect(result).toEqual(expectedResult);
    });

    test('should return an empty object for a phrase with no matching words', () => {
        const phrase = 'There are no matches here';
        const expectedResult = {};

        const result = phraseService.analyzePhrase(phrase);

        expect(result).toEqual(expectedResult);
    });

    test('should handle an empty phrase', () => {
        const phrase = '';
        const expectedResult = {};

        const result = phraseService.analyzePhrase(phrase);

        expect(result).toEqual(expectedResult);
    });

    test('should handle case insensitivity', () => {
        const phrase = 'The DOG and the cat';
        const expectedResult = {
            animal: 2,
        };

        const result = phraseService.analyzePhrase(phrase);

        expect(result).toEqual(expectedResult);
    });

    test('should analyze a text of 5000 words correctly', () => {
        const words: string[] = [];
    
        const animals: string[] = mockHierarchy.animal as string[];
        const plants: string[] = mockHierarchy.plant as string[];
    
        for (let i = 0; i < 5000; i++) {
            if (i % 2 === 0) {
                const animalWord = animals[i % animals.length];
                words.push(animalWord);
            } else {
                const plantWord = plants[i % plants.length];
                words.push(plantWord);
            }
        }
    
        const longText = words.join(' ');
    
        const expectedResult: Record<string, number> = {
            animal: 2500,
            plant: 2500,
        };
    
        const result = phraseService.analyzePhrase(longText);
    
        expect(result).toEqual(expectedResult);
    });
    
});

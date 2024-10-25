import { PhraseController } from '../../src/controllers/PhraseController';
import { PhraseService } from '../../src/services/PhraseService';
import { ConsoleView } from '../../src/views/ConsoleView';

describe('PhraseController', () => {
    let controller: PhraseController;
    let phraseService: PhraseService;
    let consoleView: ConsoleView;

    beforeEach(() => {
        phraseService = new PhraseService();
        consoleView = new ConsoleView();
        controller = new PhraseController();
        
        jest.spyOn(phraseService, 'analyzePhrase').mockReturnValue({animal: 3});
        jest.spyOn(consoleView, 'displayResults').mockImplementation(() => {});
        
        controller['service'] = phraseService;
        controller['view'] = consoleView;
    });

    it('should display results when runCLI is called with valid arguments', () => {
        const args = ['--depth', '2', 'Hello World'];
    
        controller.runCLI(args);
    
        expect(phraseService.analyzePhrase).toHaveBeenCalledWith('Hello World', 2);
        expect(consoleView.displayResults).toHaveBeenCalledWith({ animal: 3 }, false, expect.any(Number), expect.any(Number));
    });
    

    it('should throw an error if the usage is invalid', () => {
        const args = ['--depth', '2'];
    
        expect(() => controller.runCLI(args)).toThrow("Invalid usage");
    });

    it('should handle verbose output correctly', () => {
        const args = ['--depth', '2', 'Hello World', '--verbose'];

        controller.runCLI(args);

        expect(consoleView.displayResults).toHaveBeenCalledWith({animal: 3}, true, expect.any(Number), expect.any(Number));
    });
});
import { ConsoleView } from '../../src/views/ConsoleView';

describe('ConsoleView', () => {
    let consoleView: ConsoleView;

    beforeEach(() => {
        consoleView = new ConsoleView();
        jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display word counts correctly', () => {
        const wordCount = { hello: 2, world: 3 };
        const verbose = false;
        const loadTime = 150;
        const analyzeTime = 300;

        consoleView.displayResults(wordCount, verbose, loadTime, analyzeTime);

        expect(console.log).toHaveBeenCalledWith('hello = 2');
        expect(console.log).toHaveBeenCalledWith('world = 3');
        expect(console.log).not.toHaveBeenCalledWith(0);
    });

    it('should display 0 when wordCount is empty', () => {
        const wordCount: Record<string, number> = {};
        const verbose = false;
        const loadTime = 150;
        const analyzeTime = 300;

        consoleView.displayResults(wordCount, verbose, loadTime, analyzeTime);

        expect(console.log).toHaveBeenCalledWith(0);
    });

    it('should display load and analyze times when verbose is true', () => {
        const wordCount = { hello: 2 };
        const verbose = true;
        const loadTime = 150.12345;
        const analyzeTime = 300.67890;

        consoleView.displayResults(wordCount, verbose, loadTime, analyzeTime);

        expect(console.log).toHaveBeenCalledWith('hello = 2');
        expect(console.log).toHaveBeenCalledWith('\nTempo de carregamento dos parâmetros: 150.12ms');
        expect(console.log).toHaveBeenCalledWith('Tempo de verificação da frase: 300.68ms');
    });

    it('should not display load and analyze times when verbose is false', () => {
        const wordCount = { hello: 2 };
        const verbose = false;
        const loadTime = 150;
        const analyzeTime = 300;

        consoleView.displayResults(wordCount, verbose, loadTime, analyzeTime);

        expect(console.log).toHaveBeenCalledWith('hello = 2');
        expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('Tempo de carregamento dos parâmetros'));
        expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('Tempo de verificação da frase'));
    });
});

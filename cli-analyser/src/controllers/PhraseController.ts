import { PhraseService } from '../services/PhraseService';
import { ConsoleView } from '../views/ConsoleView';
import { performance } from 'perf_hooks';

export class PhraseController {
    private service: PhraseService;
    private view: ConsoleView;

    constructor() {
        this.service = new PhraseService();
        this.view = new ConsoleView();
    }

    public runCLI(args: string[]): void {
        const depthIndex = args.indexOf('--depth');
        const verbose = args.includes('--verbose');
        
        const depth = depthIndex !== -1 && !isNaN(Number(args[depthIndex + 1])) 
            ? Number(args[depthIndex + 1]) 
            : 1;

        const phrase = args.slice(depthIndex + 2).join(' ');

        if (depthIndex === -1 || !phrase) {
            console.error("Usage: bun run cli.ts analyze --depth <n> \"{phrase}\" [--verbose]");
            throw new Error("Invalid usage");
        }

        const startLoadTime = performance.now();
        const endLoadTime = performance.now();

        const startAnalyzeTime = performance.now();
        const wordCount = this.service.analyzePhrase(phrase, depth);
        const endAnalyzeTime = performance.now();

        this.view.displayResults(wordCount, verbose, endLoadTime - startLoadTime, endAnalyzeTime - startAnalyzeTime);
    }
}

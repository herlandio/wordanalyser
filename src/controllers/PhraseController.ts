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
        const phrase = args.filter(arg => !arg.startsWith('--')).slice(-1)[0];

        if (depthIndex === -1 || !phrase) {
            console.error("Usage: bun run cli.ts analyze --depth <n> \"{phrase}\" [--verbose]");
            process.exit(1);
        }

        const depth = parseInt(args[depthIndex + 1], 10);

        const startLoadTime = performance.now();
        // O modelo já carrega os dados no construtor do serviço
        const endLoadTime = performance.now();

        const startAnalyzeTime = performance.now();
        const wordCount = this.service.analyzePhrase(phrase);
        const endAnalyzeTime = performance.now();

        this.view.displayResults(wordCount, verbose, endLoadTime - startLoadTime, endAnalyzeTime - startAnalyzeTime);
    }
}

export class ConsoleView {
    public displayResults(wordCount: Record<string, number>, verbose: boolean, loadTime: number, analyzeTime: number): void {
        if (Object.keys(wordCount).length > 0) {
            for (const [word, count] of Object.entries(wordCount)) {
                console.log(`${word} = ${count}`);
            }
        } else {
            console.log(0);
        }

        if (verbose) {
            console.log(`\nTempo de carregamento dos parâmetros: ${loadTime.toFixed(2)}ms`);
            console.log(`Tempo de verificação da frase: ${analyzeTime.toFixed(2)}ms`);
        }
    }
}

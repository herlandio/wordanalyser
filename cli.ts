import { readFileSync } from 'fs';
import * as path from 'path';
import { performance } from 'perf_hooks';

interface HierarchyNode {
    [key: string]: HierarchyNode | string[];
}

function loadHierarchy(): HierarchyNode {
    const filePath = path.join(__dirname, 'dicts', 'words.json');
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as HierarchyNode;
}

function analyzePhrase(hierarchy: HierarchyNode, phrase: string, depth: number): Record<string, number> {
    const wordCount: Record<string, number> = {};
    const wordsInPhrase = phrase.toLowerCase().split(/\s+/);
    const keyMap: Record<string, string> = {};

    const buildKeyMap = (node: HierarchyNode, currentDepth: number, parentKey: string | null = null): void => {
        for (const key in node) {
            if (Array.isArray(node[key])) {
                node[key].forEach(word => {
                    keyMap[word.toLowerCase()] = parentKey || key;
                });
            } else if (typeof node[key] === 'object') {
                buildKeyMap(node[key] as HierarchyNode, currentDepth + 1, key);
            }
        }
    };

    buildKeyMap(hierarchy, 1);

    wordsInPhrase.forEach(word => {
        const lowerCaseWord = word.toLowerCase();
        if (keyMap[lowerCaseWord]) {
            const category = keyMap[lowerCaseWord];
            wordCount[category] = (wordCount[category] || 0) + 1;
        }
    });

    return wordCount;
}

function runCLI(): void {
    const args = process.argv.slice(2);
    const depthIndex = args.indexOf('--depth');
    const verbose = args.includes('--verbose');
    const phrase = args.filter(arg => !arg.startsWith('--')).slice(-1)[0];

    if (depthIndex === -1 || !phrase) {
        console.error("Usage: bun run cli.ts analyze --depth <n> \"{phrase}\" [--verbose]");
        process.exit(1);
    }

    const depth = parseInt(args[depthIndex + 1], 10);
    
    const startLoadTime = performance.now();
    const hierarchy = loadHierarchy();
    const endLoadTime = performance.now();

    const startAnalyzeTime = performance.now();
    const wordCount = analyzePhrase(hierarchy, phrase, depth);
    const endAnalyzeTime = performance.now();

    if (Object.keys(wordCount).length > 0) {
        for (const [word, count] of Object.entries(wordCount)) {
            console.log(`${word} = ${count}`);
        }
    } else {
        console.log(0);
    }

    if (verbose) {
        console.log(`\nTempo de carregamento dos parâmetros: ${(endLoadTime - startLoadTime).toFixed(2)}ms`);
        console.log(`Tempo de verificação da frase: ${(endAnalyzeTime - startAnalyzeTime).toFixed(2)}ms`);
    }
}

runCLI();

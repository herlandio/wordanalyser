import { PhraseController } from './controllers/PhraseController';

function main() {
    const args = process.argv.slice(2);
    const controller = new PhraseController();
    controller.runCLI(args);
}

main();

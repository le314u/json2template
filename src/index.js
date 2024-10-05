const fs = require('fs');
const { Liquid } = require('liquidjs');

if (process.argv < 4) {
    console.error('Uso: node index.js <nome> <idade>');
    process.exit(1);
}

const pathTemplate = process.argv[2]
const pathJson = process.argv[3]

const engine = new Liquid();



try {
  // Lendo um arquivo de forma síncrona
  const template = fs.readFileSync(pathTemplate, 'utf-8');
  const dataRAW = fs.readFileSync(pathJson, 'utf-8');
  const data = JSON.parse(dataRAW)
  engine.parseAndRender(template, data)
  .then(console.log) // Saída: Olá, Mundo!
  .catch(console.error);
} catch (err) {
  // Tratando erros ao ler o arquivo
  console.error('Erro ao ler o arquivo:', err);
}
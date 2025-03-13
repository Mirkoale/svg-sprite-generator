import { parse } from 'svgson';
import { readFile, writeFile } from 'fs/promises';
const fileSvg = './svg-def.svg';
const iconsOutputJson = './icons.json';

async function convertSVGtoJSON(inputFilePath, outputFilePath) {
    try {
      // Legge il file SVG come stringa
      const svgString = await readFile(inputFilePath, 'utf8');
      
      // Converte l'SVG in JSON
      const svgJSON = await parse(svgString);
  
      // Salva il JSON su file
      await writeFile(outputFilePath, JSON.stringify(svgJSON, null, 2), 'utf8');
  
      console.log(`Conversione completata! JSON salvato in: ${outputFilePath}`);
    } catch (error) {
      console.error('Errore nella conversione:', error);
    }
  }
  
  // Esegui la funzione
  convertSVGtoJSON(fileSvg, iconsOutputJson);
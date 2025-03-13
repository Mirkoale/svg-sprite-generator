const fs = require("fs");
const path = require("path");
const folder = "./asset";
const svgFileName = "svg-def.svg"

const header = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><style>g{display:none}g g{display:block}g:target{display:block}</style>';
let content = [];
const footer = "</svg>";

// estraggo il tag path
function pathExtractor(svgString) {
    const regex = /<path[\s\S]*?\/>|<path[\s\S]*?<\/path>/g; // RegExp per catturare i tag <path> completi

    return svgString.match(regex) || []; // Restituisce un array di corrispondenze o un array vuoto
}

// Funzione per leggere un singolo file SVG e restituire il contenuto processato
function readSvgFile(filePath, fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return reject(err);
            }
            let singleContent = pathExtractor(data).join("").replace('fill="black"', '');
            let idName = fileName.replace('icons8-', '');
            
            let groupString = `<g id="${idName}">` + singleContent + `</g>`;
            resolve(groupString);
        });
    });
}

fs.readdir(folder, (err, files) => {
    if (err) {
        console.error("Errore nella lettura della cartella:", err);
        return;
    }

    // Crea un array di Promesse per leggere tutti i file SVG
    const filePromises = files.map((file) => {
        const filePath = path.join(folder, file);
        const fileName = file.replace('.svg', '');
        
        return new Promise((resolve, reject) => {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return reject(err);
                }

                if (stats.isFile()) {
                    readSvgFile(filePath, fileName).then(resolve).catch(reject);
                } else {
                    resolve(); // Se è una cartella, ignoriamo
                }
            });
        });
    });

    // Usa Promise.all per aspettare che tutte le promesse siano risolte
    Promise.all(filePromises).then((results) => {
        // Aggiungi tutti i risultati all'array content
        content = results.filter(Boolean);  // Rimuovi eventuali valori nulli/undefined
        let newSvg = header + content.join("") + footer;

        // Scrivere il file modificato
        fs.writeFile(svgFileName, newSvg, "utf8", (err) => {
            if (err) {
                console.error("Errore nella scrittura del file:", err);
                return;
            }
            console.log(`Creato nuovo Sprite SVG! File salvato come 'svg-def.svg' contiene ${content.length} elementi`);
            console.log("'(\\__/)")
            console.log("(=’.’=)   I <3 U")
            console.log("(“)_(“)")
            console.log(" ")
            console.log("╭∩╮（︶_︶）╭∩╮")
        });
    }).catch((error) => {
        console.error("Errore durante la lettura dei file:", error);
    });
});
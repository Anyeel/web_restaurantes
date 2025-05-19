import {menu} from './menu.js';
import nunjucks from 'nunjucks';
import fs from 'fs';

function generateHTML(template, data) {
    const templateContent = fs.readFileSync(template, 'utf-8');
    const html = nunjucks.renderString(templateContent, data);
    return html;
}
function createHTMLFile(template, data, outputFile) {
    const html = generateHTML(template, data);
    fs.writeFileSync(outputFile, html, 'utf-8');
    console.log(`Archivo ${outputFile} generado con éxito.`);
}

if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}
const menuTemplate = './views/menu.njk';
nunjucks.configure("views",{ autoescape: true });

createHTMLFile(menuTemplate, { menu }, './dist/index.html');


const cssFile = 'style.css';
const outputCssFile = './dist/style.css';
fs.copyFileSync(cssFile, outputCssFile);
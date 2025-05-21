import { menu } from './menu.js'
import nunjucks from 'nunjucks'
import fs from 'fs'

function generateHTML (template, data) {
  const templateContent = fs.readFileSync(template, 'utf-8')
  const html = nunjucks.renderString(templateContent, data)
  return html
}
function createHTMLFile (template, data, outputFile) {
  const html = generateHTML(template, data)
  fs.writeFileSync(outputFile, html, 'utf-8')
  console.log(`Archivo ${outputFile} generado con éxito.`)
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}
const menuTemplate = './views/menu.njk'
const locationTemplate = './views/location.njk'
const aboutTemplate = './views/about.njk' 
nunjucks.configure('views', { autoescape: true })


createHTMLFile(aboutTemplate, {}, './dist/about.html') 
createHTMLFile(menuTemplate, { menu }, './dist/index.html')
createHTMLFile(locationTemplate, {}, './dist/location.html')

const imgsFolder = './imgs'
const outputImgsFolder = './dist/imgs'
const imgFiles = fs.readdirSync(imgsFolder)
if (!fs.existsSync(outputImgsFolder)) {
  fs.mkdirSync(outputImgsFolder)
}
imgFiles.forEach(file => {
  const srcPath = `${imgsFolder}/${file}`
  const destPath = `${outputImgsFolder}/${file}`
  fs.copyFileSync(srcPath, destPath)
  console.log(`Archivo ${file} copiado a ${outputImgsFolder}.`)
})

const cssFile = 'style.css'
const outputCssFile = './dist/style.css'
fs.copyFileSync(cssFile, outputCssFile)

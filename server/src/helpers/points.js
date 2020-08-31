import fs from 'fs'
import path from 'path'
import convert from 'xml-js'

var xmlFile = fs.readFileSync(path.join(__dirname, '../config/points.kml'), 'utf8');

const fetchPoints = () => {
    // parse xml file as a json object
    const jsonData = JSON.parse(convert.xml2json(xmlFile, { compact: true, spaces: 2 }));
    return jsonData
}

export default fetchPoints
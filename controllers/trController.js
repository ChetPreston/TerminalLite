const path = require('path')
const os = require('os')
const fs = require('fs')
const csv = require('csv-parser')
const {parse} = require('csv-parse');

const fold = 'C:/SVN/Configs_and_Batches/Test_Stand_Configs/'

module.exports.get_geex_fvc = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sec = req.params.fvc.toString();
    const start = req.params.start
    let results = [];
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/' + sec + '.csv')
    .pipe(parse({ delimiter: ",", from_line: start})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        results.push(row)
    })
    .on("end", function() {  
       // console.log(results);
        res.send(results)
    })
}

module.exports.get_geex_das = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sec = req.params.das.toString();
    let data = JSON.parse(fs.readFileSync('C:/SVN/Configs_and_Batches/Test_Stand_Configs/GEEx/system_configs/DAS/' + sec + '.json'))
    res.send(data);
}

module.exports.get_xeex_fvc = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sec = req.params.fvc.toString();
    const start = req.params.start
    let results = [];
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/' + sec + '.csv')
    .pipe(parse({ delimiter: ",", from_line: start})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        results.push(row)
    })
    .on("end", function() {  
       // console.log(results);
        res.send(results)
    })
}

module.exports.get_xeex_das = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sec = req.params.das.toString();
    let data = JSON.parse(fs.readFileSync(fold + 'XEEx/system_configs/DAS/' + sec + '.json'))
    res.send(data);
}
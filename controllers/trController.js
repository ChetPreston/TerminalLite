const path = require('path')
const os = require('os')
const fs = require('fs')
const csv = require('csv-parser')
const {parse} = require('csv-parse');
const Papa = require('papaparse')

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

module.exports.get_veex_das = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sec = req.params.das.toString();
    let data = JSON.parse(fs.readFileSync('C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs/DAS/' + sec + '.json'))
    res.send(data);
}

module.exports.get_veex_fvc = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sec = req.params.fvc.toString();
    const start = req.params.start
    let results = [];
    fs.createReadStream(fold + 'VEEx/system_configs/valve_controllers/' + sec + '.csv')
    .pipe(parse({ delimiter: ",", from_line: start})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        results.push(row)
    })
    .on("end", function() {  
       // console.log(results);
        res.send(results)
    })
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

module.exports.set_veex_fvc = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { sec, location, name } = req.body
    let start
    let results = [];
    start = location +1

   
    fs.createReadStream(fold + 'VEEx/system_configs/valve_controllers/' + sec + '.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        results.push(row)
    })
    .on("end", function() {  
        writeToCSVLine(results, fold + 'VEEx/system_configs/valve_controllers/' + sec + '.csv', name, start)
    //     // results[location][0] = name
    //    console.log(results);
        // res.send(results)
    })
}

module.exports.set_veex_fvcdo = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { sec, location, name } = req.body
    let start
    let results = [];
    if (sec.includes('FVC2')) start = location + 76
    else if (sec.includes('FVC1')) start = location + 103
    const filePath = fold + 'VEEx/system_configs/valve_controllers/' + sec + '.csv'
    const csvContent = fs.readFileSync(filePath, 'utf8');
    // console.log(start)
    // console.log(typeof csvContent);


   // Assume 'csvContent' holds the CSV file content
    confiG = { 
        delimiter: "", // Auto-detect delimiters
        newline: "",
        header: false,  // No header row
        dynamicTyping: true,  // Parse numerical values as numbers
        skipEmptyLines: true,  // Skip empty lines
        complete: function(results) {
        // 'results' will contain the parsed data
        // console.log(results.data[115]['FILEVERSION']);
        // Process the data as needed
        }
    }
    config2 = {
        quotes: false, //or array of booleans
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ",",
        header: false,
        newline: "\r\n",
        skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
        columns: null //or array of strings
    }
    woah = Papa.parse(csvContent, confiG);
    // console.log(woah.data)
    // console.log(woah.data[115]['FILEVERSION'])
    woah.data[start][0] = name
    heyo = Papa.unparse(woah, config2)
    fs.writeFileSync(filePath, heyo, 'utf8')
    // console.log(heyo)

  
        // results[location][0] = name
    res.send(woah.data)
}

module.exports.set_veex_das = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { sec, location, name } = req.body
    let data = JSON.parse(fs.readFileSync(fold + 'VEEx/system_configs/DAS/' + sec + '.json'))
    // console.log(data.TAGs[loc-1].Name)
    data.TAGs[location].Name = name;
    // data[loc]['Name'] = name
    fs.writeFileSync(fold + 'VEEx/system_configs/DAS/' + sec + '.json', JSON.stringify(data, null, 2), 'utf8')
    // console.log(data)

}

module.exports.set_geex_fvc = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { sec, location, name } = req.body
    let start
    let results = [];
    start = location +1

   
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/' + sec + '.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        results.push(row)
    })
    .on("end", function() {  
        writeToCSVLine(results, fold + 'GEEx/system_configs/valve_controllers/' + sec + '.csv', name, start)
    })
}

module.exports.set_geex_fvcdo = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { sec, location, name } = req.body
    let start
    let results = [];
    if (sec.includes('FVC4')) start = location + 77
    else if (sec.includes('BE-3')) start = location + 104
    else if (sec.includes('Facility')) start = location + 77
    const filePath = fold + 'GEEx/system_configs/valve_controllers/' + sec + '.csv'
    const csvContent = fs.readFileSync(filePath, 'utf8');
    confiG = { 
        delimiter: "", // Auto-detect delimiters
        newline: "",
        header: false,  // No header row
        dynamicTyping: true,  // Parse numerical values as numbers
        skipEmptyLines: true,  // Skip empty lines
        complete: function(results) {
        }
    }
    config2 = {
        quotes: false, //or array of booleans
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ",",
        header: false,
        newline: "\r\n",
        skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
        columns: null //or array of strings
    }
    woah = Papa.parse(csvContent, confiG);
    woah.data[start][0] = name
    heyo = Papa.unparse(woah, config2)
    fs.writeFileSync(filePath, heyo, 'utf8')
    res.send(woah.data)
}

module.exports.set_geex_das = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { sec, location, name } = req.body
    let data = JSON.parse(fs.readFileSync(fold + 'GEEx/system_configs/DAS/' + sec + '.json'))
    data.TAGs[location].Name = name;
    fs.writeFileSync(fold + 'GEEx/system_configs/DAS/' + sec + '.json', JSON.stringify(data, null, 2), 'utf8')
}

module.exports.search_veex = (req, res) => {
    let {search} = req.body
    search = search.toLowerCase()
    const das1 = JSON.parse(fs.readFileSync(fold + 'VEEx/system_configs/DAS/VEExDAS1.json'))
    const das2 = JSON.parse(fs.readFileSync(fold + 'VEEx/system_configs/DAS/VEExDAS2.json'))
    let searchResults = []
    console.log(search)
    for (let i=0; i<das1.TAGs.length; i++) {
        if (das1.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das1.TAGs[i],'DAS 1']) 
        }
    }
    for (let i=0; i<das2.TAGs.length; i++) {
        if (das2.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das2.TAGs[i],'DAS 2']) 
        }
    }
    fs.createReadStream(fold + 'VEEx/system_configs/valve_controllers/VEEX_FVC1_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 1'])
        }
    })
    .on("end", function() {  
        // console.log('one')
    })
    fs.createReadStream(fold + 'VEEx/system_configs/valve_controllers/VEEX_FVC2_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 2'])
        }
    })
    fs.createReadStream(fold + 'VEEx/system_configs/valve_controllers/VEEx_FVC1_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 105})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 1'])
        }
    })
    fs.createReadStream(fold + 'VEEx/system_configs/valve_controllers/VEEx_FVC2_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 77})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 2'])
        }
    })
    
    .on("end", function() {  
        // console.log(searchResults)
        // return searchResults
        // console.log('two')
    })
    toSend = {results: searchResults}
    setTimeout(function() {
        console.log(searchResults)
        res.send(toSend)
    }, 100)
}

module.exports.search_geex = (req, res) => {
    let {search} = req.body
    search = search.toLowerCase()
    const das1 = JSON.parse(fs.readFileSync(fold + 'GEEx/system_configs/DAS/GEExDAS1.json'))
    const das2 = JSON.parse(fs.readFileSync(fold + 'GEEx/system_configs/DAS/GEExDAS2.json'))
    const das3 = JSON.parse(fs.readFileSync(fold + 'GEEx/system_configs/DAS/GEExDAS2.json'))
    const das4 = JSON.parse(fs.readFileSync(fold + 'GEEx/system_configs/DAS/GEExDAS2.json'))
    const das5 = JSON.parse(fs.readFileSync(fold + 'GEEx/system_configs/DAS/GEExDAS2.json'))
    let searchResults = []
    console.log(search)
    for (let i=0; i<das1.TAGs.length; i++) {
        if (das1.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das1.TAGs[i],'DAS 1']) 
        }
    }
    for (let i=0; i<das2.TAGs.length; i++) {
        if (das2.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das2.TAGs[i],'DAS 2']) 
        }
    }
    for (let i=0; i<das3.TAGs.length; i++) {
        if (das2.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das3.TAGs[i],'DAS 3']) 
        }
    }
    for (let i=0; i<das2.TAGs.length; i++) {
        if (das4.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das4.TAGs[i],'DAS 4']) 
        }
    }
    for (let i=0; i<das5.TAGs.length; i++) {
        if (das2.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das5.TAGs[i],'DAS 5']) 
        }
    }
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/GEEX_FVC1_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 1'])
        }
    })
    .on("end", function() {  
        // console.log('one')
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/GEEX_FVC2_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 2'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/GEEX_FVC3_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 3'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/GEEX_FVC4_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 4'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/BE-3PM_Test_Article_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 105})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO BE-3PM'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/Facility_Valves_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 78})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO Facility'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/FVC4_Valves_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 78})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 4'])
        }
    })
    
    .on("end", function() {  
        // console.log(searchResults)
        // return searchResults
        // console.log('two')
    })
    toSend = {results: searchResults}
    setTimeout(function() {
        console.log(searchResults)
        res.send(toSend)
    }, 100)
}

module.exports.search_xeex = (req, res) => {
    let {search} = req.body
    search = search.toLowerCase()
    // const das1 = JSON.parse(fs.readFileSync(fold + 'XEEx/system_configs/DAS/XEExDAS1.json'))
    // const das2 = JSON.parse(fs.readFileSync(fold + 'XEEx/system_configs/DAS/XEExDAS2.json'))
    const das3 = JSON.parse(fs.readFileSync(fold + 'XEEx/system_configs/DAS/XEExDAS2.json'))
    const das4 = JSON.parse(fs.readFileSync(fold + 'XEEx/system_configs/DAS/XEExDAS2.json'))
    const das5 = JSON.parse(fs.readFileSync(fold + 'XEEx/system_configs/DAS/XEExDAS2.json'))
    let searchResults = []
    console.log(search)
    for (let i=0; i<das3.TAGs.length; i++) {
        if (das2.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das3.TAGs[i],'DAS 3']) 
        }
    }
    for (let i=0; i<das2.TAGs.length; i++) {
        if (das4.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das4.TAGs[i],'DAS 4']) 
        }
    }
    for (let i=0; i<das5.TAGs.length; i++) {
        if (das2.TAGs[i].Name.toLowerCase().includes(search)) {
            searchResults.push([das5.TAGs[i],'DAS 5']) 
        }
    }
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/XEEX_FVC1_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 1'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/XEEX_FVC2_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 2'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/XEEX_FVC3_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 3'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/XEEX_FVC4_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 4'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/XEEX_FVC5_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 5'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/XEEX_FVC6_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 6'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/XEEX_FVC7_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 1})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DI 7'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/BE-3PM_Test_Article_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 105})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO BE-3PM'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/Facility_Valves_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 78})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO Facility'])
        }
    })
    fs.createReadStream(fold + 'GEEx/system_configs/valve_controllers/FVC4_Valves_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 78})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 4'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/Sequencer_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 92})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO Sequencer'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/Facility_2_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 91})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO Facility 2'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/Facility_3_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 91})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO Facility 3'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/FVC4_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 91})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 4'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/FVC5_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 91})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 5'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/FVC6_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 91})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 6'])
        }
    })
    fs.createReadStream(fold + 'XEEx/system_configs/valve_controllers/FVC7_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 91})) //This might need to be custom per FVC per TS
    .on('data', function(row) {
        if (row[0].toLowerCase().includes(search)) {
        searchResults.push([row, 'FVC DO 7'])
        }
    })
    
    
    .on("end", function() {  
        // console.log(searchResults)
        // return searchResults
        // console.log('two')
    })
    toSend = {results: searchResults}
    setTimeout(function() {
        console.log(searchResults)
        res.send(toSend)
    }, 100)
}

function writeToCSVLine(lines, filePath, data, lineNumber) {
    // Step 1: Read the existing CSV file's content
    // let existingContent = fs.readFileSync(filePath, 'utf8');
    
    // // Step 2: Split the content into an array of lines
    // let lines = existingContent.split('\n');
    
    // Step 3: Replace the data starting at the chosen line number with the new data
    // for (let i = 0; i < data.length; i++) {
    //     lines[lineNumber - 1 + i][0] = data[i].join(',');
    // }
    console.log(lines[lineNumber][0])
    lines[lineNumber][0] = data
    console.log(lines[lineNumber][0])
    
    // Step 4: Combine the array back into a single CSV string
    let updatedContent = lines.join('\n');
    // Step 5: Write the updated CSV content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  }
  

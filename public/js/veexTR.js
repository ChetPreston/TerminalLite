// import { execPy } from '../JSON server/server'


const dispButton = document.getElementById("display-json")
const execPython = document.getElementById("exec-python")
const readIP = document.getElementById("read-ip")
const readName = document.getElementById("read-name")
const readChan = document.getElementById("read-chan")
const showVal = document.getElementById('show-val')
// Loading all of the das divs

const dasOne01 = document.getElementById("das-one01")
const dasOne02 = document.getElementById("das-one02")
const dasOne03 = document.getElementById("das-one03")
const dasOne04 = document.getElementById("das-one04")
const dasOne05 = document.getElementById("das-one05")
const dasOne11 = document.getElementById("das-one11")
const dasOne12 = document.getElementById("das-one12")
const dasOne13 = document.getElementById("das-one13")
const dasOne14 = document.getElementById("das-one14")
const dasTwo01 = document.getElementById("das-two01")
const dasTwo02 = document.getElementById("das-two02")
const dasTwo11 = document.getElementById("das-two11")
const dasTwo12 = document.getElementById("das-two12")
const fvcOne1 = document.getElementById('fvc-one1')
const fvcOne2 = document.getElementById('fvc-one2')
const fvcTwo1 = document.getElementById('fvc-two1')
const fvcTwo2 = document.getElementById('fvc-two2')
const fvcOneDI1 = document.getElementById('fvc-one1di')
const fvcOneDI2 = document.getElementById('fvc-one2di')
const fvcOneDI3 = document.getElementById('fvc-one3di')
const fvcOneDI4 = document.getElementById('fvc-one4di')
const fvcTwoDI1 = document.getElementById('fvc-two1di')
const fvcTwoDI2 = document.getElementById('fvc-two2di')
const fvcTwoDI3 = document.getElementById('fvc-two3di')
const fvcTwoDI4 = document.getElementById('fvc-two4di')



let jsonData;
das1()
das2()
fvc1()
fvc2()
fvcDI1()
fvcDI2()


// This will grab and display an object stored on the server (no file)
function das1() { 
    return getReq(`api/tr/veex/das1`).then((data) => {
        jsonData = data.TAGs;
        // dasOne01.innerHTML = 'DAS1 6150 C1 '
        // dasOne02.innerHTML = 'DAS1 6150 C2 '
        // dasOne03.innerHTML = 'DAS1 6150 C3 '
        // dasOne04.innerHTML = 'DAS1 6150 C4 '
        // dasOne05.innerHTML = 'DAS1 6150 C5 '
        // dasOne11.innerHTML = 'DAS1 6100 C1 '
        // dasOne12.innerHTML = 'DAS1 6100 C2 '
        // dasOne13.innerHTML = 'DAS1 6100 C3 '
        // dasOne14.innerHTML = 'DAS1 6100 C4 '
        for (let i = 0; i < jsonData.length; i++) {
                let b = document.createElement('button')
                b.title=jsonData[i].Name;
                
            if (jsonData[i].Name.substring(0,2) == 'XX' || jsonData[i].Name.includes('Spare')){
                b.style.backgroundColor = 'greenyellow'
            }
            else if (jsonData[i].Name.includes('Spare') || jsonData[i].Name.includes('GG')) b.style.backgroundColor = 'lightskyblue'
            else { b.style.backgroundColor = 'brown'; }
            b.className = 'das-icon'
            b.addEventListener('click', function() {
                readIP.textContent = `IP = ${jsonData[i].IP}`
                readName.textContent = `Name = ${jsonData[i].Name}`
                readChan.textContent = `Channel = ${jsonData[i].Channel}`
                getStm().then((data) => {
                    console.log(data)
                    readChan.textContnet += ` and value = ${data}`
                })
                if (showVal.checked) window.open(`http://veex.blueorigin.com:5000/Stm/${jsonData[i].Name}`)
                
            })
            updateDisplay(jsonData[i], b)
        }
    })  
}
//http://10.164.140.32:5000/stm/hsdas1-6-02_volts
//http://veex.blueorigin.com:5000/Stm/TC-E0930
function getStm() {
    return fetch(`http://veex.blueorigin.com:5000/Stm/TC-E0930`, {
        method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok');
      }
      return response.json().then((data) => {
        return data;
      }).catch(error => {
        console.error("Error loading the JSON file", error);
        })
    });
}

function das2() {
    return getReq(`api/tr/veex/das2`).then((data) => {
        jsonData2 = data.TAGs;
        // dasTwo01.innerHTML = ''
        // dasTwo02.innerHTML = ''
        // dasTwo11.innerHTML = ''
        // dasTwo12.innerHTML = ''

        for (let i = 0; i < jsonData2.length; i++) {
            let b = document.createElement('button')
            b.title=jsonData2[i].Name;
            
            if (jsonData2[i].Name.substring(0,2) == 'XX' || jsonData2[i].Name.includes('Spare')){
                b.style.backgroundColor = 'greenyellow'
            }
            else if (jsonData2[i].Name.includes('Spare') || jsonData2[i].Name.includes('GG') || jsonData2[i].Name.includes('DAS')) b.style.backgroundColor = 'lightskyblue' 
            else { b.style.backgroundColor = 'brown'; }
            b.className = 'das-icon'
            b.addEventListener('click', function() {
                readIP.textContent = `IP = ${jsonData2[i].IP}`
                readName.textContent = `Name = ${jsonData2[i].Name}`
                readChan.textContent = `Channel = ${jsonData2[i].Channel}`
                if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${jsonData2[i].Name}`)
            })
         updateDisplay2(jsonData2[i], b)
        }
    })
}

function fvc1() {
    return getReq(`api/tr/veex/fvc1`).then((data) => {
        // console.log(data)
        fvcData1 = data;
        fvcOne1.innerHTML = ''
        fvcOne2.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
                let b = document.createElement('button')
                b.title=data[i][0];
                
            if (!data[i][0]) {
                b.style.backgroundColor = 'greenyellow'
            } else b.style.backgroundColor = 'brown'
            b.className = 'das-icon'
            b.addEventListener('click', function() {
                readIP.textContent = `Name = ${fvcData1[i][0]}`
                readName.textContent = `Port = ${fvcData1[i][3]}`
                readChan.textContent = `Channel = ${fvcData1[i][4]}`
                if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${fvcData1[i].Name}`)
            })
            updateFVC(fvcData1[i], b, 1, false)
        }
    })  
}

function fvc2() {
    return getReq(`api/tr/veex/fvc2`).then((data) => {
        // console.log(data)
        fvcData2 = data;
        fvcTwo1.innerHTML = ''
        fvcTwo2.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
                let b = document.createElement('button')
                b.title=data[i][0];
                
            if (!data[i][0]) {
                b.style.backgroundColor = 'greenyellow'
            } else b.style.backgroundColor = 'brown'
            b.className = 'das-icon'
            b.addEventListener('click', function() {
                readIP.textContent = `Name = ${fvcData2[i][0]}`
                readName.textContent = `Port = ${fvcData2[i][3]}`
                readChan.textContent = `Channel = ${fvcData2[i][4]}`
                if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${fvcData2[i].Name}`)
            })
            updateFVC(fvcData2[i], b, 2, false)
        }
    })  
}

function fvcDI1() {
    return getReq(`api/tr/veex/fvc1di`).then((data) => {
        // console.log(typeof data)
        // console.log(data[4][0])
        // console.log(data)
        fvcDataDI1 = data;
        fvcOneDI1.innerHTML = ''
        fvcOneDI2.innerHTML = ''
        fvcOneDI3.innerHTML = ''
        fvcOneDI4.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
                let b = document.createElement('button')
                b.title=data[i][0];
            if (!data[i][0]) {
                b.style.backgroundColor = 'greenyellow'
            } else b.style.backgroundColor = 'brown'
            b.className = 'das-icon'
            b.addEventListener('click', function() {
                readIP.textContent = `Name = ${fvcDataDI1[i][0]}`
                readName.textContent = `Port = ${fvcDataDI1[i][2]}`
                readChan.textContent = `Channel = ${fvcDataDI1[i][3]}`
                if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${fvcDataDI1[i].Name}`)
            })
            updateFVC(fvcDataDI1[i], b, 1, true)
        }
    })  
}

function fvcDI2() {
    return getReq(`api/tr/veex/fvc2di`).then((data) => {
        // console.log(typeof data)
        // console.log(data[4][0])
        // console.log(data)
        fvcDataDI2 = data;
        fvcTwoDI1.innerHTML = ''
        fvcTwoDI2.innerHTML = ''
        fvcTwoDI3.innerHTML = ''
        fvcTwoDI4.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
                let b = document.createElement('button')
                b.title=data[i][0];
            if (!data[i][0]) {
                b.style.backgroundColor = 'greenyellow'
            } else b.style.backgroundColor = 'brown'
            b.className = 'das-icon'
            b.addEventListener('click', function() {
                readIP.textContent = `Name = ${fvcDataDI2[i][0]}`
                readName.textContent = `Port = ${fvcDataDI2[i][2]}`
                readChan.textContent = `Channel = ${fvcDataDI2[i][3]}`
                if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${fvcDataDI2[i].Name}`)
            })
            updateFVC(fvcDataDI2[i], b, 2, true)
        }
    })  
}




// This will grab a file from the file system to the server and then send it to the client

function test2() {
    fvc1()
}

function test3() {
    return getText(`api/python`).then((data) => {
        console.log(data)
    })
}

function getSTM(req) {
    return fetch(req, {
        method: 'GET',
        mode: 'no-cors'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Sorry, Network response was not ok');
      }
      return response.json().then((data) => {
        return data;
      }).catch(error => {
        console.error("Error loading the JSON file", error);
        })
    });
}


function getText(req) {
    return fetch(req)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network no good bro :(');
        }
        return response.text();
    })
    .then(data => {
        console.log('Test from API:', data)
        return data
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
    // }).then(result => {
    //     console.log(result)
    //     return result
    // })

    // const returnVal = async () => {
    //     const a = await p;
    //         console.log(a);
            
    //     }
    //     returnVal();
    //     return returnVal
    // }

function updateDisplay(jsonData, b) {
ip = jsonData.IP.slice(-2)
ip2 = jsonData.IP.slice(-6,-4)
    if (ip2 == '01') {
        if (ip == '01'){
            dasOne01.appendChild(b)
        }
        if (ip == '02'){
            dasOne02.appendChild(b)
        }
        if (ip == '03'){
            dasOne03.appendChild(b)
        }
        if (ip == '04'){
            dasOne04.appendChild(b)
        }
        if (ip == '05'){
            dasOne05.appendChild(b)
        }
        if (ip == '11'){
            dasOne11.appendChild(b)
        }
        if (ip == '12'){
            dasOne12.appendChild(b)
        }
        if (ip == '13'){
            dasOne13.appendChild(b)
        }
        if (ip == '14'){
            dasOne14.appendChild(b)
        }
    }
       if (ip2 == '02') {
        if (ip == '01'){
            dasTwo01.appendChild(b)
        }
        if (ip == '02'){
            dasTwo02.appendChild(b)
        }
        if (ip == '11'){
            dasTwo11.appendChild(b)
        }
        if (ip == '12'){
            dasTwo12.appendChild(b)
        }
   }
  
}

function updateDisplay2(jsonData, b) {
    ip = jsonData.IP.slice(-2)
   // ip2 = jsonData.IP.slice(-6,-4)
 //   if (ip2 == '02') {
        if (ip == '01'){
            dasTwo01.appendChild(b)
        }
        if (ip == '02'){
            dasTwo02.appendChild(b)
        }
        if (ip == '11'){
            dasTwo11.appendChild(b)
        }
        if (ip == '12'){
            dasTwo12.appendChild(b)
        }
  //  }
}
    
function updateFVC(data, b, box, di) {
    r = data[3] // card for DO
    c = data[1] // chassis number for DI
    if (di) {
        r = data[2] // card for DI
        if (c == 0) {
            if (box === 1) {
                if (r < 8) fvcOneDI1.appendChild(b)
                if (r > 7) fvcOneDI2.appendChild(b)
            }
            if (box === 2) {
                if (r < 8) fvcTwoDI1.appendChild(b)
                if (r > 7) fvcTwoDI2.appendChild(b)
            }
        }
        if (c == 1) {
            if (box === 1) {
                if (r < 8) fvcOneDI3.appendChild(b)
                if (r > 7) fvcOneDI4.appendChild(b)
            }
            if (box === 2) {
                if (r < 8) fvcTwoDI3.appendChild(b)
                if (r > 7) fvcTwoDI4.appendChild(b)
            }
        }
    }
    else {
        if (box === 1) {
            if (r < 8) fvcOne1.appendChild(b)
            if (r > 7) fvcOne2.appendChild(b)
        }
        if (box === 2) {
            if (r < 8) fvcTwo1.appendChild(b)
            if (r > 7) fvcTwo2.appendChild(b)
        }
    }
}


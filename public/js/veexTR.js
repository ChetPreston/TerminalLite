// import { execPy } from '../JSON server/server'


const dispButton = document.getElementById("display-json")
const execPython = document.getElementById("exec-python")
const readIP = document.getElementById("read-ip")
const readName = document.getElementById("read-name")
const readChan = document.getElementById("read-chan")
const showVal = document.getElementById('show-val')
// Loading all of the das divs

const displayInfo = document.getElementById('display-info')
const dasDiv = document.getElementById('das')
const fvcDoDiv = document.getElementById('fvc-do')
const fvcDiDiv = document.getElementById('fvc-di')
const displayClasses = document.getElementById('display-classes')
const searchBox = document.getElementById('search-box')
const searchBtn = document.querySelector('#search-btn')
const svnCommit = document.querySelector('#svn-commit')
const svnUpdate = document.querySelector('#svn-update')
let writeName = document.getElementById('write-name')
var menu = document.getElementById('custom-menu')
let writeValue = document.getElementById('write-value')
const fold = 'C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs'


let jsonData
let newTag
let neName
let outData
// das1()
// das2()
// fvc1()
// fvc2()
// fvcDI1()
// fvcDI2()

// Initialize all of the terminal ports
function getIO() {
    getReq('api/tr/veex/das/VEExDAS1').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS1')
    })
    getReq('api/tr/veex/das/VEExDAS2').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS2')
    })
    getReq(`api/tr/veex/fvc/VEEx_FVC1_DI/2`).then((data) => {
        getFVC_DI(data, 'FVC-DI 1')
    })
    getReq(`api/tr/veex/fvc/VEEx_FVC2_DI/2`).then((data) => {
        getFVC_DI(data, 'FVC-DI 2')
    })
    getReq(`api/tr/veex/fvc/VEEx_FVC1_Valve_Configuration/104`).then((data) => {
        getFVC(data, 'FVC-DO 1')
    })
    getReq(`api/tr/veex/fvc/VEEx_FVC2_Valve_Configuration/77`).then((data) => {
        getFVC(data, 'FVC-DO 2')
    })
}

getIO()
// btns = document.getElementsByTagName('button')
// console.log(btns)

function resetBtns() {
    dasDiv.innerHTML = ''
    fvcDiDiv.innerHTML = ''
    fvcDoDiv.innerHTML = ''
}



document.addEventListener('click', function() {
    menu.style.display = 'none';
  });

searchBox.addEventListener('keypress', function(e) {
    if (this.value) {
    if (e.key === 'Enter') {
        e.preventDefault()
        searchBtn.click();
        searchBox.value = ''
    }
}
})
// Perform SVN Commands
svnCommit.addEventListener('click', function() {
    enterPW = prompt('Enter password')
    obj = {
        mode: 'commit',
        site: 'VEEx',
        enterPW: enterPW
    }
    postReq(obj, 'svn')
})
svnUpdate.addEventListener('click', function() {
    obj = {
        mode: 'update',
        site: 'VEEx',
        enterPW: 'nothing'
    }
    postReq(obj, 'svn')
})


// Perform Search
searchBtn.addEventListener('click', function(e) {
    e.preventDefault()
    searchData = {
    search: searchBox.value
    }
    resetBtns() //Removes old buttons
    setTimeout(function() {}, 5000)
    getIO() // reset all colors
    let btns = document.getElementsByTagName('button');
    setTimeout(function() {
        postReq(searchData, 'api/tr/veex/search').then((data) => {
            const searchResults = data.results;
            if (searchResults) {
                console.log(searchResults.length)
                // console.log(searchResults[0][1])
                // console.log(searchResults[0][0])
            }
            const searchDiv = document.getElementById('search-results-div')
            searchDiv.innerHTML = ''
            for (let i =0; i < data.results.length; i++) {
                if (data.results[i][1].includes('DAS')) {
                    sName = data.results[i][0].Name 
                    sIP = data.results[i][0].IP
                    sChan = data.results[i][0].Channel
                    searchDiv.innerHTML += /*html*/`
                    <ul>${sName} - ${data.results[i][1]} - ${sIP};  Channel ${sChan}</ul>
                    `
                    for (let j=0; j<btns.length; j++) {
                        if (btns[j].title.toLowerCase().includes(sName.toLowerCase())) {
                            btns[j].style.color='red'
                            btns[j].style.fontWeight='bold'
                        }
                    }
                }
                else if (data.results[i][1].includes('DO')) {
                    sName = data.results[i][0][0]
                    sPort = data.results[i][0][2]
                    sChan = data.results[i][0][3]
                    searchDiv.innerHTML += /*html*/`
                    <ul>${sName} - ${data.results[i][1]} - Port: ${sPort}, Channel: ${sChan}</ul>
                    `
                    for (let j=0; j<btns.length; j++) {
                        if (btns[j].title.toLowerCase().includes(sName.toLowerCase())) {
                            btns[j].style.color='red'
                            btns[j].style.fontWeight='bold'
                        }
                    }
                }
                else if (data.results[i][1].includes('DI')) {
                    sName = data.results[i][0][0]
                    sCard = data.results[i][0][1]
                    sPort = data.results[i][0][2]
                    sChan = data.results[i][0][3]
                    searchDiv.innerHTML += /*html*/`
                    <ul>${sName} - ${data.results[i][1]} - Card: ${sCard}, Port: ${sPort}, Channel: ${sChan}</ul>
                    `
                    for (let j=0; j<btns.length; j++) {
                        if (btns[j].title.toLowerCase().includes(sName.toLowerCase())) {
                            btns[j].style.color='red'
                            btns[j].style.fontWeight='bold'
                        }
                    }

                }

            }
        })
    }, 300)
})


// Perform Menu Options
menu.addEventListener('click', function(e) {
    var action = e.target.getAttribute('data-action')
    if (action === 'action1') {
        var buttonClasses = e.target.classList
        console.log('Clicked on choice:', action)
        const cName = e.target.classList.value
        console.log(e.target.classList.value)
        let dataInfo = JSON.parse(e.target.dataset.info)
        console.log(dataInfo)
        // console.log(e.target.textContent)
        // cVal = fetch(`http://veex.blueorigin.com:5000/Stm/TC-E0930`)
        console.log(fetch(`http://veex.blueorigin.com:5000/Stm/TC-E0930`))
        if (cName.includes('DAS')) {
            
        }
        else if (cName.includes('FVC-DI')) {

        }
        else if (cName.includes('FVC-DO')) {

        }
        displayInfo.innerHTML = `
        <p>Hey There!</p>
        `
    }
    if (action === 'action2') {
        var buttonClasses = e.target.classList
        console.log('Clicked on choice:', action)
        const cName = e.target.classList.value
        console.log(e.target.classList.value)
        let dataInfo = JSON.parse(e.target.dataset.info)
        newCh = dataInfo.ch
        newName = prompt('Enter the new tag name:')
        console.log(cName)
        if (newName) {
            enterPW = prompt('Enter password') 
            if (enterPW === 'frankortiz') {
                if (cName.includes('DAS1')) {
                    outData = csvObj('VEExDAS1', newCh, newName)
                    postReq(outData, 'api/tr/veex/das')
                }
                if (cName.includes('DAS2')) {
                    outData = csvObj('VEExDAS2', newCh, newName)
                    postReq(outData, 'api/tr/veex/das')
                }
                else if (cName.includes('FVC-DI 1')) {
                    outData = csvObj('VEEx_FVC1_DI', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/veex/fvc`)
                }
                else if (cName.includes('FVC-DI 2')) {
                    outData = csvObj('VEEx_FVC2_DI', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/veex/fvc`)
                }
                else if (cName.includes('FVC-DO 1')) {
                    outData = csvObj('VEEx_FVC1_Valve_Configuration', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/veex/fvcdo`)
                }
                else if (cName.includes('FVC-DO 2')) {
                    outData = csvObj('VEEx_FVC1_Valve_Configuration', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/veex/fvcdo`)
                }
         

                else if (cName.includes('FVC-DO')) {

                }
                window.location.reload()
            }
            else alert('Wrong password')
        }
        
    }
    if (action === 'action3') {
        console.log('Clicked on choice:', action)
        displayInfo.innerHTML = `
        <p></p>
        `
    }
})



function getDAS(data, name) {
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        // b.title = data[i].Name
        b.textContent = i
        b.className = `das-icon ${name}`
        // b.style.width = btnW + 'px'
        // b.style.height = btnW + 'px'
        b.addEventListener('click', function() {
            displayInfo.innerHTML = `
            <p>Device = ${name}</p>
            <p>IP = ${data[i].IP}</p>
            <p>Name = ${data[i].Name}</p>
            <p>Channel = ${data[i].Channel}</p>
            `
            if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${data[i].Name}`)
        })
        b = colorIcons(b, data[i].Name, i)
        dasDiv.appendChild(b)
    }
    const br = document.createElement('br')
    dasDiv.appendChild(br)
}

function getFVC(data, name) {
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.textContent = i
        b.className = `das-icon ${name}`
        b.addEventListener('click', function() {
            displayInfo.innerHTML = `
            <p>Device = ${name}</p>
            <p>Name = ${data[i][0]}</p>
            <p>Port = ${data[i][3]}</p>
            <p>Channel = ${data[i][4]}</p>
            `
            if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${data[i][0]}`)
        })
        b = colorIcons(b, data[i][0], i)
        fvcDoDiv.appendChild(b)
    }
    const br = document.createElement('br')
    fvcDoDiv.appendChild(br)
}

function getFVC_DI(data, name) {
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.textContent = i
        b.className = `das-icon ${name}`
        b.addEventListener('click', function() {
            displayInfo.innerHTML = `
            <p>Device = ${name}</p>
            <p>Name = ${data[i][0]}</p>
            <p>Card and Port = ${data[i][1]}, ${data[i][2]}</p>
            <p>Channel = ${data[i][3]}</p>
            `
            if (showVal.checked) window.open(`https://veex.blueorigin.com:5001/Stm/${data[i][0]}`)
        })
        b = colorIcons(b, data[i][0], i)
        
        fvcDiDiv.appendChild(b)
    }
    const br = document.createElement('br')
    fvcDiDiv.appendChild(br)
}

// This will grab and display an object stored on the server (no file)
function das1() { 
    return getReq(`api/tr/veex/das1`).then((data) => {
        jsonData = data.TAGs;
     
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

// Make the window draggable
dragElement(document.getElementById("draggableWindow"));

const dragWindow = document.getElementById('draggableWindow')
// Store the initial position of the window

let initialWindowOffset = draggableWindow.getBoundingClientRect();
let initialTop = initialWindowOffset.top + window.scrollY;
let initialLeft = initialWindowOffset.left + window.scrollX;







function dragElement(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(element.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(element.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Handle the scroll event
window.addEventListener('scroll', function() {
    draggableWindow.style.top = (initialTop + window.scrollY) + 'px';
    draggableWindow.style.left = (initialLeft + window.scrollX) + 'px';
  });



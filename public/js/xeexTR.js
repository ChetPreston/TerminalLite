const testButtonXeex = document.getElementById('test-xeex')
const fvcDoDiv = document.getElementById('fvc-do')
const fvcDiDiv = document.getElementById('fvc-di')
const dasDiv = document.querySelector('#das')
const showVal = document.getElementById('show-val')
const displayClasses = document.getElementById('display-classes')
const searchBox = document.getElementById('search-box')
const searchBtn = document.querySelector('#search-btn')
const svnCommit = document.querySelector('#svn-commit')
const svnUpdate = document.querySelector('#svn-update')
const displayInfo = document.getElementById('display-info')
let writeName = document.getElementById('write-name')
var menu = document.getElementById('custom-menu')
let writeValue = document.getElementById('write-value')
const fold = 'C:/SVN/Configs_and_Batches/Test_Stand_Configs/GEEx/system_configs'




// const screenW = window.screen.width;


testButtonXeex.style.display = 'none'

function getIO() {
    // FVC
    getReq(`api/tr/xeex/fvc/Sequencer_Valve_Configuration/92`).then((data) => {
        getFVC(data, 'Sequence')
    })
    getReq(`api/tr/xeex/fvc/Facility_2_Valve_Configuration/91`).then((data) => {
        getFVC(data, 'Facility 2')
    })
    getReq(`api/tr/xeex/fvc/Facility_3_Valve_Configuration/91`).then((data) => {
        getFVC(data, 'Facility 3')
    })
    getReq(`api/tr/xeex/fvc/FVC4_Valve_Configuration/91`).then((data) => {
        getFVC(data, 'Facility 4')
    })
    getReq(`api/tr/xeex/fvc/FVC5_Valve_Configuration/91`).then((data) => {
        getFVC(data, 'Facility 5')
    })
    getReq(`api/tr/xeex/fvc/FVC6_Valve_Configuration/91`).then((data) => {
        getFVC(data, 'Facility 6')
    })
    getReq(`api/tr/xeex/fvc/FVC7_Valve_Configuration/91`).then((data) => {
        getFVC(data, 'Facility 7')
    })
    getReq(`api/tr/xeex/fvc/XEEx_FVC1_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC1')
    })
    getReq(`api/tr/xeex/fvc/xeex_FVC2_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC2')
    })
    getReq(`api/tr/xeex/fvc/XEEx_FVC3_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC3')
    })
    getReq(`api/tr/xeex/fvc/xeex_FVC4_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC4')
    })
    getReq(`api/tr/xeex/fvc/xeex_FVC5_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC5')
    })
    getReq(`api/tr/xeex/fvc/XEEx_FVC6_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC6')
    })
    getReq(`api/tr/xeex/fvc/xeex_FVC7_DI/1`).then((data) => {
        getFVC_DI(data, 'FVC7')
    })
  
    // DAS
    // getReq('api/tr/xeex/das/XEExDAS1').then((data) => {
    //     jsonData = data.TAGs;
    //     getDAS(jsonData, 'DAS1')
    // })
    // getReq('api/tr/xeex/das/XEExDAS2').then((data) => {
    //     jsonData = data.TAGs;
    //     getDAS(jsonData, 'DAS2')
    // })
    getReq('api/tr/xeex/das/XEExDAS3').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS3')
    })
    getReq('api/tr/xeex/das/XEExDAS4').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS4')
    })
    getReq('api/tr/xeex/das/XEExDAS5').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS5')
    })
}
// Menu Buttons
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
        site: 'XEEx',
        enterPW: enterPW
    }
    postReq(obj, 'svn')
})
svnUpdate.addEventListener('click', function() {
    
    obj = {
        mode: 'update',
        site: 'XEEx',
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
    getIO() // reset all colors
    let btns = document.getElementsByTagName('button');
    setTimeout(function() {
        postReq(searchData, 'api/tr/geex/search').then((data) => {
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
    }, 500)
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
        console.log(fetch(`http://geex.blueorigin.com:5000/Stm/TC-E0930`))
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
                    outData = csvObj('GEExDAS1', newCh, newName)
                    postReq(outData, 'api/tr/geex/das')
                }
                else if (cName.includes('DAS2')) {
                    outData = csvObj('GEExDAS2', newCh, newName)
                    postReq(outData, 'api/tr/geex/das')
                }
                else if (cName.includes('DAS3')) {
                    outData = csvObj('GEExDAS3', newCh, newName)
                    postReq(outData, 'api/tr/geex/das')
                }
                else if (cName.includes('DAS4')) {
                    outData = csvObj('GEExDAS4', newCh, newName)
                    postReq(outData, 'api/tr/geex/das')
                }
                else if (cName.includes('DAS5')) {
                    outData = csvObj('GEExDAS5', newCh, newName)
                    postReq(outData, 'api/tr/geex/das')
                }
                
                else if (cName.includes('FVC-DI 1')) {
                    outData = csvObj('GEEx_FVC1_DI', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/geex/fvc`)
                }
                else if (cName.includes('FVC-DI 2')) {
                    outData = csvObj('GEEx_FVC2_DI', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/geex/fvc`)
                }
                else if (cName.includes('FVC-DI 3')) {
                    outData = csvObj('GEEx_FVC3_DI', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/geex/fvc`)
                }
                else if (cName.includes('FVC-DI 4')) {
                    outData = csvObj('GEEx_FVC4_DI', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/geex/fvc`)
                }
                else if (cName.includes('FVC-DO 1')) {
                    outData = csvObj('GEEx_FVC1_Valve_Configuration', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/geex/fvcdo`)
                }
                else if (cName.includes('FVC-DO 2')) {
                    outData = csvObj('GEEx_FVC1_Valve_Configuration', newCh, newName)
                    console.log(outData)
                    postReq(outData, `api/tr/geex/fvcdo`)
                }
                    // getReq(`api/tr/veex/fvc/VEEx_FVC1_DI/2`).then((data) => {
                    //     console.log(data[0])
                    //     newTag = prompt('Enter ID number for the channel you want to rename on FVC DI 1:') 
                    //     newName = prompt('Enter the new tag name:')
                    //     console.log(newTag + ' ' + newName)
                    // })

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
            if (showVal.checked) window.open(`https://xeex.blueorigin.com:5001/Stm/${data[i][0]}`)
        })
        b = colorIcons(b, data[i][0])
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
            if (showVal.checked) window.open(`https://xeex.blueorigin.com:5001/Stm/${data[i][0]}`)
        })
        b = colorIcons(b, data[i][0])
        
        fvcDiDiv.appendChild(b)
    }
    const br = document.createElement('br')
    fvcDiDiv.appendChild(br)
}

function getDAS(data, name) {
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.textContent = i
        b.className = `das-icon ${name}`
        b.addEventListener('click', function() {
            displayInfo.innerHTML = `
            <p>Device = ${name}</p>
            <p>IP = ${data[i].IP}</p>
            <p>Name = ${data[i].Name}</p>
            <p>Channel = ${data[i].Channel}</p>
            `
            if (showVal.checked) window.open(`https://xeex.blueorigin.com:5001/Stm/${data[i].Name}`)
        })
        b = colorIcons(b, data[i].Name)
        dasDiv.appendChild(b)
    }
    const br = document.createElement('br')
    dasDiv.appendChild(br)
}

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
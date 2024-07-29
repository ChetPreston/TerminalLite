const testButtonXeex = document.getElementById('test-xeex')
const divFVC = document.getElementById('fvc-div')
const divFVCDI = document.getElementById('fvc-div-di')
const divDAS = document.querySelector('#das-div-geex')
const screenW = window.innerWidth;
const showVal = document.getElementById('show-val')



// const screenW = window.screen.width;

const btnW = screenW * 0.9 / 49

openingFnc()
testButtonXeex.style.display = 'none'

function openingFnc() {
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

testButtonXeex.addEventListener('click', function() {
    getReq('api/tr/xeex/das/xeexDAS2').then((data) => {
        jsonData = data.TAGs;
        getDAS(jsonData, 'DAS2')
    })
})

function getFVC(data, name) {
    const readIP = document.getElementById("read-ip")
    const readName = document.getElementById("read-name")
    const readChan = document.getElementById("read-chan")
    const readDevice = document.getElementById('read-device')
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.title = data[i][0]
        b.textContent = i
        b.addEventListener('click', function() {
            readDevice.textContent = `Device = ${name}`
            readIP.textContent = `Name = ${data[i][0]}`
            readName.textContent = `Port = ${data[i][3]}`
            readChan.textContent = `Channel = ${data[i][4]}`
            if (showVal.checked) window.open(`https://xeex.blueorigin.com:5001/Stm/${data[i][0]}`)
        })
        b.style.width = btnW + 'px'
        b.style.height = btnW + 'px'
        divFVC.appendChild(b)
    }
    // divFVC.innerHTML += '<br>'
    const br = document.createElement('br')
    divFVC.appendChild(br)
}

function getFVC_DI(data, name) {
    const readIP = document.getElementById("read-ip2")
    const readName = document.getElementById("read-name2")
    const readChan = document.getElementById("read-chan2")
    const readDevice = document.getElementById('read-device2')
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.title = data[i][0]
        b.textContent = i
        b.style.width = btnW + 'px'
        b.style.height = btnW + 'px'
        b.addEventListener('click', function() {
            readDevice.textContent = `Device = ${name}`
            readIP.textContent = `Name = ${data[i][0]}`
            readName.textContent = `Card and Port = ${data[i][1]}, ${data[i][2]}`
            readChan.textContent = `Channel = ${data[i][3]}`
            if (showVal.checked) window.open(`https://xeex.blueorigin.com:5001/Stm/${data[i][0]}`)
        })
        divFVCDI.appendChild(b)
    }
    const br = document.createElement('br')
    divFVCDI.appendChild(br)
}

function getDAS(data, name) {
    const readIP = document.getElementById("read-ip3")
    const readName = document.getElementById("read-name3")
    const readChan = document.getElementById("read-chan3")
    const readDevice = document.getElementById('read-device3')
    const arrayL = data.length
    for (let i = 0; i < arrayL; i++) {
        let b = document.createElement('button')
        b.title = data[i].Name
        b.textContent = i
        b.style.width = btnW + 'px'
        b.style.height = btnW + 'px'
        b.addEventListener('click', function() {
            readDevice.textContent = `Device = ${name}`
            readIP.textContent = `IP = ${data[i].IP}`
            readName.textContent = `Name = ${data[i].Name}`
            readChan.textContent = `Channel = ${data[i].Channel}`
            if (showVal.checked) window.open(`https://xeex.blueorigin.com:5001/Stm/${data[i].Name}`)
        })
        divDAS.appendChild(b)
    }
    const br = document.createElement('br')
    divDAS.appendChild(br)
}
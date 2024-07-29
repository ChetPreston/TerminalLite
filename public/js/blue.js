
const mainDiv = document.getElementById('main-div')
const screenH = window.innerHeight;
const screenW = window.innerWidth;
const mainButtons = document.getElementsByClassName('main-button')
// const footerButtons = document.getElementsByClassName('footer-button')
const veexButtonMain = document.getElementById('veex')
const geexButtonMain = document.getElementById('geex')
const xeexButtonMain = document.getElementById('xeex')


// const blueGPT = document.getElementById('blue-gpt')
// const julesdbButton = document.getElementById('jules-page')
// const airtableButton = document.getElementById('airtable')
// const neuroButton = document.getElementById('neuro')
// const bdmsButton = document.getElementById('bdms')
// const julesButton = document.getElementById('jules')
// const imperioButton = document.getElementById('imperio')
// const testButton = document.getElementById('test')

// console.log(mainButtons)
// console.log(footerButtons)

homeButton.style.color = 'red';
homeButton.style.backgroundColor = 'blue';

mainDiv.style.width = (screenW / 2) + 'px'
// mainDiv.style.marginLeft = (screenW / 5) +'px'
// mainDiv.style.marginRight = (screenW / 5) +'px'
mainDiv.style.margin = (screenH * 0.95 / 4) + 'px ' + (screenW / 4) + 'px'
mainDiv.style.marginBottom = screenH/5 + 'px'
mainDiv.style.height = (screenH *0.28) +'px';


veexButtonMain.addEventListener('click', function() {
    window.location.href = '/veexTR';
})
geexButtonMain.addEventListener('click', function() {
    window.location.href = '/geexTR';
})
xeexButtonMain.addEventListener('click', function() {
    window.location.href = '/xeexTR';
})

const buttonHeight = screenH * 0.95 / 4;
const buttonWidth = screenW * 0.25
// const footerWidth = screenW * 0.07


for (let i = 0; i < mainButtons.length; i++) {
    mainButtons[i].style.height = buttonHeight + 'px'
    mainButtons[i].style.width = buttonWidth + 'px'
}



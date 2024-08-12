
const mainDiv = document.getElementById('main-div')
const screenH = window.innerHeight;
const mainButtons = document.getElementsByClassName('main-button')
// const footerButtons = document.getElementsByClassName('footer-button')
const veexButtonMain = document.getElementById('veex')
const geexButtonMain = document.getElementById('geex')
const xeexButtonMain = document.getElementById('xeex')




homeButton.style.color = 'red';
homeButton.style.backgroundColor = 'blue';

mainDiv.style.width = (screenW / 2) + 'px'
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



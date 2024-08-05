// Header document objects
const veexButton = document.querySelector('#veex-btn')
const geexButton = document.querySelector('#geex-btn')
const xeexButton = document.querySelector('#xeex-btn')

const homeButton = document.querySelector('#home-btn')

const loginStatus = document.querySelector('#login-status')
const loginMsg = document.querySelector('#login-msg')
const loginButton = document.querySelector('#login-button')
// const logoutButton = document.querySelector('#logout-button')
const emailBox = document.querySelector('#username')
const passwordBox = document.querySelector('#password')
const createAccount = document.getElementById('create-account')
const logoutButton = document.querySelector('#logout-button')
const screenW = window.innerWidth;
const btnW = screenW * 0.9 / 58


// Header constants
const myIP = 'http://10.144.208.81:4000/'

// Header button functions
// loginButton.addEventListener('click', loginUser)

// logoutButton.addEventListener('click', function() {
//     window.location.href ='/'
// })

// function loginUser2() {
//     loginStatus.textContent = "Wow"
// }
homeButton.addEventListener('click', function() {
    window.location.href = '/';
})
veexButton.addEventListener('click', function() {
    window.location.href = 'veexTR'
})
geexButton.addEventListener('click', function() {
    window.location.href = 'geexTR'
})
xeexButton.addEventListener('click', function() {
    window.location.href = 'xeexTR'
})

// createAccount.addEventListener('click', function() {
//     window.location.href = `auth`
// })

// logoutButton.addEventListener('click', function() {
//     logoutUser()
// })

function logoutUser() {
    getReq('logout').then((data) => {
        runDelayedCode(2000)
        // console.log(data)
        window.location.href = '/'
    })
    
    // setTimeout(, 1000)
    // window.location.href = '/';
}

function createUser() {
    window.location.href = 'auth'
}


helloUser()

function helloUser() {

}

// Auth functions
function loginUser() {
    const api = 'login'
    if (!emailBox.value || !passwordBox.value) {
        msg.textContent = "email and password are required"
    } else {
        const data = {
            email: emailBox.value,
            password: passwordBox.value,
        }
        postReq(data, api).then((res) => {
            console.log(res)
            // msg.textContent = res.msg
            if (res.status) {
                window.location.href = '/';
            }    
        })
        helloUser()
    }
}

function loginUser2() {
    loginStatus.textContent = "Wow"
}

// Generic HTTP functions

//HTTP POST request to the Node.js API
function postReq(dataToSend, api) {
    return fetch(`${myIP}${api}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json()
    })
    .then(data => {
    //console.log('Response from the API:', data);
    return data;
    })
    .catch(error => {
    console.error('Error sending object to API:', error);
    });
}

function postNoRes(dataToSend, api) {
    fetch(`${myIP}${api}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
}

function getReq(req) {
    return fetch(`${myIP}${req}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json().then((data) => {
        return data;
      }).catch(error => {
        console.error("Error loading the JSON file", error);
        })
    });
}

function delay(milliseconds) {
    /* Create a delay using setTimeout. */
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  
  // Usage:
  async function runDelayedCode(ms) {
    console.log('Start');
    await delay(ms); // 4-second delay
    console.log('End');
  }
  

function colorIcons(b, name, ch) {

    b.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        menu.style.display = 'block'
        menu.style.left = e.pageX + 'px'
        menu.style.top = e.pageY +'px'
        
        displayClasses.addEventListener('click', function() { // This is for button 1
            displayClasses.className = e.target.classList.value
            displayClasses.dataset.value = ch;
            infoObject = {one: 'one', two: 'two'}
            displayClasses.dataset.info = JSON.stringify(infoObject)

            // das1Target.innerHTML = `
            // <p>${Array.from(buttonClasses).join(',')}</p>`
        })

        writeName.addEventListener('click', function() { //This is for button 2
            writeName.className = e.target.classList.value
            writeName.dataset.value = name
            infoObject = {name: name, ch: ch}
            writeName.dataset.info = JSON.stringify(infoObject)
        })

        writeValue.addEventListener('click', function() {// This is for button 3

        })
        
        return false;
    })

    b.addEventListener('mouseover', function() {
        b.style.backgroundColor = 'black'
        if (b.style.color != 'red') {
            b.style.color = 'lightskyblue'
        }
    })
    if (name.length === 0) {
        b.style.backgroundColor = 'greenyellow'
        b.addEventListener('mouseout', function() {
            b.style.backgroundColor = 'greenyellow'
            if (b.style.color != 'red') {
                b.style.color = 'black'
            }
        })
    } else { 
        b.style.backgroundColor = 'rgb(179, 34, 179)'
        b.addEventListener('mouseout', function() {
            b.style.backgroundColor = 'rgb(179, 34, 179)'
            if (b.style.color != 'red') {
                b.style.color = 'black'
            }
        })
    }
    b.style.width = btnW + 'px'
    b.style.height = btnW + 'px'
    b.style.color = 'black';
    b.title = name
    return b
}

function csvObj(sec, loc, name) {
    obj = {
        sec: sec,
        location: parseInt(loc),
        name: name
    }
    return obj
}



  

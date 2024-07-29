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
  

  

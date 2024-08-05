// import * as http from 'http'
// import * as https from 'https'
// import express from 'express'
// import * as path from 'path'
// import * as fs from 'fs';
// import cors from 'cors'
// import * as mysql from 'mysql2'
// import {parse} from 'csv-parse'
// import * as cowsay from 'cowsay'
const http = require('http');
const cowsay = require('cowsay')
const https = require('https')
const express = require('express')
const app = express()
// const Joi = require('joi');
const path = require('path')
// const os = require('os')
const fs = require('fs')
// const EventEmitter = require('events')
const cors = require("cors")
// const { spawn } = require('child_process');
const { exec } = require('child_process')
// const mysql = require('mysql2')
// const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const bcrypt = require("bcryptjs")
// const jwt = require('jsonwebtoken')
// const csv = require('csv-parser')
const {parse} = require('csv-parse');
const readline = require('readline')
// const { readXls } = require('read-excel-file/node');
// const authRoutes = require('./routes/authRoutes')
// const commentRoutes = require('./routes/commentRoutes')
// const projectRoutes = require('./routes/projectRoutes')
// const libraryRoutes = require('./routes/libraryRoutes')
const trRoutes = require('./routes/trRoutes');
const { default: createTRPage } = require('./public/js/tr');
// const cookieParser = require('cookie-parser')
// const { requireAuth, checkUser, checkConnection } = require('./middleware/authMW')
// const connection = require('./controllers/mySQL')
// const stream = require('node-rtsp-stream')
// const multer = require('multer')

// @01               ESTABLISH ARCHITECTURES AND CONNECTIONS
// @02               Commands for the terminal room layout
// @03               Commands for the eWo database
// @04               Commands for the comments database
// @05               Commands for handling user accounts
// @06                     Project Management

// @0X TEST CODE AND COMMUNICATION FRAMEWORKS

//////////////////////////////////////////
// @01 ESTABLISH ARCHITECTURES AND CONNECTIONS
//////////////////////////////////////////
const jwtSecret = '28d1a301afccb72337f6f4d5b3270495869bae3690a2b3f4b0bc61674e9a0da01ad99d'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
// app.use(authRoutes)
// app.use(commentRoutes)
// app.use(projectRoutes)
// app.use(libraryRoutes)
app.use(trRoutes)
app.use(express.static(path.join(__dirname, 'public/')))
// app.use(cookieParser());

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)



// Page Routes
// app.get('*', checkUser);
// app.get('/veex', requireAuth, checkConnection, (req, res) => res.render('veex'))

app.get('/', (req, res) => res.render('blue'))
// app.get('/', (req, res) => {
//     // const homepageContent = createTRPage();
//     res.send(createTRPage);
// });

app.get('/veexTR', (req, res) => res.render('veexTR'))
app.get('/geexTR', (req, res) => res.render('geexTR'))
app.get('/xeexTR', (req, res) => res.render('xeexTR'))

// app.get('/julesdb', requireAuth, (req, res) => res.render('julesdb'))
// app.get('/ewo',requireAuth, (req, res) => res.render('ewo'))
// app.get('/test', (req, res) => {
//     res.send('complete')
// })
// app.get('/imperio', requireAuth, (req, res) => res.render('imperio') )
// app.get('/ewo', requireAuth, checkConnection, (req, res) => res.render('ewo'))
// app.get('/projects', requireAuth, (req, res) => res.render('projects'))
// app.get('/consoles', (req, res) => res.render('consoles'))
// app.get('/library', (req, res) => res.render('library'))
// app.get('/cameras', requireAuth, (req, res) => res.render('cameras'))
// app.get('/auth/fp', (req, res) => res.render('fp'))

// Setup Storage
// let imageName = 'donkey.jpg'
// app.get('/comments/image-name/:name', (req, res) => {
//     console.log(imageName)
//     imageName = req.params.name + '.jpg'
//     console.log(imageName)
//     res.json('imageName')
//     return imageName
// })

app.post('/svn', (req, res) => {
    const { mode, site, enterPW } = req.body
    // console.log(enterPW)
    fold = `C:/SVN/Configs_and_Batches/Test_Stand_Configs/${site}/system_configs`
    // command = `svn ${mode} ${fold} -m app "app commit"`
    if (mode == 'update') {
        command = `svn ${mode} ${fold}`
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ${error.message}`)
                return
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`)
                return
            }
            console.log(stdout)
        })
    }
    else if (mode == 'commit') {
        if (enterPW == 'frankortiz') {
            command = `svn ${mode} ${fold} -m "app commit"`
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error ${error.message}`)
                    return
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`)
                    return
                }
                console.log(stdout)
            })
        }
        else alert('Wrong password!')
        
    }
})


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, imageName)  //file.originalname
//     }
// })
// console.log(storage)
// const upload = multer({ storage: storage })
 
// app.post('/comments/image', upload.single('veex_image1'), (req, res) => {
//     console.log('Mission complete')
//     res.json('Mission complete')
// })

// app.get('/auth/user', (req, res) => {
//     console.log(req.cookies)
//     res.send(req.cookies)
// })
// cookies
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser=true')
//     res.cookie('newUser', false)
//     res.cookie('isHired', true, { maxAge: 1000 * 3600 * 24})
//     res.send('you got the cookies')
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies
//     console.log(cookies)
//     res.json(cookies)
// })

// stream = new stream({
//     name: 'cam1',
//     streamURL: 'rtsp://10.80.129.131:554/ch01',
// })

///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// @02                          Commands for the terminal room layout
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/api/tr/veex/das1', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //let testJson = JSON.parse(fs.readFileSync('./VEExDAS1.json'))
    let testJson = JSON.parse(fs.readFileSync('C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs/DAS/VEExDAS1.json'))
    res.send(testJson);
})

app.get('/api/tr/veex/das2', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //let testJson = JSON.parse(fs.readFileSync('./VEExDAS2.json'))
    let testJson = JSON.parse(fs.readFileSync('C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs/DAS/VEExDAS2.json'))
    res.send(testJson);
})

app.get('/api/courses/geex', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let geexJson = JSON.parse(fs.readFileSync('./GEExDAS5.json'))
    res.send(geexJson);
})

app.get('/api/tr/veex/fvc1', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let results = [];
    fs.createReadStream('C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs/valve_controllers/VEEx_FVC1_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 104}))
    .on('data', function(row) {
       results.push(row)
    })
    .on("end", function () {
        res.send(results)
    })
})

app.get('/api/tr/veex/fvc2', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let results = [];
    fs.createReadStream('C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs/valve_controllers/VEEx_FVC2_Valve_Configuration.csv')
    .pipe(parse({ delimiter: ",", from_line: 77}))
    .on('data', function(row) {
       results.push(row)
    })
    .on("end", function () {
        res.send(results)
    })
})

app.get('/api/tr/veex/fvc1di', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let results = [];
    fs.createReadStream('C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs/valve_controllers/VEEx_FVC1_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 2}))
    .on('data', function(row) {
       results.push(row)
    })
    .on("end", function () {
        res.send(results)
    })
})

app.get('/api/tr/veex/fvc2di', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let results = [];
    fs.createReadStream('C:/SVN/Configs_and_Batches/Test_Stand_Configs/VEEx/system_configs/valve_controllers/VEEx_FVC2_DI.csv')
    .pipe(parse({ delimiter: ",", from_line: 2}))
    .on('data', function(row) {
       results.push(row)
    })
    .on("end", function () {
        res.send(results)
    })
})




///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// @03                          Commands for creating and controlling eWos
///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



// // THIS IS THE MAIN WAY TO RUN OKTA VEIFY
// app.get('/api/okta', (req, res) => {
//     //okta(driver)
//     console.log('Opening Okta')
//     axios.post('http://localhost:5000/okta').then(response => {
//         // console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error calling Python function:', error);
//     });    
// })
 

// // THIS IS THE MAJOR POWERHORSE FOR RUNNING THE CREATION TOOL IN PYTHON FROM CURRENT SQL DATABASE
// app.get('/api/jules/create', (req, res) => {
//     console.log('Starting eWocreation script')
//     connection.connect()
//     connection.query('SELECT * FROM ewos', (error, results, fields) => {
//         if (error) {
//             console.error('Error finding table', error);
//         } else {
//             const tableData = results;
//             axios.post('http://localhost:5000/julesCreate', tableData).then(response => {
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error('Error calling Python function:', error);
//             });    
//         }
//     })
//     connection.end

// })


// // THIS IS A CALL FROM PYTHON TO UPDATE THE STATUS AND EWO NUMBER IN SQL
// app.post('/python/julesUpdate', (req, res) => {
//     const rA = req.body
//     console.log(req.body)
//     connection.connect()
//         connection.query(`UPDATE ewos SET status = '${req.body[2]}' WHERE id = '${req.body[0]}'`, (error, results, fields) => {
//             if (error) {
//                 console.error('Error finding table', error);
//             } else console.log(`Added Status = ${req.body[2]} to part ID = ${req.body[0]}`)
//     })
//         connection.query(`UPDATE ewos SET number = '${req.body[1]}' WHERE id = '${req.body[0]}'`, (error, results, fields) => {
//             if (error) {
//                 console.error('Error finding table', error);
//             } else console.log(`Added eWo Number = ${req.body[1]} to part ID = ${req.body[0]}`)
//     })
//     connection.end
// })



// // USE THIS TO UPDATE THE SQL DATABASE WITH THE CORRECT STATUS FOR A CHOSEN ID NUMBER
// app.get('/api/jules/status/:id', (req, res) => {
//     let x = req.params.id.toString();
//     connection.connect()
//     connection.query('SELECT * FROM ewos', (error, results, fields) => {
//         if (error) {
//             console.error('Error finding table', error);
//         } else {
//             const tableData = results;
//             for (let i = 0; i < tableData.length; i++) {
//                 if (tableData[i].id == x) y = i; 
//             }
//             axios.post('http://localhost:5000/julesStatus', tableData[y]).then(response => {
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error('Error calling Python function:', error);
//             });   
//         }
//     })
//     connection.end
// })



// // USE THIS TO MODIFY A WORK ORDER BY ITS ID NUMBER (NOT EWO NUMBER)
// app.get('/api/jules/modify/:id', (req, res) => {
//     let x = req.params.id;
//     connection.connect()
//     connection.query('SELECT * FROM ewos', (error, results, fields) => {
//         if (error) {
//             console.error('Error finding table', error);
//         } else {
//             const tableData = results;
//             for (let i = 0; i < tableData.length; i++) {
//                 if (tableData[i].id == x) y = i; 
//             }
//             ewos.julesModify(tableData[y], x)
//         }
//     })
//     connection.end
// })

// app.post('/jules/makeewo', (req, res) => {
//     // Using SQL Database
//     // Create new Object
//     let ewo = {
//         id: 0,
//         project: req.body.project,
//         description: req.body.description,
//         quantity: req.body.quantity,
//         material: req.body.material,
//         duedate: req.body.duedate,
//         chargecode: req.body.chargecode,
//         cleaning: req.body.cleaning,
//         template: req.body.template,
//         notes: req.body.notes,
//         name: req.body.name,
//         number: req.body.number,
//         reng: req.body.reng,
//         specialist: req.body.specialist,
//         site: req.body.site,
//         status: 'new'
//     }
//     // Insert Object into DB
//     connection.connect()
//     connection.query('SELECT * FROM ewos', (error, results, fields) => {
//         if (error) {
//             console.error('Error finding table', error);
//         } else {
//             ewo.id = results.length + 1;
//             const tableData = results;
//             connection.query('INSERT INTO ewos SET ?', ewo, (error, results, fields) => {
//                 if (error) {
//                     console.error('Error creating new EWO:', error);
//                 } else {
//                     console.log('New com inserted successfully.', results.insertId);
//                 }
//             })
//             // tableData.push(ewo)
//             res.send(tableData)
//         }
//     })
//     connection.end
// })

// app.get('/api/jules', (req, res) => {
//     // Using SQL Database
//     console.log('Acquiring current eWos')
//     connection.connect()
//     connection.query('SELECT * FROM ewos', (error, results, fields) => {
//         if (error) {
//             console.error('Error finding table', error);
//         } else {
//          //   console.log(tableData)
//          const tableData = results;
//         res.send(tableData)
//         }
//     })
//     connection.end
// })
    

// app.get('/api/jules/delete/:id', (req, res) => {
//     connection.connect()
//     connection.query(`DELETE FROM ewos WHERE id = '${req.params.id}'`, (error, results, fields) => {
//         if (error) {
//             console.error('Error deleting row: ' + error.stack);
//         } else {
//             console.log(`Row ${req.params.id} deleted successfully`)
//             //res.send(tableData)
//         }
//     })
//     connection.end
// })

// // OLD DEPRACATED WAY TO RUNNING OKTA DIRECTLY FROM SERVER
// async function okta(driver) {
// await driver.get('https://blueorigin.okta.com/login/agentlessDsso/auth');
// await new Promise(resolve => setTimeout(resolve, 5000));
// let okta = await driver.findElements(By.css('a.button.select-factor.link-button'));
// await okta[1].click();
// await new Promise(resolve => setTimeout(resolve, 15000));
// }


// ///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// // @04                               Commands for the comments database
// ///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// // app.post('/comments/post', requireAuth, (req, res) => {
// //     // Using Local file system
// //     // Create new Object
// //     let newCom = {
// //         id: 0,
// //         name: req.cookies['user'],
// //         msg: req.body.msg
// //     }
// //     console.log('********************************')
// //     // console.log(newCom)
// //     // Insert Object into DB
    
// //         connection.query('SELECT * FROM comments', (error, results, fields) => {
// //             if (error) {
// //                 console.error('Error finding table', error);
// //             } else {
// //                 if (results.length == 0) {
// //                     newCom.id = 1;
// //                 }
// //                 else newCom.id = results[results.length-1].id+1
// //                 const tableData = results;
// //                 connection.query('INSERT INTO comments SET ?', newCom, (error, results, fields) => {
// //                     if (error) {
// //                         console.error('Error inserting new comment:', error);
// //                     } else {
// //                         console.log('New com inserted successfully.', results.insertId);
// //                     }
// //                 })
// //                 tableData.push(newCom)
// //                 res.send(tableData)
// //             }
// //         })

// //     })


// // Delete row from comments
// // app.get('/comments/:id', (req, res) => {
// //     let coms;
// //         // Delete chosen comment
// //         connection.query('DELETE FROM comments WHERE id = ?', req.params.id, (error, results, fields) => {
// //             if (error) {
// //                 console.error('Error deleting entry:', error)
// //             }
// //             else {
// //                 console.log('Entry deleted successfully')
// //             } 
// //         })
// //         // Send the comment back to user
// //         const com = coms.find(c => c.id === parseInt(req.params.id))
// //         if (!com) {
// //             return res.status(404).send(`No comment found for id: ${req.params.id}`) 
// //         }// 404
// //         res.send(com)
// //     })
// // })

// // app.get('/comments', (req, res) => {
// //     res.set('Access-Control-Allow-Origin', '*');

// //     // Retrieve comments table
// //         connection.query('SELECT * FROM comments', (error, results, fields) => {
// //             if (error) {
// //                 console.error('Error finding table', error);
// //             } else {
// //                 const tableData = results;
// //              //   console.log(tableData);
// //                 res.send(tableData)
// //             }
// //         })

// //     })
// // })


// ///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// // @05                          User authentication  This is ported to MVC approach
// ///////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// // Log user in
// // app.post('/api/users/auth', (req, res) => {
// //     const { username, password } = req.body
// //     if (!username || !password) {
// //         console.log('No username or password')
// //         return res.status(400).json({
// //             msg: "Username or Password not provided",
// //         })
// //     }
// //      // Retrieve users database
// //     connection.query('SELECT * FROM users', (error, results, fields) => {
// //     if (error) {
// //         console.error('Error finding table', error);
// //     } else {
// //     const allUsers = results;
// //     const loc = getIndex(username, allUsers)
// //         if (typeof loc === 'number') {
// //             bcrypt.compare(password, allUsers[loc].password).then(function (result) {
// //                 console.log(result)
// //                 if (result) {
// //                     res.status(200).json({
// //                         user: allUsers[loc].username,
// //                         msg: "Login Successful",
// //                     })
// //                  } else res.status(200).json({ 
// //                     user: 'Guest',
// //                     msg: "Password incorrect" 
// //                 })
// //                 })
// //             } else res.status(200).json({ 
// //                 user: 'Guest',
// //                 msg: "User does not exist" 
// //             })
// //         }
// //     })
// // })

// //  // Elevate user to admin
// //  app.post('/api/users/elevate', (req, res) =>{

// //  })

// //  // Delete user
// //  app.get('/api/users/delete/:username', (req, res) => {
// //     connection.query('DELETE FROM users WHERE username = ?', req.params.username, (error, results, fields) => {
// //         if (error) {
// //             console.error('Error deleting entry:', error)
// //         }
// //         else {
// //             console.log('Entry deleted successfully')
// //         } 
// //     })
// //  })

// //  function getIndex(username, allUsers) {
// //     for (let i = 0; i < allUsers.length; i++) {
// //         if (allUsers[i].username === username) {
// //             return index = i
// //         }
// //     }
// //     return null; // Return null if user is not found
// // }

// ////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// // @06                     Project Management
// ////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// // Grab project table data
// // app.get('/api/projects/veex/:id', (req, res) => {
// //     res.set('Access-Control-Allow-Origin', '*');
// //     let x = req.params.id;
// //     connection.query('SELECT * FROM projects', (error, results, fields) => {
// //         if (error) {
// //             console.error('Error finding table', error);
// //         } else {
// //             const tableData = results;
// //             for (let i = 0; i < tableData.length; i++) {
// //                 if (tableData[i].id == x) y = i; 
// //             }
// //             res.send(tableData[y])
// //         }
// //     })
// // })

// // app.get('/api/projects/veex', (req, res) => {
// //     res.set('Access-Control-Allow-Origin', '*');
// //     //let x = req.params.id;
// //     connection.query('SELECT * FROM projects', (error, results, fields) => {
// //         if (error) {
// //             console.error('Error finding table', error);
// //         } else {
// //             const tableData = results;
// //             res.send(tableData)
// //         }
// //     })
// // })

// // app.post('/api/projects/veex/add', (req, res) => {
// //     const { name, manager, shiftA1, shiftA2, shiftA3, shiftB1, shiftB2, shiftB3, dsceA1, dsceB1, dsceA2, dsceB2, summary, active } = req.body
// //     let newProj = {
// //         name:name,
// //         manager:manager,
// //         shiftA1:shiftA1,
// //         shiftA2:shiftA2,
// //         shiftA3:shiftA3,
// //         shiftB1:shiftB1,
// //         shiftB2:shiftB2,
// //         shiftB3:shiftB3,
// //         dsceA1:dsceA1,
// //         dsceB1:dsceB1,
// //         dsceA2:dsceA2,
// //         dsceB2:dsceB2,
// //         summary:summary,
// //         active:active,
// //     }
// //     connection.query('SELECT * FROM projects', (error, results, fields) => {
// //         if (error) {
// //             console.error('Error finding table', error);
// //         } else {
// //             if (results.length == 0) {
// //                 newProj.id = 1;
// //             }
// //             else newProj.id = results[results.length-1].id+1
// //             // const tableData = results;
// //             connection.query('INSERT INTO projects SET ?', newProj, (error, results, fields) => {
// //                 if (error) {
// //                     console.error('Error inserting new project:', error);
// //                 } else {
// //                     console.log('New project inserted successfully.', results.insertId);
// //                 }
// //             })
// //             // tableData.push(newProj)
// //             // res.send(tableData)
// //             output = {
// //                 msg:'Complete'
// //             }
// //             res.send(output)
// //         }
// //     })
// // })

// // Delete project
// // app.get('/api/projects/veex/delete/:name', (req, res) => {
// //     // Delete chosen comment
// //     connection.query('DELETE FROM projects WHERE name = ?', req.params.name, (error, results, fields) => {
// //         if (error) {
// //             console.error('Error deleting entry:', error)
// //         }
// //         else {
// //             console.log('Entry deleted successfully')
// //         } 
// //     })
// //     // Send the comment back to user
// //     output = {
// //         msg:'Complete'
// //     }
// //     res.send(output)
// // })

// // Edit and existing project
// // app.post('/api/projects/veex/edit/:name', (req, res) => {
// //     let id = 0;
// //     connection.query('SELECT * FROM projects', (error, results, fields) => {
// //         if (error) {
// //             console.error('Error finding table', error);
// //         } else {
// //             for (i = 0; i < results.length; i++) {
// //                 if (results[i].name == req.params.name) { id = results[i].id; console.log(`ID for ${req.params.name} = ${id}`); break; }
// //             }
// //             const updateQuery = `UPDATE projects SET name = '${req.body.name}', manager = '${req.body.manager}', shiftA1 = '${req.body.shiftA1}',
// //                                 shiftA2 = '${req.body.shiftA2}', shiftA3 = '${req.body.shiftA3}', shiftB1 = '${req.body.shiftB1}',
// //                                 shiftB2 = '${req.body.shiftB2}', shiftB3 = '${req.body.shiftB3}', dsceA1 = '${req.body.dsceA1}', dsceA2 = '${req.body.dsceA2}',
// //                                 dsceB1 = '${req.body.dsceB1}', dsceB2 = '${req.body.dsceB2}', summary = '${req.body.summary}', active =  '${req.body.active}'
// //                                 WHERE id = '${id}'`
// //             connection.query(updateQuery, (error, results, fields) => {
// //                 if (error) console.error('Error updating', error);
// //                 else { console.log('Entry updated successfully'); output = { msg: 'All Good' }; res.send(output) }
// //             })
// //         }
// //     })
// // })


// /////////////////////////////////////////
// // @0X TEST CODE AND COMMUNICATION FRAMEWORKS
// /////////////////////////////////////////

// app.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) return res.status(404).send(`No course found for id: ${req.params.id}`) // 404
//     res.send(course)
// })

// app.get('/api/posts/:year/:month', (req,res) => {
//     res.send(req.query);
// })


// app.post('/api/courses', (req, res)  => {
//     // Input validation
//     //if (!req.body.name || req.body.name.length <3) {
//     //    res.status(400).send('Name is required and should be a a minimum of 3 chararacters.')
//     //    return;
//     //}
//     // Input validation using Joi schemas
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     })
//     const {error, value} = schema.validate(req.body)
//     console.log(value)
//     if (error) return res.status(400).send(error.details[0].message)
    

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(course);
// })

// app.put('/api/courses/:id', (req, res) => {
//     // Look up the course
//     // Return 404 if no exist
//     const course = testJson.find(c => c.id === parseInt(req.params.id))
//     if (!course) return res.status(404).send(`No course found for id: ${req.params.id}`) // 404

//     //Validate
//     //Return 404 if invalid
//    const [error, value] = validateCourse(req.body)
//     if (error) {
//         res.status(400).send(error.details[0].message)
//         return
//     } 
    
//     //If good, update course and return to client
//     course.name = req.body.name;
//     res.send(course);
// })

// app.delete('/api/courses/:id', (req,res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) return res.status(404).send(`No course found for id: ${req.params.id}`) // 404

//     const index = courses.indexOf(course); // get index of course from courses
//     courses.splice(index, 1) // Delete indices starting at index and deleting 1 entry

//     res.send(course)

// })


// // environment variable
const port = process.env.PORT || 4000 // use the chosen variable if available, if not use 3000
app.listen(port, () => console.log(`Listening on port ${port}`))

// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('Hello, this is an HTTP server!');
// });

// server.listen(8080, () => {
//   console.log('HTTP server running on port 8080');
// });


// // const server = require('http').createServer(app)
// // const io = io.listen(server)

// // server.listen(80)

// function validateCourse(course) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     })
//     const { error, value } = schema.validate(course)
//     return [error, value] // If returned as an array, must be called as an array
// }

// function execPy() {
//     exec('python yourscript.py', (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error: ${error.message}`);
//           return;
//         }
//         if (stderr) {
//           console.error(`stderr: ${stderr}`);
//           return;
//         }
//         console.log(`stdout: ${stdout}`);
//       });
// }

// // THIS IS JUST A TEST
// app.get('/api/python', (req, res) => { //request and response
//     res.set('Access-Control-Allow-Origin', '*');
//     console.log('step 1')
//     // const pythonProcess = spawn('python', ['../Viper/testpy.py'], {stdio: 'pipe'})
//     // pythonProcess.stdin.write(JSON.stringify({ functionName: 'Fyou', input: 7 }))
//     // pythonProcess.stdin.end();
//     // pythonProcess.stdout.on('data', (data) => {
//     //     console.log(data);
//     // })

//     const inputVariables = {
//         variable1: 'value1',
//         variable2: 'value2',
//     // add more input variables as needed
//     };

    
//     // axios.post('http://localhost:5000/call-python-function', inputVariables)
//     //     .then(response => {
//     //         console.log(response.data);
//     //     })
//     //     .catch(error => {
//     //         console.error('Error calling Python function:', error);
//     //     });
    
//     const connection2 = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '*star48cerea1',
//         database: 'jules'
//     })
//     console.log('Starting eWO creation script')
//         connection2.connect((err) => {
//             if (err) {
//                 console.error('Error connecting to database', err)
//                 return
//             }
//             console.log('Connected to database');
//             connection2.query('SELECT * FROM ewos', (error, results, fields) => {
//                 if (error) {
//                     console.error('Error finding table', error);
//                 } else {
//                     const tableData = results;
//                     axios.post('http://localhost:5000/julesModify', tableData[0]).then(response => {
//                         console.log(response.data);
//                     })
//                     .catch(error => {
//                         console.error('Error calling Python function:', error);
//                     });                                    
//                 }
//         })
//     })   
// })

// // module.exports = connection
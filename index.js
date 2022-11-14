const express = require('express'); 
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const dataList = [];

app.get('/data', (req, res) => {
    res.status(200).send(dataList);
    return;
})


app.post('/data', (req, res) => {
    let {title, content} = req.body;
    if(!title){
        res.status(400).send({success: false, message:'title is missing'})
    }
    if(!content){
        res.status(400).send({success: false, message:'content is missing'})
    }
    dataList.push({title, content});
  
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adujosephayo@gmail.com',
            pass: 'gadlbbmbebsrwxbc'
        }
    });

    let mailDetails = {
        from: content.email,
        to: 'help@nanoqode.com',
        subject: title,
        text: `Content: ${JSON.stringify(content)}`
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err)
            res.status(400).send({data: err})
        } else {
            console.log('Email sent successfully');
            res.status(201).send({...data, message: 'sent to mail'})
        }
    });
    
});

app.listen("8080", () => {
    console.log('connect')
})
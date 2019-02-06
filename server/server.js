const nodemailer = require('nodemailer');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

require('dotenv').config()

// POST route from contact form
app.post('/contact', function (req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });
    mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;',
      to: process.env.USER,
      subject: 'New message from contact form at lukehouge.com',
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        res.render('contact-failure');
      }
      else {
        res.render('contact-success');
      }
    });
  });
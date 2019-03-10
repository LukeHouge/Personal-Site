let http = require("http");
let https = require("https");
let url = require("url");
let fs = require("fs");

http.createServer((request, response) => {
    let pathName = url.parse(request.url).pathname;

    if (pathName === "/contact" && request.method === "POST") {
        var postData = "";

        request.on("data", function (data) {
            postData += data;
        });

        request.on("end", function () {
            sendMail(JSON.parse(postData));
        });
    }

}).listen(3005);

function sendMail(message) {
    var stream = fs.createWriteStream("mailScript.sh"); //creates a write stream to mailScript.sh script file
    stream.once('open', function (fd) { //file descriptor so you will be able to close stream
        stream.write("   echo " + message + " | mail -s 'New Form Submission from lukehouge@gmail.com' lukehouge@gmail.com"); //sets recipient to the address
        stream.end(); //finishes writing the file
    });


    //code to actually execute the script
    const exec = require("child_process").exec;
    var yourscript = exec(
        "sh mailScript.sh", //command to run that executes the script
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        }
    );
}

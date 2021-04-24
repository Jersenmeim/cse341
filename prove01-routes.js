const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<h1>Create User</h1>');
        res.write(
            '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<h1>User List</></h1>');
        res.write('<body><ul>');
        res.write('</ul></body>');
        var i;

        const readFileLines = filename =>
            fs
            .readFileSync(filename)
            .toString('UTF8')
            .split('\n');


        // Driver code
        let arr = readFileLines('users.txt');
        for (i = 0; i < arr.length; i++) {
            res.write(`<li> ${arr[i]}</li>`)
        }
        res.write('</html>');
        return res.end();
    }
    // Send a HTML response with some "Page not found text
    if (url === '/create-user') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const usernames = parsedBody.split('=')[1];

            // fs.writeFile('users.txt', JSON.stringify(users), function (err) {
            //     if (err) return console.log(err);

            // });

            const CreateFiles = fs.createWriteStream('./users.txt', {
                flags: 'a' //flags: 'a' preserved old data
            })
            CreateFiles.write(usernames + '\r\n');

            console.log(usernames); // username=whatever-the-user-entered
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
};

exports.handler = requestHandler;
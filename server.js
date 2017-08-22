const PORT = process.env.PORT || 9775;

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath === "./") {
        filePath = "./index.html";
    }

    let extname = path.extname(filePath);

    let mime = "text/html";

    switch (extname) {
        case ".css":
            mime = "text/css";
            break;
        case ".js":
            mime = "text/js";
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end();
        }

        res.writeHead(200, { "Content-Type": mime });
        res.end(data, "utf-8");
    });
});

server.listen(PORT, () => {
    console.log("Server is listening\nhttp://localhost:%s", PORT);
});

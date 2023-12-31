import * as http from 'http';
import {checkOrderCount} from "./mini-ruche-notifier.js";
import {config} from "dotenv";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    config();
    checkOrderCount();
});
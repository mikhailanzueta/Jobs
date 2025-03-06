"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./config"));
const signupRoutes_1 = require("./Routes/signupRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
// USE JSON
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: config_1.default.session_secret,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/", (req, res) => {
    const headers = req.headers;
    res.status(200).send("Hello world!!");
});
app.use('/api', signupRoutes_1.router);
app.listen(config_1.default.port, () => {
    console.log(`Server listening on port ${config_1.default.port}`);
    console.log(`http://localhost:${config_1.default.port}/`);
});

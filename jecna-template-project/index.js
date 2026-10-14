import 'dotenv/config';
import express              from 'express';
import sessions             from 'express-session';
import passport             from "passport";
import path, {dirname}      from 'path';
import {fileURLToPath}      from 'url';
import methodOverride       from "method-override";
import {rootIndexAction}    from "./controllers/rootController.js";
import {initPassport}       from "./utils/passport-config.js";
import {checkAuthenticated} from "./utils/auth.js";
import {flash}              from "./utils/flash.js";
import authRouter           from "./routes/auth.js"

//Init Root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.APP_PORT || 5000;
initPassport(passport);

//Create APP
const app = express();

//Set engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configure APP
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))
app.use(flash);

//Load CSS & JS
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use(express.static(path.join(__dirname, 'public')));

//Base routes
app.get('/', checkAuthenticated, rootIndexAction);
app.use(authRouter);
app.use((req, res) => {
    res.status(404).render("util/404", {title: "Page not found"})
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

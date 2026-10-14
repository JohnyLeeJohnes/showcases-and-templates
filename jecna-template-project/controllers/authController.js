import {hashPassword} from "../service/authentication.js"
import {insertUser}   from "../repository/userRepository.js";
import crypto         from "crypto";
import passport       from "passport";

export const loginIndexAction = async (req, res) => {
    res.render("login", {title: "Login"});
}

export const registerIndexAction = async (req, res) => {
    res.render("register", {title: "Register"});
}

export const loginAction = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
});

export const registerAction = async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        req.flash('error', "Fill in all the fields");
        return res.redirect("/register");
    }
    try {
        await insertUser({
            id: crypto.randomUUID(),
            username,
            email,
            password: hashPassword(password),
        });
        req.flash('success', "User successfully registered")
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        req.flash('error', error.code === 'ER_DUP_ENTRY' ? "Username is already taken" : "Registration failed");
        res.redirect("/register");
    }
}

export const logoutAction = async (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect("/login");
    });
}

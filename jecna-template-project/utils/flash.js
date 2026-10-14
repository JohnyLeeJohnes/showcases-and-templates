// Flash messages: req.flash('error', 'text') stores a message in the session,
// the next rendered page shows it (as `messages` in the views) and removes it
export const flash = (req, res, next) => {
    req.flash = (type, message) => {
        req.session.flash ??= {};
        (req.session.flash[type] ??= []).push(message);
    };

    const render = res.render;
    res.render = function (...args) {
        res.locals.messages = req.session.flash ?? {};
        delete req.session.flash;
        return render.apply(this, args);
    };
    next();
}

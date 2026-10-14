export const rootIndexAction = async (req, res) => {
    res.render('index', {title: "Index", user: req.user});
}

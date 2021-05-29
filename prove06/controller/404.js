//404 Page
exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: req.url,
        isAuthenticated: req.session.isLoggedIn
    });
};
//500 page
exports.get500 = (req, res, next) => {
    res.status(500).render('500', {
        path: req.url,
        title: 'error 500',
        isAuthenticated: req.isLoggedIn
    });
}
exports.getIndex = (req, res, next) => {
    // This is the primary index, always handled last. 
    res.render('pages/index', {
        title: 'Welcome to my CSE341 repo',
        path: '/'
    });
};


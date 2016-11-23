let router = require('express').Router();

router.get('*', (req, res, next) => {
	res.render('not-found');
});

module.exports = router;
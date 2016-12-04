let router = require('express').Router();

router.get('*', (req, res) => {
	res.render('not-found');
});

module.exports = router;

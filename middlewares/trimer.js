module.exports = function (req, res, next) {
  if (req.body) {
    let fileds = req.body;
    for(let prop in fileds) {
      if (typeof fileds[prop] === 'string') fileds[prop] = fileds[prop].trim();
    }
  }
  next()
};

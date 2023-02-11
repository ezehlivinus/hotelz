module.exports = (error, req, res, next) => {

  next(error);
  return res.status(500).send(data);
};
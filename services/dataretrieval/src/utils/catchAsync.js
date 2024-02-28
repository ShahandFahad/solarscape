// Handling try-catch here. In order to avoid redundant try-catch block
module.exports = (fn) => {
  // Recieves async function
  // Incase of promise rejection: Pass to global error handling middleware
  // Else return an anonymous function
  return (req, res, next) => {
    fn(req, res, next).catch(next); // (err) => next(err) : same as .catch(next)
  };
};

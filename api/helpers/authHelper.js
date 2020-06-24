module.exports = {
    isAuthorized: async (req, res, next) => {
        if (req.session.user && req.cookies['gcc-isolation-tracker']) {
          next();
        } else {
            res.status(401).json({
                message: 'Unauthorized'
              });
        }
      }
  };  
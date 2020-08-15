const {REGION} = require('../constants');
module.exports = {
    isAuthorized: async (req, res, next) => {
        if (req.session.user && req.cookies['gcc-isolation-tracker'] && req.session.user.region === req.headers.region) {
          next();
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
      },
      isAdmin: async (req, res, next) => {
        if (req.headers.authorization && req.headers.region && REGION.includes(req.headers.region)) {
            const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
            const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');
            if (user && password && user === process.env.SECURITY_USER && password === process.env.SECURITY_PASSWORD) {
                return next();
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
      }
  };

module.exports = {
    isAuthorized: async (req, res, next) => {
        if (req.session.user && req.cookies['gcc-isolation-tracker']) {
          next();
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
      },
      isAdmin: async (req, res, next) => {
        if (req.headers.authorization) {
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
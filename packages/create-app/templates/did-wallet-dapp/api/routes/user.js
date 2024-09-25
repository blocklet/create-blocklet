const AuthService = require('@blocklet/sdk/service/auth');
const middlewares = require('@blocklet/sdk/lib/middlewares');

const authClient = new AuthService();

module.exports = {
  init(app) {
    app.get('/api/did/user', middlewares.user(), async (req, res) => {
      res.json({
        user: req.user,
      });
    });

    app.get('/api/user', middlewares.user(), async (req, res) => {
      if (!req.user) {
        res.json({ user: null });
        return;
      }
      try {
        const { user } = await authClient.getUser(req.user.did);
        user.role = user.role || req.user.role;
        res.json({ user });
      } catch (err) {
        console.error(err);
        res.json({ user: null });
      }
    });
  },
};

const { BlockletService } = require('@blocklet/sdk/service/auth');
const { sessionMiddleware } = require('@blocklet/sdk/lib/middlewares/session');

const authClient = new BlockletService();

module.exports = {
  init(app) {
    // sessionMiddleware() is used to get the user info from the session, see more: https://www.arcblock.io/docs/blocklet-developer/blocklet-sdk#session
    app.get('/api/user', sessionMiddleware(), async (req, res) => {
      if (!req.user) {
        res.json({ user: null });
        return;
      }
      try {
        // get user info from auth service
        const { user } = await authClient.getUser(req.user.did);
        user.role = user.role || req.user.role;
        res.json({ user });
      } catch (err) {
        console.error(err);
        res.json({ user: null });
      }
    });
    app.get('/api/data', (req, res) => {
      res.json({
        message: 'Hello Blocklet!',
      });
    });
  },
};

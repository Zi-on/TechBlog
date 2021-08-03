const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Get all users, sorted by name
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // Serialize user data so templates can read it
    const users = userData.map((project) => project.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { users });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if(!userData) {
            res.status(404).json({ message: "Incorrect email, please try again." });
            return;
        }

        const goodPassword = await User.checkPassword(req.body.password);

        if(!goodPassword) {
            res.status(404).json({ message: "Incorrect password, please try again." });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in." });
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;

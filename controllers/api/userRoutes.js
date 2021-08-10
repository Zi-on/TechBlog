const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: 'password'},
        });
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userId = await User.findByPk(req.params.id);
        res.status(200).json(userId)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.logged_in = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
      try {
          const userData = await User.destroy({ 
              where: { 
                  id: req.params.id
              }
          });

          if (!userData) {
              res.status(404).json({ message: "No user found with that id"});
              return;
          }
          res.status(200).json(userData);
      } catch (err) {
          res.status(500).json(err);
      }
  })

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
        console.log("hiß")
      res.status(404).end();
    }
  });

module.exports = router;

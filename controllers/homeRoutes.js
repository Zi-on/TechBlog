const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { post } = require('./api');


router.get('/', withAuth, async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const userData = await User.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'body', 'user_id'],
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'user_id', 'post_id'],
            include: {
                model: User,
                attributes: ['name']
            }
          }
        ],
      });
  
      // Serialize data so the template can read it
      const user = userData.get({ plain: true });
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        user, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    const id = req.params.id;
    res.redirect(`/profile/${id}`);
    return;
  }
  res.render('login', {
    logged_in: req.session.logged_in,
  });
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      const id = req.params.id
      res.redirect(`profile/${id}`);
      return;
    }
    res.render('signup', {
        logged_in: req.session.logged_in,
    });
  });

  router.get('/dashboard', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
          attributes: [
            'id',
            'title',
            'body'
          ],
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'user_id', 'post_id'],
            include: {
                model: User,
                attributes: ['name']
            }
          }
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map(post => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/profile/:id', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{
          model: Post,
          attributes: ['id', 'title', 'body'],
        }],
      });
      const user = userData.get({ plain: true});
      res.render('profile', { user, logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  })
 
      // Get all projects and JOIN with user data
      // router.get('/profile', async (req, res) => {
      //   try {
      //     // Get all projects and JOIN with user data
      //     const postData = await Post.findAll({
      //         attributes: [
      //           'id',
      //           'title',
      //           'body'
      //         ],

      //       include: [
      //         {
      //           model: User,
      //           attributes: ['name'],
      //         },
      //         {
      //           model: Comment,
      //           attributes: ['id', 'text', 'user_id', 'post_id'],
      //           include: {
      //               model: User,
      //               attributes: ['name']
      //           }
      //         }
      //       ],
      //     });
      
      
      //     // Serialize data so the template can read it
      //     const posts = postData.map(post => post.get({ plain: true }));
      
      //     // Pass serialized data and session flag into template
      //     res.render('profile', { 
      //       posts, 
      //       logged_in: req.session.logged_in 
      //     });
      //   } catch (err) {
      //     res.status(500).json(err);
      //   }
      // });

           // Get all projects and JOIN with user data
           router.get('/addPost', async (req, res) => {
            try {
              // Get all projects and JOIN with user data
              const postData = await Post.findAll({
                  attributes: [
                    'id',
                    'title',
                    'body'
                  ],
                include: [
                  {
                    model: User,
                    attributes: ['name'],
                  },
                  {
                    model: Comment,
                    attributes: ['id', 'text', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                  }
                ],
              });
          
              // Serialize data so the template can read it
              const posts = postData.map(post => post.get({ plain: true }));
          
              // Pass serialized data and session flag into template
              res.render('add-post', { 
                posts, 
                logged_in: req.session.logged_in 
              });
            } catch (err) {
              res.status(500).json(err);
            }
          });

          router.get('/edit-post/:id', (req, res) => {
            Post.findOne({
              where: 
              {
                id: req.params.id
              },
              attributes: [
                'id',
                'title',
                'body'
              ],
              include: [
                {
                  model: User, attributes: ['name']
                },
                //  {
                //    model: Comment, attributes: ['id', 'text', 'user_id', 'post_id'],
                //     include: [{model: Comment, attributes: ['name']}]
                //  }
                  ]
            }).then(postData => {
              if (!postData) {
                res.status(404).json({message: 'No post found'});
                return;
              }
              res.render('edit-post');
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err)
            })
          });

module.exports = router
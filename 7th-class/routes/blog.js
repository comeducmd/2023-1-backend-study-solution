const express = require('express');

const Post = require('../models/post.js');

const router = express.Router();

router.get('/', function(req, res) {
  Post.find()
  .then(function(posts) {
    res.render('home.ejs', { posts: posts });
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/post/:id', function(req, res) {
  Post.findById(req.params.id)
  .then(function(post) {
    res.render('post.ejs', { post: post });
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/add-post', function(req, res) {
  res.render('post-add-form.ejs');
});

router.post('/add-post', function(req, res) {
  const newPost = new Post({ title: req.body.title , content: req.body.content });
  newPost.save()
  .then(function(post) {
    res.redirect(`/post/${post._id}`);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.get('/edit-post/:id', function(req, res) {
  Post.findById(req.params.id)
  .then(function(post) {
    res.render('post-edit-form.ejs', { post: post });
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.post('/edit-post', function(req, res) {
  Post.findById(req.body.postId)
  .then(function(post) {
    post.title = req.body.title;
    post.content = req.body.content;
    return post.save();
  })
  .then(function(post) {
    res.redirect(`/post/${post._id}`);
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.post('/delete-post', function(req, res) {
  Post.findByIdAndDelete(req.body.postId)
  .then(function() {
    res.redirect('/');
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [{
      model: Product,
      attributes: ['product_name'] 
    }]
  }).then(categories => {
    res.json(categories);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['product_name'] 
    }]
  }).then(dbCategory => {
    res.json(dbCategory);
  }); 
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(dbCategory => {
    res.json(dbCategory);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    res.json(dbCategory);
  }); 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    res.json(dbCategory);
  }); 
});

module.exports = router;

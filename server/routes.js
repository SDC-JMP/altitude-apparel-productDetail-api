const express = require('express');
const router = express.Router();
const db = require('../database/queries.js');

router.get('/products', (req, res) => {
  db.getAllProducts((err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id', (req, res) => {
  console.log('id in route', req.params.product_id)
  db.getProductInfo(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
router.get('/products/:product_id/styles', (req, res) => {
  console.log('id in route productStyle', req.params.product_id)
  db.getProductStyle(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id/related', (req, res) => {
  console.log('id in route related product', req.params.product_id)
  db.getRelateProducts(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
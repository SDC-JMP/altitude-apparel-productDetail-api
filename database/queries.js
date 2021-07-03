/* eslint-disable max-len */
const { Pool } = require('pg');
const { config } = require('./config.js');

const pool = new Pool(config);

pool.connect((err) => {
  console.log('connecting to postgreSQL');
});


const getAllProducts = (callback) => {
  const queryString = 'SELECT * FROM products LIMIT 10000';
  pool.query(queryString, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
      console.log('results', results);
    }
  });
};

const getProductInfo = (product_id, callback) => {
  console.log('product_id', product_id);
  const queryString = `select products.product_id as id, product_name as name, slogan, product_description as description, category, default_price, jsonb_agg(json_build_object('feature', features.feature_name, 'value', features.feature_value)) as features from products join features on features.product_id = products.product_id where products.product_id = $1 group by products.product_id`;

  pool.query(queryString, [product_id], (err, results) => {
    if (err) {
      callback(err, null);
      console.log(err);
    } else {
      callback(null, results.rows[0]);
    }
  });
};

const getProductStyle = (product_id, callback) => {
  const queryString = `select styles.style_id, style_name as name, sale_price, original_price, default_style as default?, jsonb_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos, jsonb_object_agg('sku_id', json_build_object('quantity', skus.quantity, 'size', skus.size)) as skus from styles join photos on photos.style_id = styles.style_id join skus on skus.style_id = styles.style_id where styles.product_id = $1 group by styles.style_id`;

  pool.query(queryString, [product_id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
};

const getRelateProducts = (product_id, callback) => {
  const queryString = `select jsonb_agg(related.related_product_id) as related from related where product_id = $1`;
  pool.query(queryString, [product_id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.rows);
    }
  });
}

module.exports = {
  getAllProducts, getProductInfo, getProductStyle, getRelateProducts
};

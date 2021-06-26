
DROP DATABASE IF EXISTS product_detail;
CREATE DATABASE product_detail;
\c product_detail
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  product_id BIGSERIAL PRIMARY KEY,
  product_name VARCHAR,
  slogan VARCHAR,
  product_description VARCHAR,
  category VARCHAR,
  default_price INTEGER
);

COPY products
FROM '/Users/phongtrinh/co1712/projects/product.csv'
DELIMITER ','
CSV HEADER
;
DROP TABLE IF EXISTS features;
CREATE TABLE features (
  feature_id BIGSERIAL PRIMARY KEY,
  product_id INTEGER,
  feature_name VARCHAR,
  feature_value VARCHAR,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

COPY features
FROM '/Users/phongtrinh/co1712/projects/features.csv'
DELIMITER ','
CSV HEADER;
DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  style_id BIGSERIAL PRIMARY KEY,
  product_id INTEGER,
  style_name VARCHAR,
  sale_price VARCHAR,
  original_price VARCHAR,
  default_style BOOLEAN,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

COPY styles
FROM '/Users/phongtrinh/co1712/projects/styles.csv'
DELIMITER ','
CSV HEADER;
DROP TABLE IF EXISTS related;
CREATE TABLE related (
  related_id BIGSERIAL PRIMARY KEY,
  product_id INTEGER,
  related_product_id INTEGER,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

COPY related
FROM '/Users/phongtrinh/co1712/projects/related.csv'
DELIMITER ','
CSV HEADER;
DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  sku_id BIGSERIAL PRIMARY KEY,
  style_id INTEGER,
  size VARCHAR,
  quantity INTEGER,
  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

COPY skus
FROM '/Users/phongtrinh/co1712/projects/skus.csv'
DELIMITER ','
CSV HEADER;
DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  photo_id BIGSERIAL PRIMARY KEY,
  style_id INTEGER,
  thumbnail_url VARCHAR,
  url VARCHAR,

  FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

COPY photos
FROM '/Users/phongtrinh/co1712/projects/photos.csv'
DELIMITER ','
CSV HEADER;
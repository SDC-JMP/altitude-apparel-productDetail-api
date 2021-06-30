import http from 'k6/http';
import {sleep, check} from 'k6';
// export default function () {
//   http.get('http://localhost:3000/products');
//   sleep(1);
// }

// export default function () {
//   let res = http.get('http://localhost:3000/products');
//   check(res, {
//     'is status 200': (r) => r.status === 200,
//   });
// }
// {duration: '20s', target:500}
export let options = {
  stages: [{duration: '60s', target:1000}]
}
export default function () {
  for ( var product_id = 1000011; product_id >= 1000011 - 1000; product_id--) {
    let res = http.get(`http://localhost:3000/products/${product_id}`);
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
    sleep(1);
  }
}
// export default function () {
//   http.get('http://localhost:3000/products/product_id');
//   sleep(1);
// }
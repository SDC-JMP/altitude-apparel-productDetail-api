import http from 'k6/http';
import {sleep, check} from 'k6';
// export default function () {
//   http.get('http://localhost:3000/products');
//   sleep(1);
// }

export default function () {
  let res = http.get('http://localhost:3000/products');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
// export default function () {
//   http.get('http://localhost:3000/products/product_id');
//   sleep(1);
// }
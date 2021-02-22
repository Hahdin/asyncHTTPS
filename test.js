import * as asyncHTTPS from './handler.js';

// set host and path to resource you want to fetch
try { // async/await needs try/catch
  asyncHTTPS.config({
    host: 'jsonplaceholder.typicode.com',// << very handy free api for fake test data
    path: '/posts/1',
    // method: 'GET', // default
  });

  let res = await asyncHTTPS.handler();

  console.table(res);

} catch (e) {// catch bad path/method/etc

  console.log(e.message);

  process.exit(999);
}

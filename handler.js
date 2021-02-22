import * as https from 'https';

let hostname = '',
    path     = '',
    method   = '',
    protocol = 'https:',
    headers = {
      'Content-Type': 'application/json'
    };


const validMethods = [
  'GET', 'POST', 'PUT', 
  'DELETE', 'HEAD', 'CONNECT', 
  'OPTIONS', 'TRACE', 'PATCH'
];

/**
 * Set connection params
 * 
 * @param  options host, path and method 
 */
const config = options => {
  if (options.method && !validMethods.includes(options.method)) {
    // the error message you always wished you could send.. don't lie, you know its true
    throw new Error(`wtf??: unknown method ${options.method}... are you drunk?`);
  }
  // toss if not supported
  if (options.method && options.method !== 'GET') {
    throw new Error(`Unsupported METHOD: '${options.method}', try back later.`);
  }

  hostname = options.host;
  path     = options.path;
  method   = options.method ?? 'GET';
};

/**
 * Handle the https request
 */
const handler = () => {
  return new Promise((resolve, reject) => {

    let data    = '';

    let options = {
      protocol,
      hostname,
      path,
      method,
      headers,
    };

    try {
      const request = https.request(options);

      request.on('response', (res) => {

        res.setEncoding('utf8');//<< set if fetching json unless you want raw buffer data

        res.on('data', resData => data += resData);

        res.on('end', () =>  resolve(JSON.parse(data)));

      }).on('error', error => reject( error));

      request.end();

    } catch(e) {

      reject(e);
    }
  });
}
export { handler, config };
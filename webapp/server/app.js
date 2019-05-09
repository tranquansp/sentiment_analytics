const Koa = require('koa');
const convert = require('koa-convert');
const logger = require('koa-logger');
const dotenv = require('dotenv');
const json = require('koa-json');
const co = require('co');
const path = require('path');
const cors = require('kcors');
const helmet = require('koa-helmet');
const bodyparser = require('koa-body');
const serve = require('koa-static');
const staticServe = require('koa-static-server');

var rootFolder = path.normalize(__dirname + '/..');

dotenv.load({
  path: `${rootFolder}/.env`
});

const app = new Koa();

// Error handling
app.use((ctx, next) => {
  return next().catch(err => {
    let env = process.env.NODE_ENV;
    let errorMessage = (env == 'production' && !err.expose) ? 'Có lỗi xảy ra, vui lòng thử lại sau' : err.message;
    
    ctx.response.status = 200;
    ctx.response.body = {
      error: {
        status: 0,
        message: errorMessage
      },
      data: {}
    }
  });
});

app.use(bodyparser({}));


app.use(convert(json()));

app.use(serve(rootFolder + '/build'));
app.use(staticServe({ rootDir: 'build', rootPath: '/inside' }));

require('koa-qs')(app, 'extended');
app.use(logger());
let corsOption = {
  origin: function (ctx) {
    return ctx.header.origin;
  },
  credentials: true
};
app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(helmet.hidePoweredBy());
app.use(helmet.noCache());

app.use(cors(corsOption));
app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  ctx.render = co.wrap(ctx.render);
  return next();
});

const route = require('koa-route'); //require it
const request = require('request-promise');
app.use(route.post('/api/predict', (ctx) => {
    const review = ctx.request.body.review;
    if(!review) return ctx.body = { "res" : "NULL"};
    let url = `http://localhost:5000/api/predict`;
    let options = {
        method: 'POST',
        uri: url,
        body: {
          review
        },
        json: true, // Automatically stringifies the body to JSON
        timeout: 30000        
    };
    return request(options).then( res => {
      if(res.indexOf('GOOD') > 0)
        return ctx.body = { "res" : "GOOD"};
      return ctx.body = { "res" : "BAD"};
    })
}));

app.on('error', function (err, ctx) {
  console.log('err ' + err);
});
module.exports = app;
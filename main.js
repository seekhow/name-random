const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
 
//设置静态资源的路径 
const staticPath = './dist';
 
app.use(static(
  path.join( __dirname, staticPath)
));

app.listen(3033, () => {
  console.log('server is starting at port 3033')
});
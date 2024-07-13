const APP_ENV = process.env.NODE_ENV || "development";
const runMode = process.env.RUN_MODE || "app";
global.APP_ENV = APP_ENV;
const config = require("./config/config").get(APP_ENV);
global.config = config;
require("events").EventEmitter.defaultMaxListeners = 5;

require("dotenv").config({ path: `./.env.${APP_ENV}` });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaCors = require("@koa/cors");
const { koaBody } = require("koa-body");

const model = require("./models");
model.init();
const server = new Koa();

if (runMode === "app") {
   server.use(
      koaBody({
         includeUnparsed: true,
         formLimit: "50mb",
         jsonLimit: "50mb",
         textLimit: "50mb",
         multipart: true,
         formidable: {
            uploadDir: "./tmp",
            keepExtensions: true,
         },
      })
   );

   server.use(async (ctx, next) => {
      ctx.set("Access-Control-Allow-Origin", "http://localhost:3001");
      ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
      ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      ctx.set("Access-Control-Allow-Credentials", "true");
      if (ctx.method === "OPTIONS") {
         ctx.status = 204; // No Content
      } else {
         await next();
      }
   });

   server.use(
      koaCors({
         methods: "POST, GET, PUT, DELETE, OPTIONS",
         allowMethods: "Origin, X-Requested-With, Content-Type, Accept",
         credentials: true,
      })
   );

   server.use(bodyParser());

   require("./routes")(server);
}

const port = config.ports[runMode];

log.info(`started in ${APP_ENV} env, listening to port ${port}`);
server.listen(port);

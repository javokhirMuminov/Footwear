import express from 'express';
import path from 'path';
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from './libs/config';


import session  from 'express-session';
import ConnectMongoDB from 'connect-mongodb-session';

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MOGO_URL),
  collection: "sessions",
});
//Buyerda biz mongodb ni ichida shu session nomli yangi qatorni hosil qilyapmiz

/***1-ENTRANCE */
 const app=express();

 app.use(express.static(path.join(__dirname, "public")));
 app.use(express.urlencoded({extended: true}));
 app.use(express.json());
 app.use(morgan(MORGAN_FORMAT));

/***2-SESSIONS */
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 *3, //3h
    },
    store: store,
    resave: true,//buyerda bizni foydalanuvchi maxAge ni ichida berilgan vaqtni ichida kirsa vaqtni yangilashiga true qildik!
    saveUninitialized: true,
  })
);


/** 3-  VIEWS */
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs")


/**4-ROUTERS */
app.use("/admin", routerAdmin); //SSR: EJS
app.use('/', router); //Middleware Design Pattern   REACT


export default app; //module.expoport
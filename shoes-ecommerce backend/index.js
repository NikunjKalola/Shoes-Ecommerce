const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productsRouter = require("./routes/Product");
const authRouter = require("./routes/Auth");
const userRouter = require("./routes/User");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./model/User");
const { isAuth, sanitizeUser } = require("./services/common");
const SECRET_KEY = "SECRET_KEY";
// JWT options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;
require('dotenv').config();
const url = process.env.DATABASE_KEY;
mongoose
  .connect(
    url
  )
  .then(() => {
    console.log("connected to database");
    const server = express();

    server.get("/", (req, res) => {
      res.send({ code: "success" });
    });
    server.use(
      cors({
        exposedHeaders: ["X-Total-Count"],
      })
    );

    // server.use(
    //   session({
    //     secret: "keyboard cat",
    //     resave: false, // don't save session if unmodified
    //     saveUninitialized: false, // don't create session until something stored
    //   })
    // );
    // server.use(passport.authenticate("session"));
    server.use(
      cors({
        exposedHeaders: ["X-Total-Count"],
      })
    );

    server.use(express.json()); // to parse req.body
    server.use("/products", productsRouter.router);
    server.use("/auth", authRouter.router);
    server.use("/users", userRouter.router);
    server.use("/cart", cartRouter.router);
    server.use("/orders", ordersRouter.router);

    // passport.use(
    //   "local",
    //   new LocalStrategy({ usernameField: "email" }, async function (
    //     email,
    //     password,
    //     done
    //   ) {
    //     // by default passport uses username
    //     try {
    //       const user = await User.findOne({ email: email });
    //       console.log(email, password, user);
    //       if (!user) {
    //         return done(null, false, { message: "invalid credentials" }); // for safety
    //       }
    //       crypto.pbkdf2(
    //         password,
    //         user.salt,
    //         310000,
    //         32,
    //         "sha256",
    //         async function (err, hashedPassword) {
    //           if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
    //             return done(null, false, { message: "invalid credentials" });
    //           }
    //           const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
    //           done(null, token); // this lines sends to serializer
    //         }
    //       );
    //     } catch (err) {
    //       console.log("smqiomdql");
    //       done(err);
    //     }
    //   })
    // );

    // passport.use(
    //   "jwt",
    //   new JwtStrategy(opts, async function (jwt_payload, done) {
    //     console.log({ jwt_payload }+"hellopcdkl ");
    //     try {
    //       const user = await User.findOne({ id: jwt_payload.sub });
    //       console.log("2mnn2"+user);
    //       if (user) {
    //         return done(null, sanitizeUser(user)); // this calls serializer
    //       } else {
    //         return done(null, false);
    //       }
    //     } catch (err) {
    //       return done(err, false);
    //     }
    //   })
    // );

    // passport.serializeUser(function (user, cb) {
    //   console.log("serialize", user);
    //   process.nextTick(function () {
    //     return cb(null, { id: user.id, role: user.role });
    //   });
    // });

    // passport.deserializeUser(function (user, cb) {
    //   console.log("de-serialize", user);
    //   process.nextTick(function () {
    //     return cb(null, user);
    //   });
    // });

    server.listen(8080, () => {
      console.log("server started at @ 3003");
    });
  });

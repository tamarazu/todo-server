const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };

    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            success: false,
            message: "This email already exist",
          });
        }
        return User.create(newUser);
      })
      .then((user) => {
        res.status(201).json({
          success: true,
          message: "Register successfully",
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          },
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        const { id, name, email, password: verifyPassword } = user;
        if (user) {
          if (comparePassword(password, verifyPassword) === true) {
            let payload = {
              id,
              email,
            };
            let access_token = generateToken(payload);
            res.status(200).json({
              success: true,
              access_token,
              data: {
                user: {
                  id,
                  name,
                  email,
                },
              },
            });
          } else {
            next({
              status: 400,
              message: "email/password wrong!",
            });
          }
        } else {
          next({
            status: 400,
            message: "email/password wrong!",
          });
        }
      })
      .catch(next);
  }

  static googleSignIn(req, res, next) {
    let payload;
    console.log(client);
    client
      .verifyIdToken({
        idToken: req.headers.token_google,
        audience: CLIENT_ID,
      })
      .then((ticket) => {
        // console.log('masuk payload')
        payload = ticket.getPayload();
        let email = payload.email;
        console.log(email);
        return User.findOne({
          where: {
            email,
          },
        });
      })
      .then((user) => {
        if (user) {
          console.log(user);
          return user;
          // console.log('ini masuk do access_token awal')
          // let userGoogle ={
          //     id: user.id,
          //     email: user.email
          // }
          // console.log('ini pas kirim lagi')
          // let access_token = generateToken(userGoogle)
          // res.status(200).json({
          //     data: 'ok'
          // })
        } else {
          console.log("ga ketemu usernyaaaa");
          // console.log(email)
          console.log(process.env.PWD);
          return User.create({
            name: payload.name,
            email: payload.email,
            password: "kitten",
          });
        }
      })
      .then((user) => {
        console.log(user, "INI USERRRR +++++++++++++++++++++++++++++++++");
        let access_token = generateToken({
          id: user.id,
          email: user.email,
        });
        res.status(201).json({ access_token });
      })
      .catch(next);
  }
}

module.exports = UserController;

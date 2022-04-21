import express from "express"
import cors from "cors"
import chalk from "chalk";
import bodyParser from "body-parser";

let users = [];
let tweets = [];

const app = express();
app.use(bodyParser());
app.use(cors());

app.post('/sign-up', (req, res) => {
  const {username, avatar} = req.body;

  users.push({
    username: username,
    avatar: avatar
  })

  res.send("Ok")
});


app.post('/tweets', (req, res) => {
  const userAvatar = users.find(user => {
      return user.username ===req.body.username
  })

  console.log(userAvatar)

  tweets.push({
    username:  req.body.username,
    avatar: userAvatar.avatar,
    tweet:  req.body.tweet
  })

  res.send("Ok")
})

app.get('/tweets', (req, res) => {
  res.send(tweets);
})


app.listen(5000, ()=>console.log(chalk.bold.green("Iniciado na porta 5000")));
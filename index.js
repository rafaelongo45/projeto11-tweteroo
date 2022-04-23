import express from "express"
import cors from "cors"
import chalk from "chalk";

let users = [];
let tweets = [];

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', (req, res) => {
  const {username, avatar} = req.body;

  if(username.length === 0 || avatar.length === 0){
    res.status(400).send("Todos os campos são obrigatórios!")
  }else{
    users.push({
      username: username,
      avatar: avatar
    })
  
    res.status(201).send("Ok")
  }

});


app.post('/tweets', (req, res) => {
  const {user} = req.headers;

  const userAvatar = users.find(profile => {
      return profile.username === user
  })

  if(user.length === 0 || req.body.tweet.length === 0){
    res.status(400).send("Todos os campos são obrigatórios!")
  }else{
    tweets.push({
      username:  user,
      avatar: userAvatar.avatar,
      tweet:  req.body.tweet
    })
  
    res.status(201).send("Ok")
  }

})

app.get('/tweets', (req, res) => {
  if(tweets.length > 10){
    let newArr = [];
    for(let i = 1; i < 11; i++){
      newArr.push(tweets[i]);
    }
    
    tweets = newArr;
  }
  res.send(tweets);
})


app.listen(5000, ()=>console.log(chalk.bold.green("Iniciado na porta 5000")));
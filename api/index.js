import express from 'express'

const app = express()
app.use(express.json())

app.get("/url", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.post("/diagnosis", (req, res, next) => {
  const data = req.body
  const sum = obj => Object.values(obj).reduce((a, b) => a + b);
  const total = sum(data)

  let result
  if(total >= 1 && total <= 10) {
    result = 'At risk of dyslipidemia and/or low risk for cardiovascular disease'
  } else if(total >= 11 && total <= 20){
    result = 'Moderate risk for cardiovascular disease'
  } else if (total >= 21 && total <= 30) {
    result = 'High risk for cardiovascular disease'
  }

  res.json({
    sum: sum(data),
    result
  })
});

export default {
  path: '/api',
  handler: app
}

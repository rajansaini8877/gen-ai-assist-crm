const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
// const { fetchSimilarAct, fetchSimilarAppeal } = require('./src/services/fetch-similar');
// const { generateAnswer, generateSummary, generateDecision, generateInsights } = require('./src/services/generate-answers');
// const connectRedis = require('./src/config/redis');
// const {flushCache} = require('./src/utils/manage-cache');

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from the public directory
app.use(express.static("public"));

// Define a route

app.get("/health", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Healthy",
  });
});

// app.get('/utils/flush/cache', async(req, res) => {
//   await flushCache();
//   res.status(200).json({
//     code: 200,
//     message: "Healthy"
//   });
// })

// app.post('/case/act/results', async (req, res) => {
//   console.log(req.body);
//   const results = await fetchSimilarAct(req.body.query);
//   res.render('case-act-results', {
//     results: results
//   });
// });

// app.post('/history/response', async (req, res) => {
//   console.log(req.body);
//   const keys = [];
//   keys.push(req.body.key);
//   const answer = await generateAnswer(keys, req.body.query);
//   res.render('history-response', {
//     key: req.body.key,
//     query: req.body.query,
//     answer: answer
//   });
// });

// app.post('/history/home', async (req, res) => {
//   console.log(req.body);
//   const summary = await generateSummary(req.body.key);
//   const decision = await generateDecision(req.body.key);
//   res.render('history-home', {
//     key: req.body.key,
//     summary: summary,
//     decision: decision
//   });
// })

// app.post('/case/home', async (req, res) => {
//   console.log(req.body);
//   console.log(req.body.firstName);
//   const query = `Claim: ${req.body.claim}\nEvidences: ${req.body.evidences}`;
//   const similarAppeals = await fetchSimilarAppeal(query);
//   console.log(similarAppeals);
//   const keys = [];
//   let successCount = 0;
//   for(const item of similarAppeals) {
//     item['summary'] = await generateSummary(item.key);
//     item['decision'] = await generateDecision(item.key);
//     keys.push(item.key);

//     if(item['decision'].toLowerCase().includes('allow')) {
//       console.log("found allow");
//       successCount = successCount + 1;
//     }
//     else if(item['decision'].toLowerCase().includes('dismiss')) {
//       console.log("found dismiss");
//       // do nothing
//     }
//     else {
//       console.log("found none");
//       successCount = successCount + 0.5;
//     }
//   }

//   let insights = "No insights!";
//   let stats = 0;

//   if(similarAppeals.length > 0) {
//    insights = await generateInsights(keys);
//    stats = successCount/similarAppeals.length;
//    stats = stats * 100;
//    stats = Math.round(stats);
//   }
//   console.log(similarAppeals);
//   res.render('case-home', {
//     input: req.body,
//     appeals: similarAppeals,
//     insights: insights,
//     stats: stats
//   });
// })

// app.post('/form', (req, res) => {
//     res.render('form')
// })

app.post("/work-items/:workItemNumber", (req, res) => {
  // const data = req.body;
  const workItemNumber = req.params.workItemNumber;

  const workItemsPath = path.join(__dirname, "src", "model", "work-items.json");
  const workItems = JSON.parse(fs.readFileSync(workItemsPath));

  for (let item of workItems) {
    if (item.workItemNumber === workItemNumber) {
      res.render("work-item-home", {
        workItemData: item,
      });
      break;
    }
  }
});

app.post("/cases/:caseNumber", (req, res) => {
  const caseNumber = req.params.caseNumber;

  const casesPath = path.join(__dirname, "src", "model", "cases.json");
  const cases = JSON.parse(fs.readFileSync(casesPath));

  for (let item of cases) {
    if (item.caseNumber === caseNumber) {
      res.render("case-home", {
        caseData: item,
      });
      break;
    }
  }
});

app.post("/events/:eventNumber", (req, res) => {
  const eventNumber = req.params.eventNumber;

  const eventsPath = path.join(__dirname, "src", "model", "events.json");
  const events = JSON.parse(fs.readFileSync(eventsPath));

  for (let item of events) {
    if (item.eventNumber === eventNumber) {
      res.render("event-home", {
        eventData: item,
      });
      break;
    }
  }
});

app.get("/dashboard", async (req, res) => {
  //   await connectRedis();

  const casesPath = path.join(__dirname, "src", "model", "cases.json");
  const cases = JSON.parse(fs.readFileSync(casesPath));

  const eventsPath = path.join(__dirname, "src", "model", "events.json");
  const events = JSON.parse(fs.readFileSync(eventsPath));

  const workItemsPath = path.join(__dirname, "src", "model", "work-items.json");
  const workItems = JSON.parse(fs.readFileSync(workItemsPath));

  res.render("dashboard", {
    cases,
    events,
    workItems,
  });
});

app.get("/home", async (req, res) => {
  //   await connectRedis();
  res.render("home");
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

// start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

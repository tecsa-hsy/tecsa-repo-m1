const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const port = 3000;

// enable calls from different domain names
app.use(cors());
// use json formats
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const initialGameState = {
  wins: 0,
  losses: 0,
  lastResult: null,
};

const GS_FILE = path.join(__dirname, "lucky_wheel_state.json");

function readGameState() {  
  try {
    //1. create file lucky_wheel_state.json if not exist and save initial gs in it
    if (!fs.existsSync(GS_FILE)) {
      saveGameState(initialGameState);
    }
    //2. read the file and save content in json object
    const data = fs.readFileSync(GS_FILE, "utf-8");
    const gsJson = JSON.parse(data);
    //3. return json object
    return gsJson;
  } catch (error) {
    console.error(`reading gs failed`, error);
  }
}

function saveGameState(gs) {
  try {
    fs.writeFileSync(GS_FILE, JSON.stringify(gs, null, 2), "utf-8");
  } catch (error) {
    console.error(`saving gs failed`, error);
  }
}
const wheelSegments = [
  { value: "Blank", weight: 10 },
  { value: "1000€", weight: 10 },
  { value: "5000€", weight: 80 },
];

// Pick a random value from wheelSegments based on it's weight
function spin() {
  try {
    const totalWeight = wheelSegments.reduce((sum, s) => sum + s.weight, 0);
    let randomNumber = Math.random() * totalWeight;
  
    for (const segment of wheelSegments) {
      randomNumber -= segment.weight;
      if (randomNumber <= 0) {
        return segment.value;
      }
    }
  } catch (error) {
    console.error(`spinning wheel failed`, error);
  }
}
// WoF REST Endpoints

app.get("/api/wheel", (req, res) => {
  console.log(`BE REST Endpoint [/] called by client with IP [${req.id}]\n`);
  const gs = readGameState();
  res.json(gs);
});

app.post("/api/wheel/spin", (req, res) => {
  console.log(`BE REST Endpoint [/spin] called by client with IP [${req.ip}]\n`);
  //1. get current gs
  const gs = readGameState();
  //2. spin (choose from wheelSegment array with 3 values, based on prob.) and save result
  const spinResult = spin();
  //3. update gs based on spin result
  if (spinResult === "Blank") {
    gs.losses++;
  } else {
    gs.wins++;
  }
  gs.lastResult = spinResult;
  //4. save updated gs
  saveGameState(gs);
  //5. return updated gs
  res.json(gs);
});

app.post("/api/wheel/reset", (req, res) => {
  console.log(`BE REST Endpoint [/reset] called by client with IP [${req.ip}]\n`);
  // 1. reset gs
  const newEmptyGs = { ...initialGameState };
  //2. save gs
  saveGameState(newEmptyGs);
  // 3. return empty gs
  res.json(newEmptyGs);
});



app.listen(port, () => {
  console.log(`WoF backend running on ${port}`);
  readGameState();
});

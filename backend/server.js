const server = require("http").createServer((req, res) => {
  // Create server
  res.end("Hello world from your Node.Js Backend!\n");
});

server.listen(3000, () => {
  // Start server locally on specified port
  console.log(`Your Node.Js BE server accessible via http://localhost:3000/`);
});

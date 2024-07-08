const https = require("https");
const fs = require("fs");

const options = {
  hostname: "example.com", // thay thế bằng hostname của bạn
  port: 443,
  path: "/",
  method: "GET",
  key: fs.readFileSync("path/to/key.pem"),
  cert: fs.readFileSync("path/to/cert.pem"),
  ca: fs.readFileSync("path/to/ca.pem"),
};

const req = https.request(options, (res : any) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding("utf8");
  res.on("data", (chunk:any) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", () => {
    console.log("No more data in response.");
  });
});

req.on("error", (e:any) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();


const express = require("express");
const app = express();

app.get("/answer", (req, res) => {
    res.send("ok");
    console.log(req.query)
});

app.use(express.static('./build'));

app.listen(9876);

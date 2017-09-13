var router = require("express").Router();
var mongoose = require("mongoose");

var noteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    note: {
        type: String
    }
},
{versionKey: false});

mongoose.connect("mongodb://127.0.0.1:27017/notes");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error\n"));
db.once("open", function() {
    console.log("connected to database\n");
});

var note = mongoose.model("note", noteSchema, "UserNotes");

router.get("/", function(req, res, next) {
    note.find(function(err, data) {
        if(err) {
            throw err;
        }
        res.json(data);
    });
});

router.post("/", function(req, res, next) {
    note.create({"name": "Achileas", "note": req.body.note, "data_creation": Date()}, function(err, data) {
        res.json(data);
    });
});

router.delete("/", function(req, res, next) {
    res.status(200);
    note.remove({_id: req.get("id")}, function(err, data) {
        if(err) {
            throw err;
        }
        res.json(data.result);
    });
});

router.get('/aboutus', function (req, res) {
    res.send("Model Name is " + note.modelName);
});

module.exports = router;

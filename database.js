const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const connection = client.connect();
const connect = connection;

exports.insert = function (name, password) {
    connect.then(() => {
        const doc = {name: name, password: password, stats: {1: 0, 2: 0, 3: 0, 4: 0}};
        const db = client.db('web_tech');
        const coll = db.collection('users');
        coll.insertOne(doc, (err, result) => {
            if (err) throw err
        })
    });
};

exports.find_by_name = function (name, callback) {
    connect.then(() => {
        const doc = {id: 3};
        const db = client.db('web_tech');
        const coll = db.collection('users');
        coll.findOne({name: name}, function (err, item) {
            callback(item);
        });
    });
};

exports.update_stats = function (name, stats) {
    connect.then(() => {
        const doc = {id: 3};
        const db = client.db('web_tech');
        const coll = db.collection('users');
        let new_values = {$set: {stats: stats}};
        coll.updateOne({name: name}, new_values, function (err, item) {
        });
    });
};

exports.list_all_entries = function (callback) {
    connect.then(() => {
        const doc = {id: 3};
        const db = client.db('web_tech');
        const coll = db.collection('users');
        coll.find().toArray(function (err, items) {
            return callback(items);
        });
    });
};
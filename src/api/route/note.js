'use strict';

const _ = require('lodash');

module.exports.create = (req, res) => {
    return req.currentUser.createNote(req.body).then(note => {
        res.json(note.expose());
    });
};

module.exports.list = (req, res) => {
    return req.currentUser.notes().then(notes => {
        res.json(_.invokeMap(notes, 'expose'));
    });
};

module.exports.get = (req, res) => {
    res.json(req.note.expose());
};

module.exports.update = (req, res) => {

    if(req.body.hasOwnProperty('subject')) {
        return Promise.resolve('Forbidden').then(() => {
            res.sendStatus(403);
        });
    } else {
        return req.note.update(req.body).then(() => {
            res.json(req.note.expose());
        });
    }
};

module.exports.delete = (req, res) => {
    return req.note.delete().then(() => {
        res.sendStatus(204);
    });
};

'use strict';

const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.postgresql.url, {
    logging: false
});

const User = require('./user');
const Note = require('./note');
const userNoteAssociation = require('./userNote');
const Version = require('./version');
const noteVersionAssociation = require('./noteVersion');

const models = {
    sequelize,
    User: User.define(sequelize),
    Note: Note.define(sequelize),
    Version: Version.define(sequelize),
};

userNoteAssociation.define(models);
noteVersionAssociation.define(models);

module.exports = models;

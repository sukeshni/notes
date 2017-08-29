'use strict';

const _ = require('lodash');
const model = require('../model');

class Note {
    constructor(note) {
        this._note = note;
    }

    get id() {
        return this._note.id;
    }

    expose() {
        return _.pick(this._note, [
            'id',
            'subject',
            'body',
            'updatedAt',
        ]);
    }

    update(note) {
        const self = this;
        const initialVersionId = 1;

        return model.sequelize.transaction(function (t) {
            // chain all your queries here.
            return self._note.getVersions({
                order: [['createdAt', 'DESC']],
            }, {transaction: t}).then(versions => {

                const lastVersionId = versions.length > 0 ? versions[0].versionId + 1 : initialVersionId;
                const version = {
                    subject: self._note.subject,
                    body: self._note.body,
                    versionId: lastVersionId
                }

                return self._note.update(note, {transaction: t}).then( updatedNote => {
                   return self._note.createVersion(version, {transaction: t}).then( function() {
                        return updatedNote
                   });
                });
            });
        }).then(function (result) {
            return result;
        }).catch(function (err) {
            throw new Error(err);
        });
    }

    delete() {
        return this._note.destroy();
    }

    versions() {
        return this._note.getVersions({
            order: [['createdAt', 'DESC']],
        }).then(versions => {
            return _.map(versions, version => {
                return new domain.Version(version);
            });
        });
    }

    version(id) {
        return this._note.getVersions({
            where: {
                id
            },
        }).then(versions => {
            if (_.size(versions) !== 1) {
                return q.reject(new domain.Error(domain.Error.Code.VERSION_NOT_FOUND));
            }
            else {
                return new domain.Version(versions[0]);
            }
        });
    }
}

module.exports = Note;

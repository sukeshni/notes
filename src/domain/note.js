'use strict';

const _ = require('lodash');

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
        return this._note.update(note);
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

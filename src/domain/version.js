'use strict';

const _ = require('lodash');

class Version {
    constructor(version) {
        this._version = version;
    }

    get id() {
        return this._version.id;
    }

    expose() {
        return _.pick(this._note, [
            'id',
            'subject',
            'body',
            'versionId',
            'createdAt'
        ]);
    }
}

module.exports = Version;

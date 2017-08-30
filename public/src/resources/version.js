'use strict';

angular.module('app').factory('Version', function($resource) {
    return $resource('/api/notes/:noteId/versions', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
    });
});

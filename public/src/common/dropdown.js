'use strict';

angular.module('app').component('dropdown', {
    templateUrl: '/src/common/dropdown.html',
    bindings: {
        versions: '<',
    },
    controller: function() {
        this.$onInit = function() {
            if (!_.isEmpty(this.versions)) {
                this.versionIds = this.versions.map(version => version.versionId);
            }
        };

        // this.onToggle = function() {
        //     // ToDo
        // };
    },
});

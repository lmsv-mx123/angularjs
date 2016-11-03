(function () {
"use strict";

angular.module('public')
.component('myInfo', {
  templateUrl: 'src/public/myinfo/userinfo.html',
  bindings: {
    info: '<'
  }
});

})();

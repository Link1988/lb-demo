'use strict';

module.exports = function(Registrations) {
  // Operation hook for get the context and relations
  Registrations.observe('before save', function(context, cb) {
    console.log(context);
    cb();
  });
};

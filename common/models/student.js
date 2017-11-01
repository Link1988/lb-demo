'use strict';

module.exports = function(Student) {

  // For this case the access_token is the id of the user that is logged in
  // to see the info of the user please hit this route
  // http://0.0.0.0:3000/api/users/login
  // send this info { "email": "alex@bar.com", "password": "1234567" }
  Student.saveCourse = function(data, cb) {
    var Registration = Student.app.models.Registrations;
    Registration.create({
      student: data.student,
      course: data.course
    }).then(function successHandler() {
      cb(null, 'Success Register');
    }).catch(function catchHandler(error) {
      cb(error, null);
    });
  };

  Student.remoteMethod('saveCourse', {
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    http: {
      path: '/saveCourse',
      verb: 'post'
    },
    returns: {
      arg: 'message',
      type: 'object'
    }
  });

  // Upload photo functionality
  Student.uploadPhoto = function(request, response, student, cb) {
    var Container = Student.app.models.Container;

    Container.getContainers(function (error, containers) {
      var existingContainer = containers.some(function(result) {
        return result.name === student;
      });

      if (existingContainer) {
        Container.upload(request, response, {container: student}, cb);
      } else {
        Container.createContainer({name: student}, function(err, container) {
          Container.upload(request, response, {container: container.name}, cb);
        });
      }
    });
  };

  Student.remoteMethod('uploadPhoto', {
    http: {path: '/:id/upload', verb: 'post'},
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}},
      {arg: 'id', type: 'string'}
    ],
    returns: {arg: 'status', type: 'string'}
  });

  // Method to test the ACL
  Student.status = function(cb) {
    cb(null, 'I have access without be logged in');
  };

  Student.remoteMethod('status', {
    http: {
      path: '/status',
      verb: 'get'
    },
    returns: {
      arg: 'status',
      type: 'string'
    }
  });

};

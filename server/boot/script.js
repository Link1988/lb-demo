'use strict';

module.exports = function(app) {
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

  function findUsers() {
    return User.find().then(function(users) {
      return users;
    }).catch(function(error) {
      return error;
    });
  }

  function createUsers(users) {
    for (var i = 0, l = users.length; i < l; i++) {
      if (users[i].username === 'Alex' || users[i].username === 'Sebas') {
        return [];
      }
    }

    return User.create([
      {username: 'Alex', email: 'alex@bar.com', password: '1234567'},
      {username: 'Sebas', email: 'sebas@bar.com', password: '1234567'}
    ]);
  }

  function setAdminRole(users) {
    if (users.length > 0) {
      return Role.create({
        name: 'admin'
      }).then(function(roler) {
        return {
          users: users,
          roler: roler
        };
      }).catch(function(error) {
        return error;
      });
    }
  }

  function createRole(data) {
    if (data) {
      return data.roler.principals.create({
        principalType: RoleMapping.USER,
        principalId: data.users[0].id
      }).then(function() {
        return data.users[0].username + ' is Admin';
      }).catch(function(error) {
        return error;
      });
    }
  }

  findUsers().then(function(users) {
    return createUsers(users);
  }).then(function(users) {
    return setAdminRole(users);
  }).then(function(data) {
    return createRole(data);
  }).then(function(message) {
    console.log(message);
  }).catch(function(err) {
    console.log(err);
  });

};

angular.module('starter.services', [])
.factory("Posts", function($firebaseArray) {
  var itemsRef = new Firebase("https://fiery-inferno-166.firebaseio.com/posts");
  return $firebaseArray(itemsRef);
})
.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//fiery-inferno-166.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})
.factory("User", function($firebaseAuth, $firebaseObject) {
  
  function newUserRef(user) {
    var userRef = new Firebase("https//fiery-inferno-166.firebaseio.com/users" + user.uid);
    return $firebaseObject(userRef);
  }
  function getUserData(user) {
    var ref = new Firebase("https://fiery-inferno-166.firebaseio.com/users/" + user);
    return $firebaseObject(ref);
  }

  function getLoggedInUser() {
    var user = localStorage.getItem('firebase:session::fiery-inferno-166');
    if(user) {
      return JSON.parse(user);
    }
  }

  return {
    newUserRef: newUserRef,
    getUserData: getUserData,
    getLoggedInUser: getLoggedInUser
  }
});

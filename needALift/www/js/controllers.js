angular.module('starter.controllers', [])

  .controller('PostCtrl', function($scope, $rootScope, $ionicModal, $ionicPlatform, $ionicLoading, Posts, Auth) {
  var date = new Date();
  var firebaseArray = new Firebase("https://fiery-inferno-166.firebaseio.com/posts");
  $scope.posts = Posts;
  $rootScope.postForm = {};
  
  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log("Logged in as", authData.uid);
    }
    $rootScope.authData = authData; // This will display the user's name in our view
  });
  $ionicModal.fromTemplateUrl('templates/add-post.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  }
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  
  $scope.createPost = function(){
    $scope.openModal();
  };
  $scope.submitPost = function () {
    var fromAddress = $rootScope.postForm.fromAddress,
        toAddress = $rootScope.postForm.toAddress,
        date = $rootScope.postForm.date.getTime(),
        time = $rootScope.postForm.time,
        message = $rootScope.postForm.message,
        role = $rootScope.postForm.role,
        acceptPost = false;
    $scope.posts.$add({
      fromAddress: fromAddress,
      toAddress: toAddress,
      date: date,
      time: time,
      message: message,
      role: role,
      user: {
        displayName: $rootScope.authData.facebook.displayName
      },
      acceptPost: acceptPost
    });
    $scope.postForm = {};
    $scope.closeModal();  
  };
  $scope.deletePost = function (post) {
    $scope.posts.$remove(post);
  }
  $scope.acceptPost = function (post) {
    post.acceptPost = true;
    console.log("post accepted");
  }
})
.controller('UserCtrl', function($scope, $rootScope, Auth, $state, User) {
  var ref = new Firebase("https://fiery-inferno-166.firebaseio.com");
  $scope.data = {};
  $scope.signupEmail = function() {
    ref.createUser({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });

  };
  
  $scope.loginEmail = function(){
    ref.authWithPassword({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $state.go('tab.dash');
      }
    });

  };
  $scope.logOut = function(user) {
    ref.unauth();
  };
  $scope.loginFacebook = function() {
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      // User successfully logged in
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });

  };
  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log("Logged in as", authData.uid);
    }
    $rootScope.authData = authData; // This will display the user's name in our view
  });
  function saveUser(userData) {
    var user = User.newUserRef(userData);
    user.displayName = $scope.displayName;
    user.email = $scope.email;
    user.$save().then(function(success) {
      $scope.displayName = null;
      $scope.email = null;
      $scope.password = null;
      $state.go('tab-dash');
    }, function (error) {
      console.log("there was an error! " + error);
    });
  }
});
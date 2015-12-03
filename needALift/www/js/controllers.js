angular.module('starter.controllers', [])

.controller('PostCtrl', function($scope, $rootScope, $ionicModal, $ionicPlatform, $ionicLoading, Posts, Auth) {
  var date = new Date();
  var displayName = '';
  var firebaseArray = new Firebase("https://fiery-inferno-166.firebaseio.com/posts");
  $scope.posts = Posts;
  $rootScope.postForm = {};
  
  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log(authData.provider)
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
        acceptPost = false,
        uid = $rootScope.authData.uid,
        created_at = Firebase.ServerValue.TIMESTAMP;
        console.log(uid);
    if ( $rootScope.authData.provider == "facebook") {
      displayName = $rootScope.authData.facebook.displayName;
    } else if ($rootScope.authData.provider == "password") {
      displayName = $rootScope.authData.password.email;
    }
    $scope.posts.$add({
      fromAddress: fromAddress,
      toAddress: toAddress,
      date: date,
      time: time,
      message: message,
      role: role,
      user: {
        displayName: displayName,
        uid: uid
      },
      acceptPost: acceptPost,
      created_at: created_at
    }); 
    
    $scope.postForm = {};
    $scope.closeModal();  
  };
  $scope.deletePost = function (post) {
    $scope.posts.$remove(post);
  }
  $scope.acceptPost = function (post) {
    var postname = post.$id;
    var singlePost = new Firebase("https://fiery-inferno-166.firebaseio.com/posts/" + postname);
    post.acceptPost = true;
    singlePost.child('acceptPost').set(post.acceptPost);
    console.log("post accepted");
  }
})
.controller('UserCtrl', function($scope, $rootScope, Auth, $state, User, $ionicModal) {
  var ref = new Firebase("https://fiery-inferno-166.firebaseio.com");
  $scope.data = {};
  $scope.signupData = {};
  
  $ionicModal.fromTemplateUrl('templates/create-account.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.createAccount = function () {
    $scope.modal.show();
  }
  
  $scope.signupEmail = function() {
    ref.createUser({
      email    : $scope.signupData.email,
      password : $scope.signupData.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        $scope.closeModal();
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
  $rootScope.logOut = function(user) {
    ref.unauth();
    $state.go('login');
  };
  $scope.loginFacebook = function () {
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $state.go('tab.dash');
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };
/*  $scope.loginFacebook = function() {
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
          $state.go('tab.dash');
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });

  }*/
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
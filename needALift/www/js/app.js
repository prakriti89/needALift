// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'PostCtrl'
      }
    }
  })

  .state('tab.offer', {
      url: '/offer',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-offer.html',
          controller: 'PostCtrl'
        }
      }
    })
    .state('tab.inbox', {
    url: '/inbox',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-inbox.html',
        controller: 'PostCtrl'
      }
    }
  })
   
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'UserCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})
.run(function($rootScope, $state, User) {

  // Listen for changes to the state and run the code
  // in the callback when the change happens
  $rootScope.$on('$stateChangeStart', function() {

    // Use the User service to get the currently
    // logged-in user from local storage
    var loggedInUser = User.getLoggedInUser();

    // Check that we actually have a logged-in user
    // saved in local storage
    if(loggedInUser) {

      // Use the getUserData method on the User service
      // to grab the data from the /users endpoint in
      // Firebase for the logged-in user
      $rootScope.loggedInUserData = User.getUserData(loggedInUser.uid);
    }
  });
});

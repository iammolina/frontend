var app = angular.module('app', ['ngMaterial','ui.router','angular-jwt']);

app.config(function($stateProvider,$urlRouterProvider,$httpProvider,jwtInterceptorProvider,$mdThemingProvider)
{


  $httpProvider.defaults.useXDomain = true;


  delete $httpProvider.defaults.headers.common['X-Requested-With'];


  jwtInterceptorProvider.tokenGetter = function()
  {
       return localStorage.getItem("token");
  }
  
  $httpProvider.interceptors.push("jwtInterceptor");


   $mdThemingProvider.theme('default')

      .primaryPalette('orange',
      {
      'default': 'A100', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': 'A200', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': 'A400', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
      })

      // If you specify less than all of the keys, it will inherit from the
      // default shades

      .accentPalette('light-blue', 
      {
        'default': '500' // use shade 200 for default, and keep all other shades the same
      })

      .warnPalette('red' , 
      {
        'default': '500' 
      })

 $urlRouterProvider.otherwise("/");

  var loginState = 
  {
    name: 'login',
    url: '/',
    templateUrl: 'app/views/login.html',
    controller:'mainctrl'
  }

  var aboutState = 
  {
    name: 'home',
    url: '/home',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }


  $stateProvider.state(loginState);
  $stateProvider.state(aboutState);


});


app.run(function($rootScope , $state)
{
      $rootScope.$on("$stateChangeSuccess", function(event , toState , toParams , fromState , fromParams) 
      {
            var token = localStorage.getItem("token");
            
            if(toState.url === "/" && token)
            {
               if(!fromState.name)
               {
                  $state.go('home');
               }else{

                  $state.go(fromState.name);
               }

            }
            if(toState.url != "/" && !token)
            {
              $state.go('login');
            }
      });
});
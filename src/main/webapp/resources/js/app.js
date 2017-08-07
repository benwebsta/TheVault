var app = angular.module('thevault', ['ui.router', 'ngCookies', 'ngMessages', 'chart.js']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'ChartJsProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider, ChartJsProvider) {
	
	ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
	
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider	
    .state('login', {
    	url: '/login',
    	views: {
    	    login: {
    	      templateUrl: 'resources/pages/login.html',
    	      controller: "LoginController"
    	    }
    	  }
    })
    .state('registration', {
    	url: '/registration',
    	views: {
    	    registration: {
    	      templateUrl: 'resources/pages/registration.html',
    	      controller: "RegistrationController"
    	    }
    	  }
    })
    .state('income', {
    	url: '/income',
    	views: {
    	    income: {
    	      templateUrl: 'resources/pages/income.html',
    	      controller: "IncomeController"
    	    }
    	  }
    })
    .state('automobile', {
    	url: '/automobile',
    	views: {
    		automobile: {
    	      templateUrl: 'resources/pages/automobile.html',
    	      controller: "AutomobileController"
    	    }
    	  }
    })
    .state('rentAndUtilities', {
    	url: '/rentAndUtilities',
    	views: {
    		rentAndUtilities: {
    	      templateUrl: 'resources/pages/rentAndUtilities.html',
    	      controller: "RentAndUtilitiesController"
    	    }
    	  }
    })
    .state('food', {
    	url: '/food',
    	views: {
    		food: {
    	      templateUrl: 'resources/pages/food.html',
    	      controller: "FoodController"
    	    }
    	  }
    })
    .state('healthAndFitness', {
    	url: '/healthAndFitness',
    	views: {
    		healthAndFitness: {
    	      templateUrl: 'resources/pages/healthAndFitness.html',
    	      controller: "HealthAndFitnessController"
    	    }
    	  }
    })
    .state('entertainment', {
    	url: '/entertainment',
    	views: {
    		entertainment: {
    	      templateUrl: 'resources/pages/entertainment.html',
    	      controller: "EntertainmentController"
    	    }
    	  }
    })
    .state('miscellaneous', {
    	url: '/miscellaneous',
    	views: {
    		miscellaneous: {
    	      templateUrl: 'resources/pages/miscellaneous.html',
    	      controller: "MiscellaneousController"
    	    }
    	  }
    })
    .state('summary', {
    	url: '/summary',
    	views: {
    		summary: {
    	      templateUrl: 'resources/pages/summary.html',
    	      controller: "SummaryController"
    	    }
    	  }
    })
    .state('forgotPassword', {
    	url: '/forgotPassword',
    	views: {
    		forgotPassword: {
    	      templateUrl: 'resources/pages/forgotPassword.html',
    	      controller: "ForgotPasswordController"
    	    }
    	  }
    })
    
}]);
var app = angular.module('thevault', ['ui.router', 'ngCookies', 'ngMessages', 'chart.js']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'ChartJsProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider, ChartJsProvider) {
	
	ChartJsProvider.setOptions({ colors : ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"] });
	
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
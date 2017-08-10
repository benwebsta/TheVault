app.controller("NavbarController", 
	['$scope', '$http', '$rootScope', '$cookies', '$state', '$timeout',
		function($scope, $http, $rootScope, $cookies, $state, $timeout) {
		
			$rootScope.username = $cookies.get('user');
			console.log("user cookie: " + $cookies.get('user'))
			var userGet = {
		    		firstName : null,
		    		lastName : null,
		    		username : $rootScope.username,
		    		password : null
		    }
			if($rootScope.username != null){
				$http({
			    	  method: 'POST',
			    	  url: 'getUserByUsername',
			    	  data: userGet
			    	}).then(function successCallback(response) {
			    		$rootScope.user = response.data;
			    		$state.go("summary");
			    		$timeout(getFin, 4000);
			    	  }, function errorCallback(response) {
			    		  console.log("error");
			    	  });
			}
			
			var getFin = function(){
	    		$rootScope.getAllFinances();
			}
			
			$scope.logout = function(){
				$cookies.remove('user');
				$rootScope.username = null;
				$rootScope.user = null;
				$state.go("login");
			}
			
			$scope.incomeEntry = function(){
				console.log("income entry click");
				$('#incomeModal').modal('show');
			}
			$scope.automobileEntry = function(){
				console.log("automobile entry click");
				$('#automobileModal').modal('show');
			}
			$scope.rentAndUtilitiesEntry = function(){
				console.log("rentAndUtilities entry click");
				$('#rentAndUtilitiesModal').modal('show');
			}
			$scope.foodEntry = function(){
				console.log("food entry click");
				$('#foodModal').modal('show');
			}
			$scope.healthAndFitnessEntry = function(){
				console.log("healthAndFitness entry click");
				$('#healthAndFitnessModal').modal('show');
			}
			$scope.entertainmentEntry = function(){
				console.log("entertainment entry click");
				$('#entertainmentModal').modal('show');
			}
			$scope.miscellaneousEntry = function(){
				console.log("miscellaneous entry click");
				$('#miscellaneousModal').modal('show');
			}
	
	}]);

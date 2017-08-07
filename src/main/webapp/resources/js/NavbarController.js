app.controller("NavbarController", 
	['$scope', '$http', '$rootScope', '$cookies', '$state',
		function($scope, $http, $rootScope, $cookies, $state) {
		
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
			    	  }, function errorCallback(response) {
			    		  console.log("error");
			    	  });
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
	
	}]);

app.controller("ForgotPasswordController", 
	['$scope', '$http', '$rootScope', '$state', '$rootScope', '$cookies', '$timeout',
		function($scope, $http, $rootScope, $state, $rootScope, $cookies, $timeout) {
			
			$scope.forgotPassword = function(){
		    	console.log("in get password");
		    	$scope.userTaken = null;
		    	var userCreate = {
			    		firstName : $scope.firstName, 
			    		lastName : $scope.lastName,
			    		username : $scope.username,
			    		password : $scope.password
			    }
		    	$http({
			    	  method: 'POST',
			    	  url: 'getUserByUsername',
			    	  data: userCreate
			    	}).then(function successCallback(response) {
			    		$scope.userTaken = response.data;
			    		if(!$scope.userTaken){
			    			console.log("in if");
				    		$scope.noUserFound = true;
				    		$timeout(removeNoUserFound, 2000);
			    		}
				    	else if($scope.userTaken){
				    		$scope.password = response.data.password;
				    	}
			    	  }, function errorCallback(response) {
			    		  console.log("error");
			    	  });
			}
			var removeNoUserFound= function(){
		    	$scope.noUserFound = false;
		    }
		  
	}]);

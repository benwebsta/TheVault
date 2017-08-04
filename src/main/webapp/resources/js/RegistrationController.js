app.controller("RegistrationController", 
	['$scope', '$http', '$rootScope', '$state', '$timeout', '$cookies',
		 function($scope, $http, $rootScope, $state, $timeout, $cookies) {
			    
			    
			    $scope.register = function(){
			    	console.log("in register");
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
				    		if($scope.userTaken){
				    			console.log("in if");
					    		$scope.usernameTaken = true;
					    		$timeout(removeUsernameTaken, 2000);
				    		}
					    	else if(!$scope.userTaken){
					    		console.log("in else");
					    		$scope.usernameTaken = false;
					    		$http({
							    	  method: 'POST',
							    	  url: 'createNewUser',
							    	  data: userCreate
							    	}).then(function successCallback(response) {
							    		var oneMonth = new Date();
										console.log("today: " + oneMonth);
										oneMonth.setDate(oneMonth.getDate() + 30);
										console.log("one month: " + oneMonth)
										$rootScope.user = response.data;
										$rootScope.username = response.data.username;
										$cookies.put('user', $rootScope.user.username, {
											expires: oneMonth
										});
										$state.go("summary");
							    	  }, function errorCallback(response) {
							    		  console.log("error");
							    	  });
					    	}
				    	  }, function errorCallback(response) {
				    		  console.log("error");
				    	  });
			    }
			    var removeUsernameTaken = function(){
			    	$scope.usernameTaken = false;
			    }
		  
	}]);

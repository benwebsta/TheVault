app.controller("LoginController", 
	['$scope', '$http', '$rootScope', '$state', '$rootScope', '$cookies',
		function($scope, $http, $rootScope, $state, $rootScope, $cookies) {
			/*if($rootScope.user != null || $rootScope.username != null){}
				$state.go("summary");*/
			$scope.login = function() {
				console.log("login");
				var userLogin = {
			    		firstName : null, 
			    		lastName : null,
			    		username : $scope.username,
			    		password : $scope.password
			    }
				console.log(userLogin);
				$http({
			    	  method: 'POST',
					  url: 'login',
					  data: userLogin
				}).then(function successCallback(response) {
					console.log("response: " + response.data);
					if(response.data.username != null){
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
						$rootScope.getAllFinances();
					}
					else
						$scope.loginInfoIncorrect = true;
				  }, function errorCallback(response) {
				    console.log(response.data);
				  });
			}
		  
	}]);

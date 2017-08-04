app.controller("IncomeController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showIncomeTable = false;
		
		$scope.getAllIncomes = function(){
			console.log("in get all incomes");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllIncomes',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		console.log("success callback");
	    		$rootScope.incomeEntries = response.data;
	    	    console.log($rootScope.incomeEntries);
	    	    $rootScope.showIncomeTable = true;
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
		}
		
		
		$scope.incomeEntrySubmit = function(){
			var income = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
			console.log("income controller entry click");
			console.log(income);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewIncome',
		    	  data: income
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.incomeEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllIncomes();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#incomeModal').modal('hide');
			$scope.incomeEntry = null;
		}
		  
	}]);

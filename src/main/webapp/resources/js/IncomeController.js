app.controller("IncomeController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showIncomeTable = false;
		var responseArray;
		$scope.getAllIncomes = function(){
			console.log("in get all incomes");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllIncomes',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.incomeEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showIncomeTable = true;
	    	    	
	    	    
				$rootScope.incomeLabels = new Array();
				$rootScope.incomeData = new Array();
				$rootScope.incomeLabels2 = new Array();
				$rootScope.incomeData2 = new Array();
				$rootScope.incomeSeries = ['Income'];
				$rootScope.options = {legend: {display: true}};
				
				for(i = 0; i < responseArray.length; i++){
					console.log(responseArray[i]);
					$rootScope.incomeLabels.push(responseArray[i].description);
					$rootScope.incomeData.push(responseArray[i].amount);

					$rootScope.incomeLabels2.push(responseArray[i].incomeDate);
					$rootScope.incomeData2.push(responseArray[i].amount);
				}
				
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

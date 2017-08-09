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
	    	    				
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				$rootScope.incomeArray = responseArray;
				display(responseArray);
				
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
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.incomeDate).getTime() > new Date(date2.incomeDate).getTime())	return 1;
			if (new Date(date1.incomeDate).getTime() < new Date(date2.incomeDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.incomeDate).getTime() > new Date(date2.incomeDate).getTime()) return -1;
			if (new Date(date1.incomeDate).getTime() < new Date(date2.incomeDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			$rootScope.incomeLabels = new Array();
			$rootScope.incomeData = new Array();
			$rootScope.incomeLabels2 = new Array();
			$rootScope.incomeData2 = new Array();
			$rootScope.incomeSeries = ['Income'];
			$rootScope.options = {legend: {display: true}};
			
			for(i = 0; i < responseArray.length; i++){
				$rootScope.incomeLabels.push(responseArray[i].description);
				$rootScope.incomeData.push(responseArray[i].amount);

				$rootScope.incomeLabels2.push(responseArray[i].incomeDate);
				$rootScope.incomeData2.push(responseArray[i].amount);
			}
		}
		function monthFilter(array, test){
			var januaryArray = new Array();
			for(i = 0; i < array.length; i++){
				if(test(array[i]))
					januaryArray.push(array[i]);
			}
			return januaryArray;
		}
		  
		$scope.all = function(){
			$scope.getAllIncomes();
			display($rootScope.incomeArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("12-31-2016") &&
				new Date(income.incomeDate) < new Date("01-31-2017");
			});
			$rootScope.incomeEntries = january;
			display(january);
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("01-31-2017") &&
				new Date(income.incomeDate) < new Date("02-28-2017");
			});
			$rootScope.incomeEntries = february;
			display(february);
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("02-28-2017") &&
				new Date(income.incomeDate) < new Date("03-31-2017");
			});
			$rootScope.incomeEntries = march;
			display(march);
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("03-31-2017") &&
				new Date(income.incomeDate) < new Date("04-30-2017");
			});
			$rootScope.incomeEntries = april;
			display(april);
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("04-30-2017") &&
				new Date(income.incomeDate) < new Date("05-31-2017");
			});
			$rootScope.incomeEntries = may;
			display(may);
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("05-31-2017") &&
				new Date(income.incomeDate) < new Date("06-30-2017");
			});
			$rootScope.incomeEntries = june;
			display(june);
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("06-30-2017") &&
				new Date(income.incomeDate) < new Date("07-31-2017");
			});
			$rootScope.incomeEntries = july;
			display(july);
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("07-31-2017") &&
				new Date(income.incomeDate) < new Date("08-31-2017");
			});
			$rootScope.incomeEntries = august;
			display(august);
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("08-31-2017") &&
				new Date(income.incomeDate) < new Date("09-30-2017");
			});
			$rootScope.incomeEntries = september;
			display(september);
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("09-30-2017") &&
				new Date(income.incomeDate) < new Date("10-31-2017");
			});
			$rootScope.incomeEntries = october;
			display(october);
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("10-31-2017") &&
				new Date(income.incomeDate) < new Date("11-30-2017");
			});
			$rootScope.incomeEntries = november;
			display(november);
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("11-30-2017") &&
				new Date(income.incomeDate) < new Date("12-31-2017");
			});
			$rootScope.incomeEntries = december;
			display(december);
		}
	}]);

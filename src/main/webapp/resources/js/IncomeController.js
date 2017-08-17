app.controller("IncomeController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showIncomeTable = false;
		var responseArray;
		$scope.allSelected = false;
		
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
				//display(responseArray);
				
				if($scope.allSelected == false){
		    		if(new Date() > new Date("12-31-2016") && new Date() <= new Date("01-31-2017")){
		    			$rootScope.selectedMonth = "January";
		    			$scope.january();
		    		}
		    		else if(new Date() > new Date("01-31-2017") && new Date() <= new Date("02-28-2017")){
		    			$rootScope.selectedMonth = "February";
		    			$scope.february();
		    		}
		    		else if(new Date() > new Date("02-28-2017") && new Date() <= new Date("03-31-2017")){
		    			$rootScope.selectedMonth = "March";
		    			$scope.march();
		    		}
		    		else if(new Date() > new Date("03-31-2017") && new Date() <= new Date("04-30-2017")){
		    			$rootScope.selectedMonth = "April";
		    			$scope.april();
		    		}
		    		else if(new Date() > new Date("04-30-2017") && new Date() <= new Date("05-31-2017")){
		    			$rootScope.selectedMonth = "May";
		    			$scope.may();
		    		}
		    		else if(new Date() > new Date("05-31-2016") && new Date() <= new Date("06-30-2017")){
		    			$rootScope.selectedMonth = "June";
		    			$scope.june();
		    		}
		    		else if(new Date() > new Date("06-30-2017") && new Date() <= new Date("07-31-2017")){
		    			$rootScope.selectedMonth = "July";
		    			$scope.july();
		    		}
		    		else if(new Date() > new Date("07-31-2016") && new Date() <= new Date("08-31-2017")){
		    			$rootScope.selectedMonth = "August";
		    			$scope.august();
		    		}
		    		else if(new Date() > new Date("08-31-2016") && new Date() <= new Date("09-30-2017")){
		    			$rootScope.selectedMonth = "September";
		    			$scope.september();
		    		}
		    		else if(new Date() > new Date("09-30-2016") && new Date() <= new Date("10-31-2017")){
		    			$rootScope.selectedMonth = "October";
		    			$scope.october();
		    		}
		    		else if(new Date() > new Date("10-31-2016") && new Date() <= new Date("11-30-2017")){
		    			$rootScope.selectedMonth = "November";
		    			$scope.november();
		    		}
		    		else if(new Date() > new Date("11-30-2016") && new Date() <= new Date("12-31-2017")){
		    			$rootScope.selectedMonth = "December";
		    			$scope.december();
		    		}
				}
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
			
		}
		
		
		$scope.incomeEntrySubmit = function(){
			var newBalance = $rootScope.balance + $scope.amount;
			var income = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
			$rootScope.balance = newBalance;
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
			if (new Date(date1.incomeDate).getTime() <= new Date(date2.incomeDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.incomeDate).getTime() > new Date(date2.incomeDate).getTime()) return -1;
			if (new Date(date1.incomeDate).getTime() <= new Date(date2.incomeDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			if(responseArray.length == 0)
				$rootScope.showIncomeTable = false;
			$rootScope.incomeLabels = new Array();
			$rootScope.incomeData = new Array();
			$rootScope.incomeLabels2 = new Array();
			$rootScope.incomeData2 = new Array();
			$rootScope.incomeSeries = ['Income'];
			$rootScope.options = {legend: {display: true}};
			
			var total = 0;
			for(i = 0; i < responseArray.length; i++){
				total += responseArray[i].amount;
				
				$rootScope.incomeLabels.push(responseArray[i].description);
				$rootScope.incomeData.push(responseArray[i].amount);

				$rootScope.incomeLabels2.push(responseArray[i].incomeDate);
				$rootScope.incomeData2.push(responseArray[i].amount);
			}

			$rootScope.netTotal = total;
			console.log("total spent: " + $rootScope.netTotal);
		}
		function monthFilter(array, test){
			var newArray = new Array();
			for(i = 0; i < array.length; i++){
				if(test(array[i]))
					newArray.push(array[i]);
			}
			return newArray;
		}
		  
		$scope.all = function(){
			$scope.allSelected = true;
			$rootScope.selectedMonth = "All Months";
			$scope.getAllIncomes();
			display($rootScope.incomeArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("12-31-2016") &&
				new Date(income.incomeDate) <= new Date("01-31-2017");
			});
			$rootScope.incomeEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("01-31-2017") &&
				new Date(income.incomeDate) <= new Date("02-28-2017");
			});
			$rootScope.incomeEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("02-28-2017") &&
				new Date(income.incomeDate) <= new Date("03-31-2017");
			});
			$rootScope.incomeEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("03-31-2017") &&
				new Date(income.incomeDate) <= new Date("04-30-2017");
			});
			$rootScope.incomeEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("04-30-2017") &&
				new Date(income.incomeDate) <= new Date("05-31-2017");
			});
			$rootScope.incomeEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("05-31-2017") &&
				new Date(income.incomeDate) <= new Date("06-30-2017");
			});
			$rootScope.incomeEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("06-30-2017") &&
				new Date(income.incomeDate) <= new Date("07-31-2017");
			});
			$rootScope.incomeEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("07-31-2017") &&
				new Date(income.incomeDate) <= new Date("08-31-2017");
			});
			$rootScope.incomeEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("08-31-2017") &&
				new Date(income.incomeDate) <= new Date("09-30-2017");
			});
			$rootScope.incomeEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("09-30-2017") &&
				new Date(income.incomeDate) <= new Date("10-31-2017");
			});
			$rootScope.incomeEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("10-31-2017") &&
				new Date(income.incomeDate) <= new Date("11-30-2017");
			});
			$rootScope.incomeEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.incomeArray, function(income) {
			    return new Date(income.incomeDate) > new Date("11-30-2017") &&
				new Date(income.incomeDate) <= new Date("12-31-2017");
			});
			$rootScope.incomeEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		$scope.deleteIncomeEntry = function(incomeEntry){
			if (confirm("Are you sure you want to delete this?") == true) {
			    $scope.reallyDeleteIncomeEntry(incomeEntry);
			} else {
			    console.log("cancelled");
			}
		}
		$scope.reallyDeleteIncomeEntry = function(incomeEntry){
			console.log("in delete income entry is: \n");
			console.log(incomeEntry);
			$http({
		    	  method: 'DELETE',
		    	  url: 'deleteIncome',
		    	  data: incomeEntry
		    	}).then(function successCallback(response) {
		    	   console.log(response.data);
		    	   $rootScope.balance -= incomeEntry.amount
		    	   $scope.allSelected = false;
		    	   $scope.getAllIncomes();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
	}]);

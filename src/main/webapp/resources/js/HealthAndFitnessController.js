app.controller("HealthAndFitnessController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showHealthAndFitnessTable = false;
		var responseArray;
		$scope.allSelected = false;
		
		$scope.getAllHealthAndFitnesses = function(){
			console.log("in get all healthAndFitnesses");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllHealthAndFitnesses',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.healthAndFitnessEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showHealthAndFitnessTable = true;
	    	    	
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				$rootScope.healthAndFitnessArray = responseArray;
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
		
		
		$scope.healthAndFitnessEntrySubmit = function(){
			var newBalance = $rootScope.balance - $scope.amount;
			var healthAndFitness = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
			$rootScope.balance = newBalance;
			console.log("healthAndFitness controller entry click");
			console.log(healthAndFitness);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewHealthAndFitness',
		    	  data: healthAndFitness
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.healthAndFitnessEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllHealthAndFitnesses();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#healthAndFitnessModal').modal('hide');
			$scope.healthAndFitnessEntry = null;
		}
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.healthAndFitnessDate).getTime() > new Date(date2.healthAndFitnessDate).getTime())	return 1;
			if (new Date(date1.healthAndFitnessDate).getTime() <= new Date(date2.healthAndFitnessDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.healthAndFitnessDate).getTime() > new Date(date2.healthAndFitnessDate).getTime()) return -1;
			if (new Date(date1.healthAndFitnessDate).getTime() <= new Date(date2.healthAndFitnessDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			if(responseArray.length == 0)
				$rootScope.showHealthAndFitnessTable = false;
			$rootScope.healthAndFitnessLabels = new Array();
			$rootScope.healthAndFitnessData = new Array();
			$rootScope.healthAndFitnessLabels2 = new Array();
			$rootScope.healthAndFitnessData2 = new Array();
			$rootScope.healthAndFitnessSeries = ['HealthAndFitness'];
			$rootScope.options = {legend: {display: true}};
			
			for(i = 0; i < responseArray.length; i++){
				
				$rootScope.healthAndFitnessLabels.push(responseArray[i].description);
				$rootScope.healthAndFitnessData.push(responseArray[i].amount);

				$rootScope.healthAndFitnessLabels2.push(responseArray[i].healthAndFitnessDate);
				$rootScope.healthAndFitnessData2.push(responseArray[i].amount);
			}
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
			$scope.getAllHealthAndFitnesses();
			display($rootScope.healthAndFitnessArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("12-31-2016") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("01-31-2017");
			});
			$rootScope.healthAndFitnessEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("01-31-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("02-28-2017");
			});
			$rootScope.healthAndFitnessEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("02-28-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("03-31-2017");
			});
			$rootScope.healthAndFitnessEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("03-31-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("04-30-2017");
			});
			$rootScope.healthAndFitnessEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("04-30-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("05-31-2017");
			});
			$rootScope.healthAndFitnessEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("05-31-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("06-30-2017");
			});
			$rootScope.healthAndFitnessEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("06-30-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("07-31-2017");
			});
			$rootScope.healthAndFitnessEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("07-31-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("08-31-2017");
			});
			$rootScope.healthAndFitnessEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("08-31-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("09-30-2017");
			});
			$rootScope.healthAndFitnessEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("09-30-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("10-31-2017");
			});
			$rootScope.healthAndFitnessEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("10-31-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("11-30-2017");
			});
			$rootScope.healthAndFitnessEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.healthAndFitnessArray, function(healthAndFitness) {
			    return new Date(healthAndFitness.healthAndFitnessDate) > new Date("11-30-2017") &&
				new Date(healthAndFitness.healthAndFitnessDate) <= new Date("12-31-2017");
			});
			$rootScope.healthAndFitnessEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		$scope.deleteHealthAndFitnessEntry = function(healthAndFitnessEntry){
			if (confirm("Are you sure you want to delete this?") == true) {
			    $scope.reallyDeleteHealthAndFitnessEntry(healthAndFitnessEntry);
			} else {
			    console.log("cancelled");
			}
		}
		$scope.reallyDeleteHealthAndFitnessEntry = function(healthAndFitnessEntry){
			console.log("in delete healthAndFitness entry is: \n");
			console.log(healthAndFitnessEntry);
			$http({
		    	  method: 'DELETE',
		    	  url: 'deleteHealthAndFitness',
		    	  data: healthAndFitnessEntry
		    	}).then(function successCallback(response) {
		    	   console.log(response.data);
		    	   $rootScope.balance += healthAndFitnessEntry.amount
		    	   $scope.allSelected = false;
		    	   $scope.getAllHealthAndFitnesses();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		  
	}]);

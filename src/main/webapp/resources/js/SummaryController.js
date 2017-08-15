app.controller("SummaryController", 
	['$scope', '$http', '$rootScope', '$timeout',
		function($scope, $http, $rootScope, $timeout) {
		$rootScope.showSummaryTable = false;
		$rootScope.allSelected = false;
		console.log("all selected false");
		
		$rootScope.getAllFinances = function(){
			console.log("in get all finances");
			
			$http({
		    	  method: 'POST',
		    	  url: 'getAllBanks',
		    	  data: $rootScope.user
		    	}).then(function successCallback(response) {
		    		$rootScope.banks = response.data;
		    		$rootScope.balance = $rootScope.banks.sort(function(a,b) { 
		    		    return new Date(b.bankDate).getTime() - new Date(a.bankDate).getTime() 
		    		})[0].balance;
		    		console.log("balance: " + $rootScope.balance);
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	  });
			
			$http({
	    	  method: 'POST',
	    	  url: 'getAllFinances',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {
	    		var list = response.data;
	    		$rootScope.summaryEntries = new Array();
	    		
	    		for(i = 0; i < list.length; i++){
	    			if(list[i] != null)
	    			for(j = 0; j < list[i].length; j++){
	    				switch(i){
	    				case 0: 
			    				var summaryEntry = {
			    						amount: null,
			    						group: null,
			    						description: null,
			    						date: null
			    				}
			    				summaryEntry.id = list[i][j].automobileId;
	    						summaryEntry.amount = list[i][j].amount;
	    						summaryEntry.group = "Automobile";
	    						summaryEntry.description = list[i][j].description;
	    						summaryEntry.date = list[i][j].automobileDate;
	    						summaryEntry.balance = list[i][j].balance;
	    						//console.log(summaryEntry);
	    						$rootScope.summaryEntries.push(summaryEntry);
	    						break;
	    				case 1: 
			    				var summaryEntry = {
			    						amount: null,
			    						group: null,
			    						description: null,
			    						date: null
			    				}
			    				summaryEntry.id = list[i][j].entertainmentId;
			    				summaryEntry.amount = list[i][j].amount;
								summaryEntry.group = "Entertainment";
	    						summaryEntry.description = list[i][j].description;
								summaryEntry.date = list[i][j].entertainmentDate;
	    						summaryEntry.balance = list[i][j].balance;
								//console.log(summaryEntry);
								$rootScope.summaryEntries.push(summaryEntry);
								break;
	    				case 2: 
			    				var summaryEntry = {
			    						amount: null,
			    						group: null,
			    						description: null,
			    						date: null
			    				}
			    				summaryEntry.id = list[i][j].foodId;
			    				summaryEntry.amount = list[i][j].amount;
								summaryEntry.group = "Food";
	    						summaryEntry.description = list[i][j].description;
								summaryEntry.date = list[i][j].foodDate;
	    						summaryEntry.balance = list[i][j].balance;
								//console.log(summaryEntry);
								$rootScope.summaryEntries.push(summaryEntry);
	    						break;
	    				case 3: 
			    				var summaryEntry = {
			    						amount: null,
			    						group: null,
			    						description: null,
			    						date: null
			    				}
			    				summaryEntry.id = list[i][j].healthAndFitnessId;
			    				summaryEntry.amount = list[i][j].amount;
								summaryEntry.group = "HealthAndFitness";
	    						summaryEntry.description = list[i][j].description;
								summaryEntry.date = list[i][j].healthAndFitnessDate;
	    						summaryEntry.balance = list[i][j].balance;
								//console.log(summaryEntry);
								$rootScope.summaryEntries.push(summaryEntry);
	    						break;
	    				case 4: 
			    				var summaryEntry = {
			    						amount: null,
			    						group: null,
			    						description: null,
			    						date: null
			    				}	
			    				summaryEntry.id = list[i][j].incomeId;
			    				summaryEntry.amount = list[i][j].amount;
								summaryEntry.group = "Income";
	    						summaryEntry.description = list[i][j].description;
								summaryEntry.date = list[i][j].incomeDate;
	    						summaryEntry.balance = list[i][j].balance;
								//console.log(summaryEntry);
								$rootScope.summaryEntries.push(summaryEntry);
	    						break;
	    				case 5: 
			    				var summaryEntry = {
			    						amount: null,
			    						group: null,
			    						description: null,
			    						date: null
			    				}
			    				summaryEntry.id = list[i][j].miscellaneousId;
			    				summaryEntry.amount = list[i][j].amount;
								summaryEntry.group = "Miscellaneous";
	    						summaryEntry.description = list[i][j].description;
								summaryEntry.date = list[i][j].miscellaneousDate;
	    						summaryEntry.balance = list[i][j].balance;
								//console.log(summaryEntry);
								$rootScope.summaryEntries.push(summaryEntry);
	    						break;
	    				case 6: 
			    				var summaryEntry = {
			    						amount: null,
			    						group: null,
			    						description: null,
			    						date: null
			    				}
			    				summaryEntry.id = list[i][j].rentAndUtilityId;
			    				summaryEntry.amount = list[i][j].amount;
								summaryEntry.group = "RentAndUtility";
	    						summaryEntry.description = list[i][j].description;
								summaryEntry.date = list[i][j].rentAndUtilityDate;
	    						summaryEntry.balance = list[i][j].balance;
								//console.log(summaryEntry);
								$rootScope.summaryEntries.push(summaryEntry);
	    						break;
	    				}
	    			}
	    		}
	    		

				console.log($rootScope.summaryEntries);
				$rootScope.summaryEntries.sort(sortDatesAsc);
				$rootScope.summaryArray = $rootScope.summaryEntries;
	    		$rootScope.showSummaryTable = true;
	    		
	    		console.log("success callback");
				console.log("all selected result: " + $rootScope.allSelected);
	    	   
				if($rootScope.allSelected == false){
					console.log("in all selected false");
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
				else{
					console.log("in select all else");
					display($rootScope.summaryArray);
				}
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
		}
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.date).getTime() > new Date(date2.date).getTime())	return 1;
			if (new Date(date1.date).getTime() < new Date(date2.date).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.date).getTime() > new Date(date2.date).getTime()) return -1;
			if (new Date(date1.date).getTime() < new Date(date2.date).getTime()) return 1;
			return 0;
		}
		
		var display = function(summaryArray){
			console.log("in display");
			console.log(summaryArray);
    		$rootScope.summaryLabels = new Array();
			$rootScope.summaryData = new Array();
			$rootScope.summaryLabels2 = new Array();
			$rootScope.summaryData2 = new Array();
			$rootScope.summarySeries = ['Summary'];
			$rootScope.options = {legend: {display: true}};
			
    		$rootScope.automobileTotal = 0; 
    		$rootScope.entertainmentTotal = 0;
    		$rootScope.foodTotal = 0;
    		$rootScope.healthAndFitnessTotal = 0;
    		$rootScope.summaryTotal = 0;
    		$rootScope.miscellaneousTotal = 0;
    		$rootScope.rentAndUtilityTotal = 0;
			
    		for(x = 0; x < summaryArray.length; x++){
    			if(summaryArray[x].group == "Automobile"){
    				console.log("0");
    				$rootScope.automobileTotal += summaryArray[x].amount;
    			}
    			else if(summaryArray[x].group == "Entertainment"){
    				console.log("1");
    				$rootScope.entertainmentTotal += summaryArray[x].amount;
    			}
    			else if(summaryArray[x].group == "Food"){
    				console.log("2");
    				$rootScope.foodTotal += summaryArray[x].amount;
    			}
    			else if(summaryArray[x].group == "HealthAndFitness"){
    				console.log("3");
    				$rootScope.healthAndFitnessTotal += summaryArray[x].amount;
    			}
    			else if(summaryArray[x].group == "Summary"){
    				console.log("4");
    				$rootScope.summaryTotal += summaryArray[x].amount;
    			}
    			else if(summaryArray[x].group == "Miscellaneous"){
    				console.log("5");
    				$rootScope.miscellaneousTotal += summaryArray[x].amount;
    			}
    			else if(summaryArray[x].group == "RentAndUtilities"){
    				console.log("6");
    				$rootScope.rentAndUtilityTotal += summaryArray[x].amount;
    			}
    			
    		}
			
			
			$rootScope.summaryLabels.push("automobile");
			$rootScope.summaryData.push($rootScope.automobileTotal);
			$rootScope.summaryLabels2.push("automobile");
			$rootScope.summaryData2.push($rootScope.automobileTotal);
			$rootScope.summaryLabels.push("entertainment");
			$rootScope.summaryData.push($rootScope.entertainmentTotal);
			$rootScope.summaryLabels2.push("entertainment");
			$rootScope.summaryData2.push($rootScope.entertainmentTotal);
			$rootScope.summaryLabels.push("food");
			$rootScope.summaryData.push($rootScope.foodTotal);
			$rootScope.summaryLabels2.push("food");
			$rootScope.summaryData2.push($rootScope.foodTotal);
			$rootScope.summaryLabels.push("healthAndFitness");
			$rootScope.summaryData.push($rootScope.healthAndFitnessTotal);
			$rootScope.summaryLabels2.push("healthAndFitness");
			$rootScope.summaryData2.push($rootScope.healthAndFitnessTotal);
			$rootScope.summaryLabels.push("income");
			$rootScope.summaryData.push($rootScope.summaryTotal);
			$rootScope.summaryLabels2.push("income");
			$rootScope.summaryData2.push($rootScope.summaryTotal);
			$rootScope.summaryLabels.push("miscellaneous");
			$rootScope.summaryData.push($rootScope.miscellaneousTotal);
			$rootScope.summaryLabels2.push("miscellaneous");
			$rootScope.summaryData2.push($rootScope.miscellaneousTotal);
			$rootScope.summaryLabels.push("rentAndUtility");
			$rootScope.summaryData.push($rootScope.rentAndUtilityTotal);
			$rootScope.summaryLabels2.push("rentAndUtility");
			$rootScope.summaryData2.push($rootScope.rentAndUtilityTotal);
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
			console.log("all");
			$rootScope.allSelected = true;
			$rootScope.selectedMonth = "All Months";
			$scope.getAllFinances();
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("12-31-2016") &&
				new Date(summary.date) <= new Date("01-31-2017");
			});
			$rootScope.summaryEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("01-31-2017") &&
				new Date(summary.date) <= new Date("02-28-2017");
			});
			$rootScope.summaryEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("02-28-2017") &&
				new Date(summary.date) <= new Date("03-31-2017");
			});
			$rootScope.summaryEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("03-31-2017") &&
				new Date(summary.date) <= new Date("04-30-2017");
			});
			$rootScope.summaryEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("04-30-2017") &&
				new Date(summary.date) <= new Date("05-31-2017");
			});
			$rootScope.summaryEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("05-31-2017") &&
				new Date(summary.date) <= new Date("06-30-2017");
			});
			console.log("june");
			$rootScope.summaryEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("06-30-2017") &&
				new Date(summary.date) <= new Date("07-31-2017");
			});
			$rootScope.summaryEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("07-31-2017") &&
				new Date(summary.date) <= new Date("08-31-2017");
			});
			console.log("august");
			$rootScope.summaryEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("08-31-2017") &&
				new Date(summary.date) <= new Date("09-30-2017");
			});
			$rootScope.summaryEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("09-30-2017") &&
				new Date(summary.date) <= new Date("10-31-2017");
			});
			$rootScope.summaryEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("10-31-2017") &&
				new Date(summary.date) <= new Date("11-30-2017");
			});
			$rootScope.summaryEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.summaryArray, function(summary) {
			    return new Date(summary.date) > new Date("11-30-2017") &&
				new Date(summary.date) <= new Date("12-31-2017");
			});
			$rootScope.summaryEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		$scope.deleteSummaryEntry = function(summaryEntry){
			if (confirm("Are you sure you want to delete this?") == true) {
			    $scope.reallyDeleteSummaryEntry(summaryEntry);
				console.log(summaryEntry);
			} else {
			    console.log("cancelled");
			}
		}
		$scope.reallyDeleteSummaryEntry = function(summaryEntry){
			console.log("in delete summary entry is: \n");
			console.log(summaryEntry);
			$http({
		    	  method: 'DELETE',
		    	  url: 'deleteSummary',
		    	  data: summaryEntry
		    	}).then(function successCallback(response) {
		    	   console.log(response.data);
		    	   $scope.allSelected = false;
		    	   $scope.getAllFinances();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		  
	}]);
	

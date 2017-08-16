app.controller("RentAndUtilitiesController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showRentAndUtilitiesTable = false;
		var responseArray;
		$scope.allSelected = false;
		
		$scope.getAllRentAndUtilities = function(){
			console.log("in get all rentAndUtilities");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllRentAndUtilities',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.rentAndUtilitiesEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showRentAndUtilitiesTable = true;
	    	    	
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				$rootScope.rentAndUtilitiesArray = responseArray;
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
		
		
		$scope.rentAndUtilitiesEntrySubmit = function(){
			var newBalance = $rootScope.balance - $scope.amount;
			var rentAndUtilities = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
			$rootScope.balance = newBalance;
			console.log("rentAndUtilities controller entry click");
			console.log(rentAndUtilities);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewRentAndUtility',
		    	  data: rentAndUtilities
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.rentAndUtilitiesEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllRentAndUtilities();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#rentAndUtilitiesModal').modal('hide');
			$scope.rentAndUtilitiesEntry = null;
		}
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.rentAndUtilityDate).getTime() > new Date(date2.rentAndUtilityDate).getTime())	return 1;
			if (new Date(date1.rentAndUtilityDate).getTime() <= new Date(date2.rentAndUtilityDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.rentAndUtilityDate).getTime() > new Date(date2.rentAndUtilityDate).getTime()) return -1;
			if (new Date(date1.rentAndUtilityDate).getTime() <= new Date(date2.rentAndUtilityDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			if(responseArray.length == 0)
				$rootScope.showRentAndUtilitiesTable = false;
			$rootScope.rentAndUtilitiesLabels = new Array();
			$rootScope.rentAndUtilitiesData = new Array();
			$rootScope.rentAndUtilitiesLabels2 = new Array();
			$rootScope.rentAndUtilitiesData2 = new Array();
			$rootScope.rentAndUtilitiesSeries = ['RentAndUtilities'];
			$rootScope.options = {legend: {display: true}};
			
			for(i = 0; i < responseArray.length; i++){
				
				$rootScope.rentAndUtilitiesLabels.push(responseArray[i].description);
				$rootScope.rentAndUtilitiesData.push(responseArray[i].amount);

				$rootScope.rentAndUtilitiesLabels2.push(responseArray[i].rentAndUtilityDate);
				$rootScope.rentAndUtilitiesData2.push(responseArray[i].amount);
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
			$scope.getAllRentAndUtilities();
			display($rootScope.rentAndUtilitiesArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("12-31-2016") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("01-31-2017");
			});
			$rootScope.rentAndUtilitiesEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("01-31-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("02-28-2017");
			});
			$rootScope.rentAndUtilitiesEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("02-28-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("03-31-2017");
			});
			$rootScope.rentAndUtilitiesEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("03-31-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("04-30-2017");
			});
			$rootScope.rentAndUtilitiesEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("04-30-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("05-31-2017");
			});
			$rootScope.rentAndUtilitiesEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("05-31-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("06-30-2017");
			});
			$rootScope.rentAndUtilitiesEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("06-30-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("07-31-2017");
			});
			$rootScope.rentAndUtilitiesEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("07-31-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("08-31-2017");
			});
			$rootScope.rentAndUtilitiesEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("08-31-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("09-30-2017");
			});
			$rootScope.rentAndUtilitiesEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("09-30-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("10-31-2017");
			});
			$rootScope.rentAndUtilitiesEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("10-31-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("11-30-2017");
			});
			$rootScope.rentAndUtilitiesEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.rentAndUtilitiesArray, function(rentAndUtilities) {
			    return new Date(rentAndUtilities.rentAndUtilityDate) > new Date("11-30-2017") &&
				new Date(rentAndUtilities.rentAndUtilityDate) <= new Date("12-31-2017");
			});
			$rootScope.rentAndUtilitiesEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		$scope.deleteRentAndUtilitiesEntry = function(rentAndUtilityEntry){
			if (confirm("Are you sure you want to delete this?") == true) {
			    $scope.reallyDeleteRentAndUtilitiesEntry(rentAndUtilityEntry);
			} else {
			    console.log("cancelled");
			}
		}
		$scope.reallyDeleteRentAndUtilitiesEntry = function(rentAndUtilityEntry){
			console.log("in delete rentAndUtility entry is: \n");
			console.log(rentAndUtilityEntry);
			$http({
		    	  method: 'DELETE',
		    	  url: 'deleteRentAndUtility',
		    	  data: rentAndUtilityEntry
		    	}).then(function successCallback(response) {
		    	   console.log(response.data);
		    	   $rootScope.balance += rentAndUtilityEntry.amount
		    	   $scope.allSelected = false;
		    	   $scope.getAllRentAndUtilities();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		  
	}]);

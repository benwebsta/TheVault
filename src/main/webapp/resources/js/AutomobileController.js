app.controller("AutomobileController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showAutomobileTable = false;
		var responseArray;
		$scope.allSelected = false;
		
		$scope.getAllAutomobiles = function(){
			console.log("in get all automobiles");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllAutomobiles',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.automobileEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showAutomobileTable = true;
				
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				$rootScope.automobileArray = responseArray;
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

		$scope.formatDate = function(date){
		    var d = new Date(date),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();

		    if (month.length < 2) month = '0' + month;
		    if (day.length < 2) day = '0' + day;

		    return [year, month, day].join('-');
		}
		
		$scope.automobileEntrySubmit = function(){
			var newBalance = $rootScope.balance - $scope.amount;
			var sqlDate = $scope.formatDate($scope.inputDate);
			var automobile = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user,
					date: sqlDate
			}
			$rootScope.balance = newBalance;
			console.log("automobile controller entry click");
			console.log(automobile);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewAutomobile',
		    	  data: automobile
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.automobileEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllAutomobiles();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#automobileModal').modal('hide');
			$scope.automobileEntry = null;
		}
		  
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.automobileDate).getTime() > new Date(date2.automobileDate).getTime())	return 1;
			if (new Date(date1.automobileDate).getTime() <= new Date(date2.automobileDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.automobileDate).getTime() > new Date(date2.automobileDate).getTime()) return -1;
			if (new Date(date1.automobileDate).getTime() <= new Date(date2.automobileDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){	  
			if(responseArray.length == 0)
				$rootScope.showAutomobileTable = false;  
			$rootScope.automobileLabels = new Array();
			$rootScope.automobileData = new Array();
			$rootScope.automobileLabels2 = new Array();
			$rootScope.automobileData2 = new Array();
			$rootScope.automobileSeries = ['Automobile'];
			$rootScope.options = {legend: {display: true}};
			
			var total = 0;
			for(i = 0; i < responseArray.length; i++){
				total += responseArray[i].amount;
				$rootScope.automobileLabels.push(responseArray[i].description);
				$rootScope.automobileData.push(responseArray[i].amount);

				$rootScope.automobileLabels2.push(responseArray[i].automobileDate);
				$rootScope.automobileData2.push(responseArray[i].amount);
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
			$scope.getAllAutomobiles();
			display($rootScope.automobileArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("12-31-2016") &&
				new Date(automobile.automobileDate) <= new Date("01-31-2017");
			});
			$rootScope.automobileEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("01-31-2017") &&
				new Date(automobile.automobileDate) <= new Date("02-28-2017");
			});
			$rootScope.automobileEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("02-28-2017") &&
				new Date(automobile.automobileDate) <= new Date("03-31-2017");
			});
			$rootScope.automobileEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("03-31-2017") &&
				new Date(automobile.automobileDate) <= new Date("04-30-2017");
			});
			$rootScope.automobileEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("04-30-2017") &&
				new Date(automobile.automobileDate) <= new Date("05-31-2017");
			});
			$rootScope.automobileEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("05-31-2017") &&
				new Date(automobile.automobileDate) <= new Date("06-30-2017");
			});
			$rootScope.automobileEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("06-30-2017") &&
				new Date(automobile.automobileDate) <= new Date("07-31-2017");
			});
			$rootScope.automobileEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("07-31-2017") &&
				new Date(automobile.automobileDate) < new Date("08-31-2017");
			});
			$rootScope.automobileEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("08-31-2017") &&
				new Date(automobile.automobileDate) <= new Date("09-30-2017");
			});
			$rootScope.automobileEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("09-30-2017") &&
				new Date(automobile.automobileDate) <= new Date("10-31-2017");
			});
			$rootScope.automobileEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("10-31-2017") &&
				new Date(automobile.automobileDate) <= new Date("11-30-2017");
			});
			$rootScope.automobileEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.automobileArray, function(automobile) {
			    return new Date(automobile.automobileDate) > new Date("11-30-2017") &&
				new Date(automobile.automobileDate) <= new Date("12-31-2017");
			});
			$rootScope.automobileEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		$scope.deleteAutomobileEntry = function(automobileEntry){
			if (confirm("Are you sure you want to delete this?") == true) {
			    $scope.reallyDeleteAutomobileEntry(automobileEntry);
			} else {
			    console.log("cancelled");
			}
		}
		$scope.reallyDeleteAutomobileEntry = function(automobileEntry){
			console.log("in delete and automobile entry is: \n");
			console.log(automobileEntry);
			$http({
		    	  method: 'DELETE',
		    	  url: 'deleteAutomobile',
		    	  data: automobileEntry
		    	}).then(function successCallback(response) {
		    	   console.log(response.data);
		    	   $rootScope.balance += automobileEntry.amount
		    	   $scope.allSelected = false;
		    	   $scope.getAllAutomobiles();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
	}]);

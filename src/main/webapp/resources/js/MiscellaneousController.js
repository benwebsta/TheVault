app.controller("MiscellaneousController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showMiscellaneousTable = false;
		var responseArray;
		$scope.allSelected = false;
		
		$scope.getAllMiscellaneouses = function(){
			console.log("in get all miscellaneouses");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllMiscellaneouses',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.miscellaneousEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showMiscellaneousTable = true;
	    	    	
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				$rootScope.miscellaneousArray = responseArray;
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
		
		
		$scope.miscellaneousEntrySubmit = function(){
			var newBalance = $rootScope.balance - $scope.amount;
			var miscellaneous = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user, 
					balance: newBalance
			}
			$rootScope.balance = newBalance;
			console.log("miscellaneous controller entry click");
			console.log(miscellaneous);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewMiscellaneous',
		    	  data: miscellaneous
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.miscellaneousEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllMiscellaneouses();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#miscellaneousModal').modal('hide');
			$scope.miscellaneousEntry = null;
		}
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.miscellaneousDate).getTime() > new Date(date2.miscellaneousDate).getTime())	return 1;
			if (new Date(date1.miscellaneousDate).getTime() <= new Date(date2.miscellaneousDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.miscellaneousDate).getTime() > new Date(date2.miscellaneousDate).getTime()) return -1;
			if (new Date(date1.miscellaneousDate).getTime() <= new Date(date2.miscellaneousDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			$rootScope.miscellaneousLabels = new Array();
			$rootScope.miscellaneousData = new Array();
			$rootScope.miscellaneousLabels2 = new Array();
			$rootScope.miscellaneousData2 = new Array();
			$rootScope.miscellaneousSeries = ['Miscellaneous'];
			$rootScope.options = {legend: {display: true}};
			
			for(i = 0; i < responseArray.length; i++){
				
				$rootScope.miscellaneousLabels.push(responseArray[i].description);
				$rootScope.miscellaneousData.push(responseArray[i].amount);

				$rootScope.miscellaneousLabels2.push(responseArray[i].miscellaneousDate);
				$rootScope.miscellaneousData2.push(responseArray[i].amount);
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
			$scope.getAllMiscellaneouses();
			display($rootScope.miscellaneousArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("12-31-2016") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("01-31-2017");
			});
			$rootScope.miscellaneousEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("01-31-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("02-28-2017");
			});
			$rootScope.miscellaneousEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("02-28-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("03-31-2017");
			});
			$rootScope.miscellaneousEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("03-31-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("04-30-2017");
			});
			$rootScope.miscellaneousEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("04-30-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("05-31-2017");
			});
			$rootScope.miscellaneousEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("05-31-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("06-30-2017");
			});
			$rootScope.miscellaneousEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("06-30-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("07-31-2017");
			});
			$rootScope.miscellaneousEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("07-31-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("08-31-2017");
			});
			$rootScope.miscellaneousEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("08-31-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("09-30-2017");
			});
			$rootScope.miscellaneousEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("09-30-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("10-31-2017");
			});
			$rootScope.miscellaneousEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("10-31-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("11-30-2017");
			});
			$rootScope.miscellaneousEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.miscellaneousArray, function(miscellaneous) {
			    return new Date(miscellaneous.miscellaneousDate) > new Date("11-30-2017") &&
				new Date(miscellaneous.miscellaneousDate) <= new Date("12-31-2017");
			});
			$rootScope.miscellaneousEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		$scope.deleteMiscellaneousEntry = function(miscellaneousEntry){
			if (confirm("Are you sure you want to delete this?") == true) {
			    $scope.reallyDeleteMiscellaneousEntry(miscellaneousEntry);
			} else {
			    console.log("cancelled");
			}
		}
		$scope.reallyDeleteMiscellaneousEntry = function(miscellaneousEntry){
			console.log("in delete miscellaneous entry is: \n");
			console.log(miscellaneousEntry);
			$http({
		    	  method: 'DELETE',
		    	  url: 'deleteMiscellaneous',
		    	  data: miscellaneousEntry
		    	}).then(function successCallback(response) {
		    	   console.log(response.data);
		    	   $scope.allSelected = false;
		    	   $scope.getAllMiscellaneouses();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		  
	}]);

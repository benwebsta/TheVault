app.controller("EntertainmentController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showEntertainmentTable = false;
		var responseArray;
		$scope.allSelected = false;
		
		$scope.getAllEntertainments = function(){
			console.log("in get all entertainments");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllEntertainments',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.entertainmentEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showEntertainmentTable = true;
	    	
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				$rootScope.entertainmentArray = responseArray;
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
		
		
		$scope.entertainmentEntrySubmit = function(){
			var entertainment = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
			console.log("entertainment controller entry click");
			console.log(entertainment);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewEntertainment',
		    	  data: entertainment
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.entertainmentEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllEntertainments();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#entertainmentModal').modal('hide');
			$scope.entertainmentEntry = null;
		}
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.entertainmentDate).getTime() > new Date(date2.entertainmentDate).getTime())	return 1;
			if (new Date(date1.entertainmentDate).getTime() <= new Date(date2.entertainmentDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.entertainmentDate).getTime() > new Date(date2.entertainmentDate).getTime()) return -1;
			if (new Date(date1.entertainmentDate).getTime() <= new Date(date2.entertainmentDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			$rootScope.entertainmentLabels = new Array();
			$rootScope.entertainmentData = new Array();
			$rootScope.entertainmentLabels2 = new Array();
			$rootScope.entertainmentData2 = new Array();
			$rootScope.entertainmentSeries = ['Entertainment'];
			
			$rootScope.options = {legend: {display: true}};
			for(i = 0; i < responseArray.length; i++){
				
				$rootScope.entertainmentLabels.push(responseArray[i].description);
				$rootScope.entertainmentData.push(responseArray[i].amount);

				$rootScope.entertainmentLabels2.push(responseArray[i].entertainmentDate);
				$rootScope.entertainmentData2.push(responseArray[i].amount);
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
			$scope.getAllEntertainments();
			display($rootScope.entertainmentArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("12-31-2016") &&
				new Date(entertainment.entertainmentDate) <= new Date("01-31-2017");
			});
			$rootScope.entertainmentEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("01-31-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("02-28-2017");
			});
			$rootScope.entertainmentEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("02-28-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("03-31-2017");
			});
			$rootScope.entertainmentEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("03-31-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("04-30-2017");
			});
			$rootScope.entertainmentEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("04-30-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("05-31-2017");
			});
			$rootScope.entertainmentEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("05-31-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("06-30-2017");
			});
			$rootScope.entertainmentEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("06-30-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("07-31-2017");
			});
			$rootScope.entertainmentEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("07-31-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("08-31-2017");
			});
			$rootScope.entertainmentEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("08-31-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("09-30-2017");
			});
			$rootScope.entertainmentEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("09-30-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("10-31-2017");
			});
			$rootScope.entertainmentEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("10-31-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("11-30-2017");
			});
			$rootScope.entertainmentEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.entertainmentArray, function(entertainment) {
			    return new Date(entertainment.entertainmentDate) > new Date("11-30-2017") &&
				new Date(entertainment.entertainmentDate) <= new Date("12-31-2017");
			});
			$rootScope.entertainmentEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		  
	}]);

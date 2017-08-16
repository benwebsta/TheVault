app.controller("FoodController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showFoodTable = false;
		var responseArray;
		$scope.allSelected = false;
		
		$scope.getAllFoods = function(){
			console.log("in get all foods");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllFoods',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.foodEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showFoodTable = true;
	
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				$rootScope.foodArray = responseArray;
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
		
		
		$scope.foodEntrySubmit = function(){
			var newBalance = $rootScope.balance - $scope.amount;
			var food = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
			$rootScope.balance = newBalance;
			console.log("food controller entry click");
			console.log(food);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewFood',
		    	  data: food
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.foodEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllFoods();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#foodModal').modal('hide');
			$scope.foodEntry = null;
		}
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.foodDate).getTime() > new Date(date2.foodDate).getTime())	return 1;
			if (new Date(date1.foodDate).getTime() <= new Date(date2.foodDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.foodDate).getTime() > new Date(date2.foodDate).getTime()) return -1;
			if (new Date(date1.foodDate).getTime() <= new Date(date2.foodDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			if(responseArray.length == 0)
				$rootScope.showFoodTable = false;
			$rootScope.foodLabels = new Array();
			$rootScope.foodData = new Array();
			$rootScope.foodLabels2 = new Array();
			$rootScope.foodData2 = new Array();
			$rootScope.foodSeries = ['Food'];
			$rootScope.options = {legend: {display: true}};
			
			for(i = 0; i < responseArray.length; i++){
				
				$rootScope.foodLabels.push(responseArray[i].description);
				$rootScope.foodData.push(responseArray[i].amount);

				$rootScope.foodLabels2.push(responseArray[i].foodDate);
				$rootScope.foodData2.push(responseArray[i].amount);
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
			$scope.getAllFoods();
			display($rootScope.foodArray);
		}
		$scope.january = function(){
			var january = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("12-31-2016") &&
				new Date(food.foodDate) <= new Date("01-31-2017");
			});
			$rootScope.foodEntries = january;
			display(january);
			$rootScope.selectedMonth = "January";
		}
		$scope.february = function(){
			var february = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("01-31-2017") &&
				new Date(food.foodDate) <= new Date("02-28-2017");
			});
			$rootScope.foodEntries = february;
			display(february);
			$rootScope.selectedMonth = "February";
		}
		$scope.march = function(){
			var march = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("02-28-2017") &&
				new Date(food.foodDate) <= new Date("03-31-2017");
			});
			$rootScope.foodEntries = march;
			display(march);
			$rootScope.selectedMonth = "March";
		}
		$scope.april = function(){
			var april = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("03-31-2017") &&
				new Date(food.foodDate) <= new Date("04-30-2017");
			});
			$rootScope.foodEntries = april;
			display(april);
			$rootScope.selectedMonth = "April";
		}
		$scope.may = function(){
			var may = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("04-30-2017") &&
				new Date(food.foodDate) <= new Date("05-31-2017");
			});
			$rootScope.foodEntries = may;
			display(may);
			$rootScope.selectedMonth = "May";
		}
		$scope.june = function(){
			var june = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("05-31-2017") &&
				new Date(food.foodDate) <= new Date("06-30-2017");
			});
			$rootScope.foodEntries = june;
			display(june);
			$rootScope.selectedMonth = "June";
		}
		$scope.july = function(){
			var july = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("06-30-2017") &&
				new Date(food.foodDate) <= new Date("07-31-2017");
			});
			$rootScope.foodEntries = july;
			display(july);
			$rootScope.selectedMonth = "July";
		}
		$scope.august = function(){
			var august = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("07-31-2017") &&
				new Date(food.foodDate) <= new Date("08-31-2017");
			});
			$rootScope.foodEntries = august;
			display(august);
			$rootScope.selectedMonth = "August";
		}
		$scope.september = function(){
			var september = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("08-31-2017") &&
				new Date(food.foodDate) <= new Date("09-30-2017");
			});
			$rootScope.foodEntries = september;
			display(september);
			$rootScope.selectedMonth = "September";
		}
		$scope.october = function(){
			var october = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("09-30-2017") &&
				new Date(food.foodDate) <= new Date("10-31-2017");
			});
			$rootScope.foodEntries = october;
			display(october);
			$rootScope.selectedMonth = "October";
		}
		$scope.november = function(){
			var november = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("10-31-2017") &&
				new Date(food.foodDate) <= new Date("11-30-2017");
			});
			$rootScope.foodEntries = november;
			display(november);
			$rootScope.selectedMonth = "November";
		}
		$scope.december = function(){
			var december = monthFilter($rootScope.foodArray, function(food) {
			    return new Date(food.foodDate) > new Date("11-30-2017") &&
				new Date(food.foodDate) <= new Date("12-31-2017");
			});
			$rootScope.foodEntries = december;
			display(december);
			$rootScope.selectedMonth = "December";
		}
		$scope.deleteFoodEntry = function(foodEntry){
			if (confirm("Are you sure you want to delete this?") == true) {
			    $scope.reallyDeleteFoodEntry(foodEntry);
			} else {
			    console.log("cancelled");
			}
		}
		$scope.reallyDeleteFoodEntry = function(foodEntry){
			console.log("in delete food entry is: \n");
			console.log(foodEntry);
			$http({
		    	  method: 'DELETE',
		    	  url: 'deleteFood',
		    	  data: foodEntry
		    	}).then(function successCallback(response) {
		    	   console.log(response.data);
		    	   $rootScope.balance += foodEntry.amount
		    	   $scope.allSelected = false;
		    	   $scope.getAllFoods();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		  
	}]);

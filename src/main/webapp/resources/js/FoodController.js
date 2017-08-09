app.controller("FoodController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showFoodTable = false;
		var responseArray;
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
	    	    	
	    	    
				$rootScope.foodLabels = new Array();
				$rootScope.foodData = new Array();
				$rootScope.foodLabels2 = new Array();
				$rootScope.foodData2 = new Array();
				$rootScope.foodSeries = ['Food'];
				$rootScope.options = {legend: {display: true}};
				
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				display(responseArray);
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
			
		}
		
		
		$scope.foodEntrySubmit = function(){
			var food = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
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
			if (new Date(date1.foodDate).getTime() < new Date(date2.foodDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.foodDate).getTime() > new Date(date2.foodDate).getTime()) return -1;
			if (new Date(date1.foodDate).getTime() < new Date(date2.foodDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			for(i = 0; i < responseArray.length; i++){
				$rootScope.foodLabels.push(responseArray[i].description);
				$rootScope.foodData.push(responseArray[i].amount);

				$rootScope.foodLabels2.push(responseArray[i].foodDate);
				$rootScope.foodData2.push(responseArray[i].amount);
			}
		}
		  
	}]);

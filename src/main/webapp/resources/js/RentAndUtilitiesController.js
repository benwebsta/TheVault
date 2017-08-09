app.controller("RentAndUtilitiesController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showRentAndUtilitiesTable = false;
		var responseArray;
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
	    	    	
	    	    
				$rootScope.rentAndUtilitiesLabels = new Array();
				$rootScope.rentAndUtilitiesData = new Array();
				$rootScope.rentAndUtilitiesLabels2 = new Array();
				$rootScope.rentAndUtilitiesData2 = new Array();
				$rootScope.rentAndUtilitiesSeries = ['RentAndUtilities'];
				$rootScope.options = {legend: {display: true}};
				
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				display(responseArray);
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
			
		}
		
		
		$scope.rentAndUtilitiesEntrySubmit = function(){
			var rentAndUtilities = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
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
			if (new Date(date1.rentAndUtilityDate).getTime() < new Date(date2.rentAndUtilityDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.rentAndUtilityDate).getTime() > new Date(date2.rentAndUtilityDate).getTime()) return -1;
			if (new Date(date1.rentAndUtilityDate).getTime() < new Date(date2.rentAndUtilityDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			for(i = 0; i < responseArray.length; i++){
				$rootScope.rentAndUtilitiesLabels.push(responseArray[i].description);
				$rootScope.rentAndUtilitiesData.push(responseArray[i].amount);

				$rootScope.rentAndUtilitiesLabels2.push(responseArray[i].rentAndUtilityDate);
				$rootScope.rentAndUtilitiesData2.push(responseArray[i].amount);
			}
		}
		  
	}]);

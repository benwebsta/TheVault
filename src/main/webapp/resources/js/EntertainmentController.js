app.controller("EntertainmentController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showEntertainmentTable = false;
		var responseArray;
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
	    	    	
	    	    
				$rootScope.entertainmentLabels = new Array();
				$rootScope.entertainmentData = new Array();
				$rootScope.entertainmentLabels2 = new Array();
				$rootScope.entertainmentData2 = new Array();
				$rootScope.entertainmentSeries = ['Entertainment'];
				$rootScope.options = {legend: {display: true}};
				
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				display(responseArray);
				
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
			if (new Date(date1.entertainmentDate).getTime() < new Date(date2.entertainmentDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.entertainmentDate).getTime() > new Date(date2.entertainmentDate).getTime()) return -1;
			if (new Date(date1.entertainmentDate).getTime() < new Date(date2.entertainmentDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			for(i = 0; i < responseArray.length; i++){
				$rootScope.entertainmentLabels.push(responseArray[i].description);
				$rootScope.entertainmentData.push(responseArray[i].amount);

				$rootScope.entertainmentLabels2.push(responseArray[i].entertainmentDate);
				$rootScope.entertainmentData2.push(responseArray[i].amount);
			}
		}
		  
	}]);

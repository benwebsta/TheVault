app.controller("AutomobileController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showAutomobileTable = false;
		var responseArray;
		
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
	    	    	
	    	    
				$rootScope.automobileLabels = new Array();
				$rootScope.automobileData = new Array();
				$rootScope.automobileLabels2 = new Array();
				$rootScope.automobileData2 = new Array();
				$rootScope.automobileSeries = ['Automobile'];
				$rootScope.options = {legend: {display: true}};
				
				for(i = 0; i < responseArray.length; i++){
					console.log(responseArray[i]);
					$rootScope.automobileLabels.push(responseArray[i].description);
					$rootScope.automobileData.push(responseArray[i].amount);

					$rootScope.automobileLabels2.push(responseArray[i].automobileDate);
					$rootScope.automobileData2.push(responseArray[i].amount);
				}
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
			
		}
		
		
		$scope.automobileEntrySubmit = function(){
			var automobile = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
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
		  
	}]);

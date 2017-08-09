app.controller("HealthAndFitnessController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showHealthAndFitnessTable = false;
		var responseArray;
		$scope.getAllHealthAndFitnesses = function(){
			console.log("in get all healthAndFitnesses");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllHealthAndFitnesses',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {	
	    		responseArray = response.data;
	    		console.log("success callback");
	    		$rootScope.healthAndFitnessEntries = response.data;
	    	    
	    	    if(response.data != "")
	    	    	$rootScope.showHealthAndFitnessTable = true;
	    	    	
	    	    
				$rootScope.healthAndFitnessLabels = new Array();
				$rootScope.healthAndFitnessData = new Array();
				$rootScope.healthAndFitnessLabels2 = new Array();
				$rootScope.healthAndFitnessData2 = new Array();
				$rootScope.healthAndFitnessSeries = ['HealthAndFitness'];
				$rootScope.options = {legend: {display: true}};
				
				//sort by date then display in charts
				responseArray.sort(sortDatesAsc);
				display(responseArray);
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
			
		}
		
		
		$scope.healthAndFitnessEntrySubmit = function(){
			var healthAndFitness = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
			console.log("healthAndFitness controller entry click");
			console.log(healthAndFitness);
			
	    	console.log("in POST");
		    $http({
		    	  method: 'POST',
		    	  url: 'createNewHealthAndFitness',
		    	  data: healthAndFitness
		    	}).then(function successCallback(response) {
		    	   $scope.result = response.data;
		    	   console.log(response.data);
					$scope.healthAndFitnessEntry = true;
					$timeout(closeModal, 1000);
					$scope.getAllHealthAndFitnesses();
		    	  }, function errorCallback(response) {
		    		  console.log("error");
		    	   	  console.log(response.data);
		    	  });
		}
		
		var closeModal = function(){
			$(".modal-body input").val("");
			$('#healthAndFitnessModal').modal('hide');
			$scope.healthAndFitnessEntry = null;
		}
		
		var sortDatesAsc = function(date1, date2){
			if(new Date(date1.healthAndFitnessDate).getTime() > new Date(date2.healthAndFitnessDate).getTime())	return 1;
			if (new Date(date1.healthAndFitnessDate).getTime() < new Date(date2.healthAndFitnessDate).getTime()) return -1;
			return 0;
		}
		var sortDatesDesc = function(date1, date2){
			if(new Date(date1.healthAndFitnessDate).getTime() > new Date(date2.healthAndFitnessDate).getTime()) return -1;
			if (new Date(date1.healthAndFitnessDate).getTime() < new Date(date2.healthAndFitnessDate).getTime()) return 1;
			return 0;
		}
		var display = function(responseArray){
			for(i = 0; i < responseArray.length; i++){
				$rootScope.healthAndFitnessLabels.push(responseArray[i].description);
				$rootScope.healthAndFitnessData.push(responseArray[i].amount);

				$rootScope.healthAndFitnessLabels2.push(responseArray[i].healthAndFitnessDate);
				$rootScope.healthAndFitnessData2.push(responseArray[i].amount);
			}
		}
		  
	}]);

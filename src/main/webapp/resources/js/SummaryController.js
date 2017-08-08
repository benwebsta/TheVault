app.controller("SummaryController", 
	['$scope', '$http', '$rootScope',
		function($scope, $http, $rootScope) {

		$scope.getAllFinances = function(){
			console.log("in get all finances");
			$http({
	    	  method: 'POST',
	    	  url: 'getAllFinances',
	    	  data: $scope.user
	    	}).then(function successCallback(response) {
	    		var list = response.data;
	    		$rootScope.automobileTotal = 0; 
	    		$rootScope.entertainmentTotal = 0;
	    		$rootScope.foodTotal = 0;
	    		$rootScope.healthAndFitnessTotal = 0;
	    		$rootScope.incomeTotal = 0;
	    		$rootScope.miscellaneousTotal = 0;
	    		$rootScope.rentAndUtilityTotal = 0;
	    		
	    		console.log("success callback");
	    		console.log(response.data);
	    		$rootScope.listOfFinances = response.data;
	    	   
	    		for(i = 0; i < list.length; i++){
	    			if(list[i] != null)
	    			for(j = 0; j < list[i].length; j++){
	    				switch(i){
	    				case 0: $rootScope.automobileTotal += list[i][j].amount;
	    						break;
	    				case 1: $rootScope.entertainmentTotal += list[i][j].amount;
								break;
	    				case 2: $rootScope.foodTotal += list[i][j].amount;
	    						break;
	    				case 3: $rootScope.healthAndFitnessTotal += list[i][j].amount;
	    						break;
	    				case 4: $rootScope.incomeTotal += list[i][j].amount;
	    						break;
	    				case 5: $rootScope.miscellaneousTotal += list[i][j].amount;
	    						break;
	    				case 6: $rootScope.rentAndUtilityTotal += list[i][j].amount;
	    						break;
	    				}
	    			}
	    		}
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
		}
		  
	}]);
	

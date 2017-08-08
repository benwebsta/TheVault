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
	    		$rootScope.summaryTotal = 0;
	    		$rootScope.miscellaneousTotal = 0;
	    		$rootScope.rentAndUtilityTotal = 0;
	    		
	    		console.log("success callback");
	    		console.log(response.data);
	    		$rootScope.listOfFinances = response.data;
	    		
	    		$rootScope.summaryLabels = new Array();
				$rootScope.summaryData = new Array();
				$rootScope.summaryLabels2 = new Array();
				$rootScope.summaryData2 = new Array();
				$rootScope.summarySeries = ['Summary'];
				$rootScope.options = {legend: {display: true}};
	    	   
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

    			$rootScope.summaryLabels.push("automobile");
				$rootScope.summaryData.push($rootScope.automobileTotal);
				$rootScope.summaryLabels2.push("automobile");
				$rootScope.summaryData2.push($rootScope.automobileTotal);
				$rootScope.summaryLabels.push("entertainment");
				$rootScope.summaryData.push($rootScope.entertainmentTotal);
				$rootScope.summaryLabels2.push("entertainment");
				$rootScope.summaryData2.push($rootScope.entertainmentTotal);
				$rootScope.summaryLabels.push("food");
				$rootScope.summaryData.push($rootScope.foodTotal);
				$rootScope.summaryLabels2.push("food");
				$rootScope.summaryData2.push($rootScope.foodTotal);
				$rootScope.summaryLabels.push("healthAndFitness");
				$rootScope.summaryData.push($rootScope.healthAndFitnessTotal);
				$rootScope.summaryLabels2.push("healthAndFitness");
				$rootScope.summaryData2.push($rootScope.healthAndFitnessTotal);
				$rootScope.summaryLabels.push("summary");
				$rootScope.summaryData.push($rootScope.summaryTotal);
				$rootScope.summaryLabels2.push("summary");
				$rootScope.summaryData2.push($rootScope.summaryTotal);
				$rootScope.summaryLabels.push("miscellaneous");
				$rootScope.summaryData.push($rootScope.miscellaneousTotal);
				$rootScope.summaryLabels2.push("miscellaneous");
				$rootScope.summaryData2.push($rootScope.miscellaneousTotal);
				$rootScope.summaryLabels.push("rentAndUtility");
				$rootScope.summaryData.push($rootScope.rentAndUtilityTotal);
				$rootScope.summaryLabels2.push("rentAndUtility");
				$rootScope.summaryData2.push($rootScope.rentAndUtilityTotal);
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
		}
		  
	}]);
	

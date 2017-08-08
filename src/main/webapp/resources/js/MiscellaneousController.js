app.controller("MiscellaneousController", 
	['$scope', '$http', '$state', '$timeout', '$rootScope',
		function($scope, $http, $state, $timeout, $rootScope) {
		$rootScope.showMiscellaneousTable = false;
		var responseArray;
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
	    	    	
	    	    
				$rootScope.miscellaneousLabels = new Array();
				$rootScope.miscellaneousData = new Array();
				$rootScope.miscellaneousLabels2 = new Array();
				$rootScope.miscellaneousData2 = new Array();
				$rootScope.miscellaneousSeries = ['Miscellaneous'];
				$rootScope.options = {legend: {display: true}};
				
				for(i = 0; i < responseArray.length; i++){
					console.log(responseArray[i]);
					$rootScope.miscellaneousLabels.push(responseArray[i].description);
					$rootScope.miscellaneousData.push(responseArray[i].amount);

					$rootScope.miscellaneousLabels2.push(responseArray[i].miscellaneousDate);
					$rootScope.miscellaneousData2.push(responseArray[i].amount);
				}
				
	    	  }, function errorCallback(response) {
	    		  console.log("error");
	    	   	  console.log(response.data);
	    	  });
			
		}
		
		
		$scope.miscellaneousEntrySubmit = function(){
			var miscellaneous = {
					amount: $scope.amount,
					description: $scope.description,
					user: $scope.user
			}
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
		  
	}]);

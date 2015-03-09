function AppCtrl ($scope, $http) {
	// body...

	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			console.log("got request");
			$scope.contactlist = response;
			$success.contact = "";

		});
	};
	refresh();

	$scope.addContact = function(){
		console.log($scope.contact.name);
		//var name = $scope.contact.name;
		//var bool = false;
		//$scope.isErrorOccured = false;

		//$http.check('/contactlist', $scope.contact)



		//if(bool)
		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log(response);
			refresh();
			$scope.bool = false;
			$scope.contact = "";
		});

	};

	$scope.remove = function(id){
		//console.log(id);
		$http.delete('/contactlist/' + id).success(function(response) {
			refresh();
		});
	};
	$scope.edit = function(id) {
		$http.get('/contactlist/' + id).success(function(response) {
			$scope.contact = response; 
			 
		});

	};

	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
			refresh();
			$scope.contact = "";
		});
	};

	$scope.deselect = function(){
		$scope.contact = "";
		
	};

}
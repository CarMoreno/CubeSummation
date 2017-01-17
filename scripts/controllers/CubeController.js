var app = angular.module("CubeSummation")
app.controller('CubeController', ['$scope', 'cubeService', 

	function($scope, cubeService) {
		$scope.metaData = {}
		$scope.operations = [{"operation": "UPDATE"}]
		$scope.optionSelect = ['UPDATE', 'QUERY']

		$scope.addOperation = function() {
			$scope.operations.push({"operation": "UPDATE"})
		}
		$scope.removeOperation = function() {
			$scope.operations.pop()
		}

		$scope.execute = function() {
			cubeService.init($scope.metaData, $scope.operations)
		}

	}
])
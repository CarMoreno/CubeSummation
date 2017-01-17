/**
Author: Carlos Andrés Moreno
Fecha: Enero 
**/
var app = angular.module("CubeSummation")
app.controller('CubeController', ['$scope', 'cubeService', 

	function($scope, cubeService) {
		$scope.metaData = {}
		$scope.operations = [{"operation": "UPDATE"}]
		$scope.optionSelect = ['UPDATE', 'QUERY']
		$scope.solution = []

		$scope.addOperation = function() {
			$scope.operations.push({"operation": "UPDATE"})
		}
		$scope.removeOperation = function() {
			$scope.operations.pop()
		}

		$scope.resetSolution = function() {
			if($scope.metaData.test < 0) {
				$scope.solution = []
			}
		}

		$scope.execute = function() {
			cubeService.init($scope.metaData, $scope.operations, $scope.solution)
			cubeService.evalOperations()
			$scope.metaData.test--
			$scope.resetSolution()
		}

	}
])
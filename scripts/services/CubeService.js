var app = angular.module("CubeSummation")
app.factory('cubeService', function() {
	var cube = {}

	cube.init = function(metaData, operations) {
		console.log(metaData)
		console.log("------")
		console.log(operations)
	}

	return cube
})
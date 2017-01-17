var app = angular.module("CubeSummation")
app.factory('cubeService', function() {
	var cubeService = {}
	var matrix = []
	var size
	var cantOperations
	var cantTest
	var operations

	cubeService.init = function(objMetaData, arrayOperations) {
		size = objMetaData.size
		cantTest = objMetaData.test
		cantOperations = arrayOperations.length
		operations = arrayOperations
		cubeService.createCube()
	}

	cubeService.createCube = function() {
		for (var x = 0; x < size;  x++) {
			for (var y = 0; y < size;  y++) {
				for (var z = 0; z < size; z++) {
					if(!Array.isArray(matrix[x])) {
						matrix[x] = []
					}
					if(!Array.isArray(matrix[x][y])) {
						matrix[x][y] = []
					}
					if(!Array.isArray(matrix[x][y])) {
						matrix[x][y][z] = []
					}
					matrix[x][y][z] = 0
				}
			}
		}
	}

	cubeService.evalOperations = function() {
		for (var i in operations) {
			if(operations[i].operation == "UPDATE") {
				cubeService.update(operations[i].numbers)
			}
			else {
				cubeService.query(operations[i].numbers)
			}
		}
	}

	cubeService.convertNumbers = function(numbers) {
		var arrayNumbers = numbers.split(' ').map(Number)
		for (var i in numbers) {
			arrayNumbers.push(parseInt(numbers[i]))
		}
		return arrayNumbers
	}

	cubeService.update = function(numbers) {
		var intNumbers = cubeService.convertNumbers(numbers)
		var x = intNumbers[0] - 1
		var y = intNumbers[1] - 1
		var z = intNumbers[2] - 1
		var W = intNumbers[3]
		matrix[x][y][z] = W 
	}

	cubeService.query = function(numbers) {
		var intNumbers = cubeService.convertNumbers(numbers)
		var suma = 0
		var x1 = intNumbers[0] - 1
		var y1 = intNumbers[1] - 1
		var z1 = intNumbers[2] - 1
		var	x2 = intNumbers[3] - 1
		var y2 = intNumbers[4] - 1
		var z2 = intNumbers[5] - 1

		for (var x = x1; x <= x2 ; x++) {
			for (var y = y1; y <= y2 ; y++) {
				for (var z = z1; z <= z2 ; z++) {
					suma += matrix[x][y][z]
				}
			}
		}
		return suma
	}

	return cubeService
})
var app = angular.module("CubeSummation")
app.factory('cubeService', function() {
	var cubeService = {}
	var matrix = []
	var size
	var operations
	var solution

	cubeService.init = function(objMetaData, arrayOperations, arraySolution) {
		size = objMetaData.size
		operations = arrayOperations
		solution = arraySolution
		cubeService.createCube()
	}

	cubeService.createCube = function() {
		try{
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
		}//Fin try
		catch(error){
			alert("¡Vaya!, un error ha ocurrido: "+error)
		}
	}//Fin createCube

	cubeService.evalOperations = function() {
		try{
			for (var i in operations) {
				if(operations[i].operation == "UPDATE") {
					cubeService.update(operations[i].numbers)
				}
				else {
					cubeService.query(operations[i].numbers)
				}
			}
		}
		catch(error){
			alert("¡Vaya!, un error ha ocurrido: "+error)
		}
	}

	cubeService.convertNumbers = function(numbers) {
		try {
			var arrayNumbers = numbers.split(' ').map(Number)
			for (var i in numbers) {
				arrayNumbers.push(parseInt(numbers[i]))
			}
			return arrayNumbers
		} 
		catch(error) {
			alert("¡Vaya!, un error ha ocurrido: "+error)
		}
	}

	cubeService.update = function(numbers) {
		try{
			var intNumbers = cubeService.convertNumbers(numbers)
			var x = intNumbers[0] - 1
			var y = intNumbers[1] - 1
			var z = intNumbers[2] - 1
			var W = intNumbers[3]
			if(W >= Math.pow(-10, 9) && W <= Math.pow(10, 9)) {
				matrix[x][y][z] = W 
			}
			else {
				alert("La cantidad a insertar no está en los límites establecidos")
			}
		}
		catch(error) {
			alert("¡Vaya!, un error ha ocurrido: "+error)
		}
	}

	cubeService.query = function(numbers) {
		try{
			var intNumbers = cubeService.convertNumbers(numbers)
			var suma = 0
			var x1 = intNumbers[0] - 1
			var y1 = intNumbers[1] - 1
			var z1 = intNumbers[2] - 1
			var	x2 = intNumbers[3] - 1
			var y2 = intNumbers[4] - 1
			var z2 = intNumbers[5] - 1

			for (var x = x1; x <= x2; x++) {
				for (var y = y1; y <= y2; y++) {
					for (var z = z1; z <= z2; z++) {
						suma += matrix[x][y][z]
					}
				}
			}
			solution.push(suma)
		}
		catch(error){
			alert("¡Vaya!, un error ha ocurrido: "+error)
		}
	}

	return cubeService
})
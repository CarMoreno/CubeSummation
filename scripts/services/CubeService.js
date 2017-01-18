/**
Author: Carlos Andrés Moreno
Fecha: Enero 15 de 2017
Fecha ultima modificación = Enero 17 de 2017
Servicio: CubeServicie
**/
var app = angular.module("CubeSummation")
app.service('cubeService', 

	function() {
		var cubeService = {}
		var matrix = []
		var size
		var solution

		/**
		 * [init   Este método inicializa los valores que serán usados en todo el servicio, recibe los mensajes
		 * que el CubeController le envia y además, se encarga de hacer el llamado a la creacion del Cubo.]
		 * @param  {[Objetc]} objMetaData     [Objeto con metadatos de tamaño de cubo y numero de tests. El 
		 * siguiente es un ejemplo de como luce este objeto: {"test":"2", "size": "4"} ]
		 * @param  {[Array]} arraySolution  [Array que va a almacenar las soluciones para posteriormente mostrarlas
		 *  en la vista]
		 */
		cubeService.init = function(objMetaData, arraySolution) {
			size = objMetaData.size
			solution = arraySolution
			cubeService.createCube()
		}

		/**
		 * [createCube Crea una matriz en 3d (El Cubo) e inicializa todas sus celdas con el valor de
		 * cero]
		 */
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

		/**
		 * [convertNumbers Función auxiliar que se encarga de convertir una cadena de numeros
		 * seaparados por un espacio, en un arreglo de numeros enteros. Esto con el fin de utilizar
		 * los valores más adelante para realiazar las operaciones de UPDATE y QUERY]
		 * @param  {[string]} numbers [Cadena de números separados por un espacio]
		 * @return {[Array]}         [Arreglo de numeros enteros]
		 */
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

		/**
		 * [update Esta función se encarga de realizar la operacion de UPDATE dado una cadena de numeros.
		 * En esta cadena viene la información de las posiciones y el valor a insertar. Por ejemplo, la cadena
		 * '2 3 2 34' quiere decir que en la posicion (2,3,2) se va a insertar el valor 34]
		 * @param  {[string]} numbers [Cadena de números]
		 */
		cubeService.update = function(numbers) {
			try{
				var intNumbers = cubeService.convertNumbers(numbers) //Convertimos la cadena a un array de enteros
				var x = intNumbers[0] - 1
				var y = intNumbers[1] - 1
				var z = intNumbers[2] - 1
				var W = intNumbers[3] // Valor a insertar
				// El problema habla de una restricción para el valor a insertar, por esa razón se verifica.
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

		/**
		 * [query Esta función se encarga de realizar la operacion QUERY dada una cadena de números, en esta
		 * cadena está la información de las posiciones. Por ejemplo, la cadena '1 1 1 3 3 3' quiere decir
		 * que se hará la suma de las posiciones (1,1,1);(2,2,2) y (3,3,3)]
		 * @param  {[string]} numbers [cadena de números]
		           
		 */
		cubeService.query = function(numbers) {
			try{
				var intNumbers = cubeService.convertNumbers(numbers)
				var suma = 0
				// Establecemos las posiciones
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
				solution.push(suma)// Guardamos en un arreglo las sumas obtenidas
			}
			catch(error){
				alert("¡Vaya!, un error ha ocurrido: "+error)
			}
		}

		return cubeService
})
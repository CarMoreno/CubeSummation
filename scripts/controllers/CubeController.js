/**
Author: Carlos Andrés Moreno
Fecha: Enero 15 de 2017
Fecha ultima modificación = Enero 17 de 2017
Controlador: CubeController
**/
var app = angular.module("CubeSummation")
app.controller('CubeController', ['$scope', 'cubeService', 

	function($scope, cubeService) {

		// Este objeto guarda metadatos del problema, como el tamaño del cubo y el numero de tests.
		$scope.metaData = {}
		/** En este array se guardan las operacion que se van a realiazar en un test, sus elementos son objetos js
		este array lucirá así: 
		[
		 	{"operation":"UPDATE", "numbers":"1 1 1 45"}, 
		 	{"operation":"UPDATE", "numbers":"3 3 3 45"},
		 	{"operation":"QUERY", "numbers":"1 1 1 3 3 3"},
		 	{"operation":"QUERY", "numbers":"1 1 1 2 2 2"}
		]
		Para obtener la cantidad de operaciones que se realiazará, basta con obtener el tamaño del arreglo anterior.
		*/ 
		$scope.operations = [{"operation": "UPDATE"}]
		$scope.optionSelect = ['UPDATE', 'QUERY'] // array simple para mostrar las opciones de campo select del formulario
		$scope.solution = [] // donde se guardará la solución

		/**
		 * [addOperation Añade una nueva operación que será renderizada en el vista, esta función es
		 * ejecutada cada vez que se hace click en el boton de "Agregar nueva operación". Por defecto
		 * será renderizada una operacion UPDATE en la vista.]
		 */
		$scope.addOperation = function() {
			$scope.operations.push({"operation": "UPDATE"})
		}

		/**
		 * [removeOperation Remueve la última operación (UPDATE o DELETE) existente en la vista, esta función
		 *  es ejecutada cada vez que se hace click en el botón de "Remover operación"]
		 */
		$scope.removeOperation = function() {
			$scope.operations.pop()
		}

		/**
		 * [resetSolution Establece un arreglo vacío cuando se da por terminada la ejecución de todos los test
		 * establecidos por el usuario]
		 */
		$scope.resetSolution = function() {
			$scope.metaData.test-- // El número de test disminuye, pues ya se ha ejecutado uno.
			if($scope.metaData.test < 0) {
				$scope.solution = []
			}
		}

		/**
		 * [execute Esta función envía los mensajes correspondientes al servicio "CubeService" para que este
		 * pueda realizar los cálculos pertinentes con los datos que el usuario envió previamente
		 * desde la vista. Esta función se ejecuta cuando el usuario hace click en el botón "Calcular"]
		 */
		$scope.execute = function() {
			cubeService.init($scope.metaData, $scope.solution)
			try{
				for (var i in $scope.operations) {
					if($scope.operations[i].operation == "UPDATE") {
						cubeService.update($scope.operations[i].numbers)
					}
					else {
						cubeService.query($scope.operations[i].numbers)
					}
				}
			}
			catch(error){
				alert("¡Vaya!, un error ha ocurrido: "+error)
			}
			$scope.resetSolution()
		}

	}
])
'use strict';

// Create controller
robotApp.controller('interfaceCtrl', function($scope) {
  // Create array of coordinates
  $scope.coords = [
    {"pos": "x", "val" : 1},
    {"pos": "y", "val" : 2}
  ];

  // Global variables
  $scope.orient = 1;    // Initial orientation
  var gridWidth = 5;   // Set width of grid
  var gridHeight = 5;  // Set height of grid

  // Run function on button submit
  $scope.submit = function() {
    // Handle the input string from submited form
    if ($scope.movement) {
      var str = $scope.movement.toLowerCase();
      var res = str.split("");
      var resultString = "";

      for (var i = 0; i < res.length;  i++) {
        if(res[i] == 'v' || res[i] == 'l') {
          $scope.orient--;
          // Loop the variable string
          if($scope.orient == 0) {
            $scope.orient = 4;
          }
        }

        if (res[i] == 'h' || res[i] == 'r') {
          $scope.orient++;
          // Loop the variable string
          if ($scope.orient == 5) {
            $scope.orient = 1;
          };
        };

        if (res[i] == 'g' || res[i] == 'f') {
          resultString += $scope.orient;
        };
      }

      // Loop through the movement string
      for (var u = 0; u < resultString.length;  u++) {
        // if the robot moves north and is within grid boundries
        if(resultString[u] == '1' && $scope.coords[1]['val'] < gridWidth) {
          $scope.coords[1]['val']++;
        }
        // if the robot moves east and is within grid boundries
        if(resultString[u] == '2' && $scope.coords[0]['val'] < gridHeight) {
          $scope.coords[0]['val']++;
        }
        // if the robot moves south and is within grid boundries
        if(resultString[u] == '3' && $scope.coords[1]['val'] > 0) {
          $scope.coords[1]['val']--;
        }
        // if the robot moves west and is within grid boundries
        if(resultString[u] == '4' && $scope.coords[0]['val'] > 0) {
          $scope.coords[0]['val']--;
        }
      }
    }

    $scope.movement = "";
  }
});

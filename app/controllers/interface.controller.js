'use strict';

// Create controller
robotApp.controller('interfaceCtrl', function($scope) {
  // Create array of coordinates
  $scope.coords = [
    {"pos": "x", "val" : 0}, // Coordinates - X - Change this to set starting position in X-axis
    {"pos": "y", "val" : 0}  // Coordinates - Y - Change this to set starting position in Y-axis
  ];

  // Global variables
  $scope.orient = 1;   // Initial orientation
  var gridWidth = 5;   // Set width of grid
  var gridHeight = 5;  // Set height of grid

  // Run function on button submit
  $scope.submit = function() {
    // Handle the input string from submited form
    if ($scope.movement) {
      var str = $scope.movement.toLowerCase(); // Make the string lowercase
      var res = str.split("");                 // Explode string on every character
      var resultString = "";                   // Declare new string for movement

      // Loop through the entire input
      for (var i = 0; i < res.length;  i++) {
        // Handle turn-left commands
        if(res[i] == 'v' || res[i] == 'l') {
          $scope.orient--;  // decrease orientation
          // If the orientation goes from north to west
          if($scope.orient == 0) {
            $scope.orient = 4;
          }
        }

        // Handle turn-right commands
        if (res[i] == 'h' || res[i] == 'r') {
          $scope.orient++; // increase orientation
          // If the orientation goes from west to north
          if ($scope.orient == 5) {
            $scope.orient = 1;
          };
        };

        // On every move command add the orientation to the movement string
        if (res[i] == 'g' || res[i] == 'f') {
          resultString += $scope.orient;
        };
      }

      // Loop through the entire movement string
      for (var u = 0; u < resultString.length;  u++) {
        // if the robot moves north and is within grid boundries
        if(resultString[u] == '1' && $scope.coords[1]['val'] < gridWidth) {
          $scope.coords[1]['val']++;  // Increase the X Value
        }
        // if the robot moves east and is within grid boundries
        if(resultString[u] == '2' && $scope.coords[0]['val'] < gridHeight) {
          $scope.coords[0]['val']++;  // Increase the Y Value
        }
        // if the robot moves south and is within grid boundries
        if(resultString[u] == '3' && $scope.coords[1]['val'] > 0) {
          $scope.coords[1]['val']--;  // Decrease the Y Value
        }
        // if the robot moves west and is within grid boundries
        if(resultString[u] == '4' && $scope.coords[0]['val'] > 0) {
          $scope.coords[0]['val']--;  // Decrease the X Value
        }
      }
    }

    // Clear the input field after each command submit
    $scope.movement = "";
  }
});

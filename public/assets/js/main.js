var Admin = angular.module("Admin", ["ngRoute"]);

Admin.config(['$routeProvider', function($routeProvider){

  $routeProvider.when("/", {
    templateUrl: "/assets/templates/home.html",
    controller: "Home"
  });

  $routeProvider.when("/webcam/", {
    templateUrl: "/assets/templates/webcam.html",
    controller: "Webcam"
  });

}]);



//------------------------------------------------------------------------------

function Main ($scope) {
}

function Home ($scope) {
  console.log("Scope", $scope);
}

function Webcam ($scope, $timeout) {
  $scope.webcamSrc = "http://bitter.kicks-ass.org:9999/webcam/webcam.jpeg?timestamp=1432423"
  $scope.actionLabel = "Stop webcam";
  $scope.intId = false;

  $scope.toggleWebcam = function () {
    if ($scope.intId != false) {
      clearInterval($scope.intId);
      $scope.intId = false;
    } else {
      $scope.intId = setInterval(function () {
        $timeout(function () {
            $scope.webcamSrc = $scope.webcamSrc.split("timestamp=")[0] + Date.now();
        }, 0);
      }, 1000);
    }
    $scope.actionLabel = ($scope.intId == false) ? "Start webcam" : "Stop webcam"
  }

  $scope.toggleWebcam();

}

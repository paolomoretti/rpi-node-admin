
Admin = angular.module("Admin", ["ngRoute"])

Admin.config [
  "$routeProvider"
  ($routeProvider) ->
    $routeProvider.when "/",
      templateUrl: "/assets/templates/home.html"
      controller: "Home"

    $routeProvider.when "/webcam/",
      templateUrl: "/assets/templates/webcam.html"
      controller: "Webcam"

]

#------------------------------------------------------------------------------

Main = ($scope) ->

#------------------------------------------------------------------------------

Home = ($scope) ->
  console.log "Scope", $scope

#------------------------------------------------------------------------------

Webcam = ($scope, $http, $timeout) ->
  $scope.webcamSrc = "http://bitter.kicks-ass.org:9999/webcam/webcam.jpeg?timestamp=1432423"
  $scope.actionLabel = "Start webcam"
  $scope.started = false
  $scope.executing = false
  $scope.freq = 1

  $scope.toggleWebcam = ->
    $scope.executing = true

    if $scope.started is false
      # Start webcam script
      $http.get("/webcam/start").success (res)->
        $scope.started = res is "ok"
    else
      # Stop webcam script
      $http.get("/webcam/stop").success (res)->
        $scope.started = false

  $scope.$watch "started", (newVal)->
    $scope.actionLabel = if newVal is true then "Stop webcam" else "Start webcam"
    $scope.executing = false

    if newVal is true
      $scope.intId = setInterval(->
        $timeout (->
          $scope.webcamSrc = $scope.webcamSrc.split("timestamp=")[0] + Date.now()
        ), 0
      , $scope.freq * 1000)

    else
      clearInterval $scope.intId

#------------------------------------------------------------------------------

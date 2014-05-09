'use strict';

/**
 * Members functionalities for the controller layer
 */
sydneyWildlifeApp.controller('MemberController', function MemberController($scope, $window,
    $timeout, MemberService, NavService, NotifService, $routeParams, NAV_PATHS, USER_ROLES,
    ALERT_TYPES, LOG_TYPES, LOAD_TYPES, ngTableParams) {
  $scope.memberList = {};
  $scope.originalMember = {};
  $scope.member = {};
  $scope.editMode = false;
  $scope.memberNotFound = false;

  $scope.tableParams = new ngTableParams({
    // Default criteria that will be sent to the server
    page : 1,
    count : 10
  }, {
    counts : [],
    getData : function($defer, params) {
      $scope.listMembers($defer, params);
    }
  });

  /**
   * Saves the member by calling the back-end.
   * 
   * @param member
   *          The member object
   * @param form
   *          The form object attached to the "form" HTML tag
   */
  $scope.saveMember = function(member, form) {
    if (form.$valid) {
      NotifService.load(LOAD_TYPES.start);
      var aPromise = MemberService.save(member);
      aPromise.then(function(object) {
        NotifService.load(LOAD_TYPES.stop);
        member.id = object.id;
        NotifService.log(LOG_TYPES.info, "Successfully saved member #" + member.id + " ("
            + member.firstName + " " + member.lastName + ").");
        $scope.goBack();
      }, function errorCallback(error) {
        NotifService.load(LOAD_TYPES.stop);
        NotifService.log(LOG_TYPES.error, "Error saving member with Id " + member.id + ".");
        NotifService.alert(ALERT_TYPES.error, "Error saving member with Id " + member.id + ".");
      });
    } else {
      NotifService.alert(ALERT_TYPES.warning, "Please resolve the highlighted errors.");
    }
  };

  /**
   * List members.
   */
  $scope.listMembers = function($defer, params) {
    var filterParams = {
      page : params.$params.page - 1,
      size : params.$params.count
    };

    NotifService.load(LOAD_TYPES.start);
    MemberService.list(filterParams).then(function(object) {
      NotifService.load(LOAD_TYPES.stop);
      params.total(object._resultmeta.total);
      $defer.resolve(object);
    }, function(error) {
      NotifService.load(LOAD_TYPES.stop);
      NotifService.log(LOG_TYPES.error, "Error retrieving members.");
      NotifService.alert(ALERT_TYPES.error, "Error retrieving members.");
    });
  };

  /**
   * Retrieve one member. Takes the id from the route parameters.
   */
  $scope.memberDetail = function() {
    if ($routeParams != undefined && $routeParams.memberId != undefined) {
      NotifService.load(LOAD_TYPES.start);
      MemberService.memberDetail($routeParams.memberId).get().then(
          function(object) {
            NotifService.load(LOAD_TYPES.stop);
            $scope.member = object.originalData;
            // do a clone of the original object
            $scope.originalMember = JSON.parse(JSON.stringify(object.originalData));
          },
          function(error) {
            NotifService.load(LOAD_TYPES.stop);
            NotifService.log(LOG_TYPES.error, "Error retrieving member with Id "
                + $routeParams.memberId + ".");
            NotifService.alert(ALERT_TYPES.error, "Error retrieving member with Id "
                + $routeParams.memberId + ".");
            $scope.memberNotFound = true;
          });
    }
  };

  /**
   * Delete one member.
   * 
   * @param member
   *          The member object
   */
  $scope.deleteMember = function(member) {
    if (member != undefined && member.id != undefined) {
      // need to wrap this method in a timeout, otherwise a "$digest
      // already in progress" exception is raised, this is due to the
      // tooltip over the delete button
      // this is a known issue in angular:
      // https://github.com/angular/angular.js/issues/6364
      $timeout(function() {
        var deleteConfirmed = $window.confirm("Are you sure you want to permanently delete member "
            + member.firstName + " " + member.lastName + "?");
        if (deleteConfirmed) {
          NotifService.load(LOAD_TYPES.start);
          MemberService.deleteMember(member.id).then(
              function(object) {
                NotifService.load(LOAD_TYPES.stop);
                $scope.member = {};
                NotifService.log(LOG_TYPES.info, "Successfully deleted member with Id " + member.id
                    + ".");
                $scope.goBack();
              },
              function(error) {
                NotifService.load(LOAD_TYPES.stop);
                NotifService.log(LOG_TYPES.error, "Error deleting member with Id " + member.id
                    + ".");
                NotifService.alert(ALERT_TYPES.error, "Error deleting member with Id " + member.id
                    + ".");
                $scope.goBack();
              });
        }
      });
    }
  };

  /**
   * Goes back to the Members List page id admin role or to the home page
   * otherwise
   */
  $scope.goBack = function() {
    if ($scope.isAuthorized(USER_ROLES.admin)) {
      NavService.goTo(NAV_PATHS.memberList);
    } else {
      NavService.goTo(NAV_PATHS.home);
    }
  };

  /**
   * Goes back.
   */
  $scope.cancel = function() {
    $scope.goBack();
  };

  /**
   * Returns true if the member object is a new one, i.e. it hasn't been saved
   * to the DB yet.
   */
  $scope.isNew = function() {
    return !$scope.isLoading() && ($scope.member == undefined || $scope.member.id == undefined);
  };

  /**
   * Returns a string value representing a form mode: "create", "read" or
   * "update". If any error occurred, the result will be "error".
   */
  $scope.getMode = function() {
    if ($scope.memberNotFound) {
      return "error";
    }

    if ($scope.isNew()) {
      return "create";
    } else {
      if ($scope.editMode) {
        return "update";
      } else {
        return "read";
      }
    }
  };

  /**
   * Starts the "update" mode.
   */
  $scope.startEdit = function() {
    $scope.editMode = true;
  };

  /**
   * Stops the "update" mode without saving changes.
   */
  $scope.cancelEdit = function() {
    $scope.editMode = false;
  };
});
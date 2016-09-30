var app = angular.module('runApp',['ui.router','runApp.controller','runApp.directive','runApp.service']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){



	$urlRouterProvider.when('','/mainPage/myRun');

	$urlRouterProvider.when('/','/mainPage/myRun');



	$urlRouterProvider.otherwise('/mainPage/myRun');





	$stateProvider.state('mainPage',{

		url:'/mainPage',

		templateUrl:'resource/sunrun/partials/mainPage.html',

		controller:'mainPageCtrl'

	})

	.state('mainPage.myRun',{

		url:'/myRun',

		templateUrl:'resource/sunrun/partials/myrun.html',

		controller:'myRunCtrl'

	})

	.state('mainPage.runTab',{

		url:'/runTab/:id',

		templateUrl:'resource/sunrun/partials/runTab.html',

		controller:'runTabCtrl'

	})

	.state('mainPage.countRange',{

		url:'/countRange/:type',

		templateUrl:'resource/sunrun/partials/cRange.html',

		controller:'cRangeCtrl'

	})

/*	.state('mainPage.mRange',{

		url:'/mRange',

		templateUrl:'resource/sunrun/partials/cRange.html',

		controller:'mRangeCtrl'

	})*/



}])

.run(function($state){

	$state.go('mainPage.myRun')

})
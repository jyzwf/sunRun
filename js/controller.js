angular.module('runApp.controller',[])

.controller('mainPageCtrl',function($scope,$location,$http){

	$scope.showHideFn = function(ev){

		var ev = ev || window.event;

		$scope.showHide = false;

		ev.stopPropagation();

	}


	$scope.changeDetail = false;

	$scope.changeRange = true;



	$scope.$on('shide',function(e,newVal){

		$scope.changeDetail = newVal[0];

		$scope.changeRange = newVal[1];

	})

	

})

.controller('myRunCtrl',function($scope,$location,$http,runServer){
	//获取他的长跑记录的请求
runServer.changeState1.call($scope)	
$scope.items = runServer.run.myRun

if(runServer.run.myRun){
	return false
}
	$http({

        	method:'post',

        	url:"http://wx.hduhelp.com/app/index.php?i=2&c=entry&" + runServer.openid + "&do=MyDetail&m=newsunrun&wxref=mp.weixin.qq.com#wechat_redirect", 

        	headers:{'Content-Type':'application/x-www-form-urlencoded'}

        }).then(function(data,status){
        	var newData = data.data;
        	
        	for(var i=0,k;k = newData[i++];){
        		k[5].indexOf('ok') !='-1' ? k[5] = true : k[5] = false
        	}
        	console.log(newData)
        	$scope.items = newData
        	runServer.run.myRun = newData;

        },function(err){

        	console.log(err)

        })


})

.controller('runTabCtrl',function($scope,$http,$stateParams,$q,runServer,detailDataDeal){


runServer.changeState2.call($scope)
	
    var def = $q.defer();

    $scope.d = def.promise;
function cacheData() {
    var realData = detailDataDeal.chooseData(detailDataDeal.upData,$stateParams.id);
    def.resolve(realData)
}

if(detailDataDeal.upData){
    cacheData();
    return false;
}
	$http({

        	method:'post',

        	url:"http://wx.hduhelp.com/app/index.php?i=2&c=entry&" + runServer.openid + "&do=chart&m=newsunrun&wxref=mp.weixin.qq.com&wxref=mp.weixin.qq.com#wechat_redirect", 

        	headers:{'Content-Type':'application/x-www-form-urlencoded'}

        }).success(function(data, status) {
            console.log('弦冰')
            var getData = new detailDataDeal.DealDetail();
            getData.getBlackData();
        	angular.forEach(data.table, function(value, key){
                
                var a = data.table[key]['1'];
                data.table[key]['1'] = a.slice(0,a.length-1).split('月').join('')
                
                getData.initOriginData(data.table[key])


            });

            getData.addBlank();

            getData.selectData();
            getData.dataAll.push([data.myinfo['speed_standar']],[data.myinfo['distance_standar']]);
            detailDataDeal.upData = getData.dataAll;

            /*var realData = detailDataDeal.chooseData(detailDataDeal.upData,$stateParams.id);
            def.resolve(realData)*/

            cacheData(getData.chooseData)


    }).error(function() {

    	console.log('查询失败')

    });

	
	

})

.controller('cRangeCtrl',function($scope,$http,$stateParams,runServer){

//次数排名所需要的数据

runServer.changeState1.call($scope)

var type = {
	cRange : function(){
		$scope.cList = runServer.run.range.data.number_rank;
    	$scope.cFirst = angular.copy(runServer.run.range.data.number_rank[1])
	},
	mRange:function(){
		$scope.cList = runServer.run.range.data.distance_rank;
    	$scope.cFirst = angular.copy(runServer.run.range.data.distance_rank[1])
	}
}


$scope.default = 'default';



if(runServer.run.range.data){
	$scope.cMe = runServer.run.range.data.my_rank;

    (type[$stateParams.type])();

	return false

}

	$http({

        	method:'post',

        	url:"http://wx.hduhelp.com/app/index.php?i=2&c=entry&" + runServer.openid + "&do=sort&m=newsunrun&wxref=mp.weixin.qq.com#wechat_redirect", 

        	headers:{'Content-Type':'application/x-www-form-urlencoded'}

        }).then(function(data,status){
        	console.log(data)

        	console.log(data)
        	runServer.run.range.data = data.data;

        	$scope.cMe = data.data.my_rank;

        	(type[$stateParams.type])();

        },function(err){

        	console.log(err)

        })


})





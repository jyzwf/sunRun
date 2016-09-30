var showRunTab = function($q){

	
   var getOption = function(dataAll){


return {option : {

    title: {

        x: 'center',

        y:'1%',

        text: '我的长跑'

    },

    tooltip : {

        trigger: 'axis'

    },

    legend: {

        orient:'horizontal',

        top:'7%',

        // data:['上午速度','下午速度','上午里程','下午里程']
        data:['上午','下午']

    },

    grid: [

        {x: '7%', y: '16%', width: '80%', height: '30%',left:'15%'},

        {x2: '5%', y: '58%', width: '80%', height: '37%',left:'15%'}

    ],

    xAxis : [

        {   

            gridIndex: 0,

            type : 'category',

            boundaryGap : false,

            data : dataAll[0]
        },{ 

            gridIndex: 1,

            type : 'category',

            boundaryGap : false,

            data : dataAll[0]

        }

    ],

    yAxis : [

        {gridIndex: 0, type: 'value',boundaryGap: false,name:'速度(m/s)',nameLocation:'end',nameGap: 10},

        {gridIndex: 1, type: 'value',boundaryGap: false,name:'里程(m)',nameLocation:'end',nameGap: 10}

    ],

    series : [

        {

            name:'上午',

            type:'line',

            xAxisIndex: [0],

            yAxisIndex: [0],
            
            areaStyle: {normal: {shadowColor: 'rgba(0, 0, 0, 0.5)',shadowBlur: 100,color:'#6699FF'}},

            data:dataAll[1],

            smooth: true

        },

        {

            name:'下午',

            type:'line',

            smooth: true,

            xAxisIndex: [0],

            yAxisIndex: [0],

            areaStyle: {normal: {color:'#66CC99'}},

            data: dataAll[2],

            lineStyle: {

                emphasis: {

                    shadowColor:'yellow'

                }

            }

        },

        {

            name:'最低速度',

            type:'line',

            smooth: true,

            xAxisIndex: [0],

            yAxisIndex: [0],

            data: dataAll[5],

            markLine:{
                data:[
                        {type:'average'}
                    ],
                label:{
                    normal:{
                        show:false
                    }
                }
            }

        },

        {

            name:'上午',

            type:'line',

            xAxisIndex: [1],

            yAxisIndex: [1],

            areaStyle: {normal: {shadowColor: 'rgba(0, 0, 0, 0.5)',shadowBlur: 100,color:'#6699FF'}},

            data: dataAll[3],

            smooth: true

        },

        {

            name:'下午',

            type:'line',

            smooth: true,

            xAxisIndex: [1],

            yAxisIndex: [1],

            data: dataAll[4],

            areaStyle: {normal: {color:'#66CC99'}}

        },

        {

            name:'最低里程',

            type:'line',

            smooth: true,

            xAxisIndex: [1],

            yAxisIndex: [1],

            data: dataAll[6],

            markLine:{
                data:[
                        {type:'average'}
                    ],
                label:{
                    normal:{
                        show:false
                    }
                }
            }

        }

    ],
    color:['#6699FF','#66CC99','red']

}
}
};

	return {
		restrict:'A',
		template:'<div></div>',
		replace:true,
        controller:"runTabCtrl",
		link:function(scope,ele,attrs){

            ele.css({
                width:document.body.clientWidth,
                height:document.body.clientHeight,
                'padding-top':45
            })
            var myChart = echarts.init(ele[0]);
            myChart.showLoading({

              color: '#03A9F4'
        
            });

            scope.d.then(function(dataAll){
                    var options = getOption(dataAll);
                    myChart.setOption(options.option);
                    myChart.hideLoading();
                
            })

            /*var deferred = $q.defer();

            var dataAll = scope.dataAll;
            console.log(dataAll)

            if(dataAll){
                console.log(111)
                deferred.resolve(dataAll)
            }
*/
            /*deferred.promise.then(function(){
                var options = getOption(dataAll);
                myChart.setOption(options.option);
                myChart.hideLoading();
            })
            */
            
            

			

/*            myChart.setOption(options);

            var options = getOption(dataAll);*/

    		/*myChart.setOption(options.option);
    		myChart.hideLoading();*/
		}
	}
};





angular.module('runApp.directive',[])
.directive('runTab',showRunTab);



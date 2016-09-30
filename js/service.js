angular.module('runApp.service',[])

.service('runServer',function(){

	var href = window.location.href;

    openidReg=/openid=[^\&]+/g;

    this.openid=href.match(openidReg);

    this.run = {
    	range : {
    	},
    	tab:{
    		
    	}
    }

	this.changeState2 = function(){
		this.changeDetail = true;

		this.changeRange = false;

		this.$emit('shide',[this.changeDetail,this.changeRange]);

	}

	this.changeState1 = function(){
		console.log(1)
		this.changeDetail = false;

		this.changeRange = true;

		this.$emit('shide',[this.changeDetail,this.changeRange]);

	}

})
.factory('detailDataDeal',function(){
	var upData = null,a=null;

	var oNO = 86400000;

	var DealDetail = function(){
		this.GetTab = {};
  		this.data = [];
  		this.dataAll = [[],[],[],[],[]];
  		this.chooseDetail = [];
  		this.ms = new Date().getTime();
  		this.preDate = null;
  		this.str = null;
  		this.reverData = null;
  		this.day = 38;
	};

	DealDetail.prototype.initOriginData = function(obj){
		this.GetTab[obj[1]] = {};
		this.GetTab[obj[1]][obj[2] ]= {};
		if(obj[2] == '上午'){
			this.GetTab[obj[1]]['下午'] = {};
			this.GetTab[obj[1]]['下午'].speed = 0;
			this.GetTab[obj[1]]['下午'].dis = 0;
		}else{
			this.GetTab[obj[1]]['上午'] = {};
			this.GetTab[obj[1]]['上午'].speed = 0;
			this.GetTab[obj[1]]['上午'].dis = 0;
		}
		this.GetTab[obj[1]][obj[2]].speed = obj[4];
		this.GetTab[obj[1]][obj[2]].dis = obj[3];

	};

	DealDetail.prototype.getBlackData = function(){
		for(var i=1;;i++){
		   var preDate = ( this.ms - oNO * i);
		   var preDay = new Date(preDate);
		   this.str = '' + (preDay.getMonth() +1) +preDay.getDate();
		   this.data.push(this.str)
		   if(this.str == this.day){
		     break
		   }
		 }
  		return this.data;
	};

	DealDetail.prototype.addBlank = function(){
		for(var i=0,k=this.data.length;i<k;i++){
			if(!this.GetTab[this.data[i]]){
				this.GetTab[this.data[i]] = {
					'上午':{
						speed : 0,
						dis : 0
					},
					'下午':{
						speed : 0,
						dis: 0
					}
				};
			}
		}
	};

	DealDetail.prototype.changeDay = function(str){
		var strTest = (str).split('');
		var shift = strTest.shift()
		str = shift + '-' + strTest.join('');
		return str;
	};

	DealDetail.prototype.selectData = function(){
		var a = this.dataAll;
		var that  = this;
		angular.forEach(this.GetTab, function(value, key){
			key = that.changeDay(key);
			a[0].push(key);
			a[1].push(value['上午'].speed)
			a[2].push(value['下午'].speed)
			a[3].push(value['上午'].dis)
			a[4].push(value['下午'].dis)
		});
	}

/*	DealDetail.prototype.chooseData = function(num){
		
		var len = this.dataAll[0].length;

		num<3?num*=7:num = this.dataAll[0].length;


		this.chooseDetail = angular.copy(this.dataAll);
		
		for(var i=0,l =this.chooseDetail.length-2;i<l;i++){

			this.chooseDetail[i] = this.chooseDetail[i].slice(len-num,len)
		}

		return this.chooseDetail;
	}*/

	var chooseData = function(obj,num){
		var len = obj[0].length;

		num<3?num*=7:num = len;


		a = angular.copy(obj);
		
		for(var i=0,l =a.length-2;i<l;i++){

			a[i] = a[i].slice(len-num,len)
		}

		return a;
	}



	return {
		DealDetail : DealDetail,
		upData : upData,
		chooseData : chooseData
	}
})
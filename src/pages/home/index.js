import { Component,AfterMessage, BeforeMessage, ViewWillDisappear, ViewWillAppear, Message, Boot, Hero } from 'hero-js';
import { Entry } from 'hero-cli/decorator';
import ui from './view';
import {getListData,getData} from '../../utils/ethereum';
import { PATH as path } from '../../constant/index';
import {getInitData} from '../../utils/index';

@Entry({
  filename: 'pages/home.html'
})
@Component({
	view: ui
})
export class DecoratePage {
    @ViewWillAppear
    enter(){
		if (!localStorage.phone || !localStorage.nickname || !localStorage.gps) {
			Hero.out({command:'present:'+path+'/pages/start.html'});
		};
		window.currentAddress = Hero.address;
    }
    @Boot
    boot(){
    	Hero.address = getInitData().pageName || '0xb872Bb2f73a2dd24154Cca756774d2b5D9278418';
		var list = [
	    	{
	    		sectionTitle:'我的活动',
	    		rows:[
					{
		    			title:'增加 ...', //master name
		    			addFood:true,
		    			height:60
		    		}
	    		]
	    	},	    	{
	    		sectionTitle:'我的伙伴',
	    		rows:[

					{
		    			title:'加入 ...', //master name
		    			addMaster:true,
						height:60
		    		}
	    		]
	    	},
			{
	    		sectionTitle:'附近的活动',
	    		rows:[
					{
		    			title:'无', //master name
		    			height:60
		    		}

	    		]
	    	},
			{
	    		sectionTitle:'关于',
	    		rows:[
					{
		    			title:'Master Hub', //master name
		    			aboutUs:true,
		    			height:60
		    		}
	    		]
	    	}
	    ]
		getListData(Hero.address,function(err,datas){
			if (!err) {
				var foods = list[0].rows;
				var masters = list[1].rows;
				var nears = list[2].rows;
				var history = [];
				var expired = [];

				for (var i = 0; i < datas.length; i++) {
					var data = datas[i];
					if (data.from.toLowerCase() === Hero.address.toLowerCase() && data.title && data.icon && data.time && data.phone && data.gps) {
						data.image = data.icon;
						var content = data.detail;
						data.detail = data.desc;
						data.content = content
						data.height = 88;
						data.history = [];
						foods.splice(0,0,data);
					}else if(data.to.toLowerCase() === Hero.address.toLowerCase() && data.nickname && data.phone && data.desc && data.icon){
						data.image = data.icon;
						data.detail = data.desc;
						data.title = data.nickname;
						data.height = 88;
						masters.splice(0,0,data)
					}else if(data.nickname && data.title && data.time && data.value){
						history.push(data);
					}else if(data.expired){
						expired.push(data);
					}
				};
				for (var i = 0; i < history.length; i++) {
					var t = history[i];
					for (var j = 0; j < foods.length; j++) {
						if(foods[j].title === t.title){
							foods[j].history.push(t);
						}
					};
				};
				for (var i = 0; i < expired.length; i++) {
					var d = expired[i];
					for (var j = 0; j < foods.length; j++) {
						var food = foods[i];
						if (food.title === d.title) {
	      					foods.splice(j,1);
						};
					};
					for (var k = 0; k < masters.length; k++) {
						var master = masters[i];
						if (master.nickname === d.title) {
	      					masters.splice(k,1);
						};
					};
				};
				foods.sort(function(o,p){
					return o.value > p.value;
				});
				masters.sort(function(o,p){
					return o.value > p.value;
				});
			};
			Hero.out({datas:[{name:'foodmaster',data:list}]});
		});
    }
    @Message(function(data){ return data.nickname && data.icon && data.desc;})
    selectMaster(data) {
    	localStorage.boot = JSON.stringify(data);
    	Hero.out({command:'goto:'+path+'/pages/home.html?pageName='+data.from});
    }
    @Message(function(data){ return data.title && data.icon && data.time && data.phone && data.gps;})
    selectFood(data) {
    	localStorage.boot = JSON.stringify(data);
    	Hero.out({command:'goto:'+path+'/pages/food.html'});
    }
    @Message(function(data){ return data.addMaster})
    addMaster(data) {
		Hero.out({command:'present:'+path+'/pages/new-master.html'});
    }
    @Message(function(data){ return data.addFood})
    addFood(data) {
		Hero.out({command:'present:'+path+'/pages/new-food.html'});
    }
    @Message(function(data){ return data.aboutUs})
    about(data) {
		Hero.out({command:'goto:'+path+'/pages/about.html'});
    }
}

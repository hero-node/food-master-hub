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
    }
    @Boot
    boot(){
    	if (!window.web3) {
			window.web3 = new window.Web3();
    	};
    	Hero.out({command:'showLoading'});
    	var address = getInitData().address || '0xB7E9D52459a89e346C5777970cf66A190937c325';
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

	    		]
	    	},
			{
	    		sectionTitle:'关于',
	    		rows:[
					{
		    			title:'Master Hub', //master name
		    			aboutUs:true
		    		}
	    		]
	    	},
	    ]
		getListData(address,function(err,datas){
			if (!err) {
				for (var i = 0; i < datas.length; i++) {
					var data = datas[i];
					if (data.food) {
						data.title = data.food;
						data.detailText = data.desc;

						data.height = 60;
						list[0].rows.splice(0,0,data)
					};
				};
     			Hero.out({datas:[{name:'foodmaster',data:list}]})
			};
		});
    }
    @Message(function(data){ return data.title && data.icon && data.address;})
    selectMaster(data) {
    	localStorage.boot = JSON.stringify(data);
    	Hero.out({command:'goto:'+path+'/pages/home.html?pageName=hero-'+data.address});
    }
    @Message(function(data){ return data.title && data.food;})
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

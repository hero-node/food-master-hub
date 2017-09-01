import { Component,AfterMessage, BeforeMessage, ViewWillDisappear, ViewWillAppear, Message, Boot, Hero } from 'hero-js';
import { Entry } from 'hero-cli/decorator';
import ui from './view';
import {PATH as path} from '../../constant/index';
import {getHash} from '../../utils/ethereum';
import {getInitData} from '../../utils/index';

@Entry({
  filename: 'pages/food.html'
})
@Component({
	view: ui
})
export class DecoratePage {

    @Boot
    boot(){
    	Hero.initData = getInitData()||{};
    }
    @ViewWillAppear
    enter(){
    	var header = {
			class:'UIView',
            frame:{w:'1x',h:'200'},
            subViews:[
            	{
            		class:'HeroImageView',
		            backgroundColor:'eeeeee',
            		frame:{w:'1x',h:'200'},
		            image:Hero.initData.icon||'',
            	},
            	{
            		class:'UIView',
		            backgroundColor:'00000008',
            		frame:{w:'1x',y:'160',h:'40'},
            	},
            	{
            		class:'HeroLabel',
		            textColor:'cccccc',
		            size:12,
            		frame:{x:'10',r:'10',y:'160',h:'40'},
		            text:Hero.initData.desc||'-',
            	}
            ]
		}
    	var footer = {
			class:'UIView',
            frame:{w:'1x',h:'170'},
            subViews:[
            	{
		            class: 'DRButton',
		            DRStyle: 'B1',
		            enable: true,
		            frame: { x: '15', y: '20', r: '15', h: '44' },
		            title: '参加',
		            click: [{datas:[{name:'payView',hidden:false}]},{click:'hash'}]
            	},
            	{
		            class: 'DRButton',
		            DRStyle: 'B8',
		            enable: true,
		            frame: { x: '15', y: '120', w: '100', h: '30' },
		            title: '联系 Master',
		            click: {command:'goto:tel://'+(Hero.initData.phone||'')}
            	}
            ]
		}
    	var list = [
	        {
	        	sectionTitle:'基础信息',
	            rows:[
					{title:'交换门槛 (eth)',textValue:(Hero.initData.price||'')},
					{title:'活动时间',textValue:(Hero.initData.time||'')},
					{title:'参与记录',textValue:(Hero.initData.history.length||'0'),history:Hero.initData.history},
	            ]
	        },
	        {
	        	sectionTitle:'活动位置',
	            rows:[
	            	{
	            		class:'HeroImageView',
			            backgroundColor:'eeeeee',
	            		frame:{w:'1x',h:'200'},
	            		alpha:0.6,
			            image:'http://api.map.baidu.com/staticimage/v2?ak=CDXGnhAZhdGnE7Bi1RTn3tAMa5KGv4lp&mcode=666666&center='+Hero.initData.gps+'&width=320&height=200&zoom=14',
	            	}
	            ]
	        },
	        {
	        	sectionTitle:'详细信息',
	            rows:[
			        {
			            class:'UIView',
			            frame:{w:'1x',h:'200'},
			            backgroundColor:'ffffff',
			            clip:true,
			            subViews:[
			                {
			                    class:'HeroTextView',
			                    frame:{x:'15',r:'15',y:'10',h:'205'},
			                    name:'detail',
			                    backgroundColor:'ffffff',
			                    textColor:'666666',
			                    size:18,
			                    enable:false,
			                    text:(Hero.initData.detail||'')
			                }
			            ]
			        }
	            ]
	        },
        ]
    	Hero.out({datas:[
    		{name:'table','header':header,'footer':footer,data:list},
    	]})
    }

    @Message(function(data){ return data.click && data.click === "hash";})
    genHash(data) {
      getHash({
      	title:Hero.initData.title,
      	nickname:localStorage.nickname,
      	time:Date()
	  },function(err,hash){
        if (!err) {
          window.transData = window.web3.utils.toHex('hero-'+hash);
          Hero.out({datas:[
            {name:'hash',text:window.transData},
            {name:'hash1',text:window.transData},
          ]});
        };
      })
    }

    @Message(function(data){ return data.click && data.click === "pay";})
    pay(data) {
	  if (localStorage.balance === '0') {
        Hero.out({datas:[{name:'toast',text:'找一个懂区块链的朋友帮你吧'}]});
        return;
	  };
      try{
        var account = window.web3.eth.accounts.decrypt(localStorage.keystore,window.ui2Data.password);
        var tx = {
          to:'0x397d36412317dFEC91Ef856BAE500A2c39582fB8',
          data:window.transData,
          value:window.web3.utils.toWei(window.ui2Data.value),
          gas:'2000000',
        }
        window.web3.eth.accounts.signTransaction(tx,account.privateKey,function(err,d){
          if (err) {
            Hero.out({datas:[{name:'toast',text:err.message}]});
          }else{
            Hero.out({datas:[{name:'toast',text:'交易已经成功提交，请等待交易被确认'},{name:'payView',hidden:true}]});
            setTimeout(function(){
              Hero.out({command:'back'});
            },2000);
          }
        })
      }catch(e){
        Hero.out({datas:[{name:'toast',text:e.message}]});
      }
    }


    @Message(function(data){ return data.click && data.click === "newAcount";})
    newAcount(data) {
      if (window.ui2Data.password) {
        Hero.out({command:'showLoading'});
        var account = window.web3.eth.accounts.create(window.ui2Data.password);
        localStorage.address = account.address;
        localStorage.keystore = JSON.stringify(window.web3.eth.accounts.encrypt(account.privateKey,window.ui2Data.password));
        var bigN = window.web3.eth.getBalance(account.address);
        setTimeout(function(){
          Hero.out({datas:[
            {name:'address',text:account.address},
            {name:'balance',text:bigN.value()},
            {name:'newAcount',hidden:true},
            {name:'acount',hidden:false},
          ]});
          Hero.out({command:'stopLoading'});
        },1000)
      }else{
        Hero.out({datas:[{name:'toast',text:'请输入密码'}]});
      }
    }


    @Message(function(data){ return data.history && data.history.length > 0;})
    selectHistory(data) {
    	localStorage.boot = JSON.stringify(data.history);
    	Hero.out({command:'goto:'+path+'/pages/history.html'});
    }

}

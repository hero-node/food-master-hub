import { Component,AfterMessage, BeforeMessage, ViewWillDisappear, ViewWillAppear, Message, Boot, Hero } from 'hero-js';
import { Entry } from 'hero-cli/decorator';
import ui from './view';
import {PATH as path} from '../../constant/index';
import {getHash} from '../../utils/ethereum';
import {getInitData} from '../../utils/index';

@Entry({
  filename: 'pages/history.html'
})
@Component({
	view: ui
})
export class DecoratePage {
    @ViewWillAppear
    enter(){
    	var historyArr = getInitData();
    	var rows = [];
    	for (var i = 0; i < historyArr.length; i++) {
    		var his = historyArr[i];
    		rows.push(
    			{
    				class:'UIView',
    				frame:{w:'1x',h:'44'},
    				subViews:[
    					{
    						class:'HeroLabel',
    						frame:{x:'10',w:'0.3x',h:'1x'},
    						text:his.nickname,
    					},
    					{
    						class:'HeroLabel',
    						frame:{x:'0.35x',w:'0.3x',h:'1x'},
    						text:window.web3.utils.fromWei(his.value),
    					},
    					{
    						class:'HeroLabel',
    						frame:{r:'10',w:'0.45x',h:'1x'},
    						text:(new Date(his.time)).toLocaleString(),
    					}
    				]
    			});
    	};
    	var list = [
	        {
	        	sectionTitle:'参与记录',
	            rows:rows
	        }
        ]
    	Hero.out({datas:[
    		{name:'table',data:list},
    	]})
    }
}

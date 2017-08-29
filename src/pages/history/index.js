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
    		rows.push({class:'dr-cell143',text1:his.nickname,text2:window.web3.utils.fromWei(his.value),text3:(new Date(his.time)).toLocaleString()});
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

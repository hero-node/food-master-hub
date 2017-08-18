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

    }
    @ViewWillAppear
    enter(){
    	var data = getInitData();
    	Hero.out({datas:[
    		{name:'image',image:data.icon},
    		{name:'price',text:data.price},
    		{name:'detail',text:data.detail},

    	]})
    }


    @Message(function(data){ return data.title && data.icon && data.address;})
    cellSelect(data) {
    	localStorage.boot = JSON.stringify(data);
    	Hero.out({command:'goto:'+path+'/pages/food/index.html'});
    }

}

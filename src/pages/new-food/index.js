import { Component,AfterMessage, BeforeMessage, ViewWillDisappear, ViewWillAppear, Message, Boot, Hero } from 'hero-js';
import { Entry } from 'hero-cli/decorator';
import ui from './view';
import {PATH as path} from '../../constant/index';
import {getHash} from '../../utils/ethereum';

var ui2Data = Hero.getState();

@Entry({
  filename: 'pages/new-food.html'
})
@Component({
  view: ui
})
export class DecoratePage {

    @Boot
    boot(){

    }
    @BeforeMessage
    before(data){
      if (ui2Data.foodName && ui2Data.price && ui2Data.time && ui2Data.desc && ui2Data.detail && ui2Data.icon ) {
          Hero.out({datas:{name:'hashBtn',enable:true}});
      }else{
          Hero.out({datas:{name:'hashBtn',enable:false}});
      }

    }

    @Message(function(data){ return data.click && data.click === "hash";})
    genHash(data) {
      getHash(data,function(err,hash){
        if (!err) {
          Hero.out({datas:{name:'hash',text:window.web3.toHex(hash)}});
        };
      })
    }

    @AfterMessage
    after(data){
      console.log('After Handling Message from NativeApp...', data);
    }
}

import { Component,AfterMessage, BeforeMessage, ViewWillDisappear, ViewWillAppear, Message, Boot, Hero } from 'hero-js';
import { Entry } from 'hero-cli/decorator';
import ui from './view';
import {PATH as path} from '../../constant/index';
import {getHash} from '../../utils/ethereum';

var ui2Data = Hero.getState();

@Entry({
  filename: 'pages/new-master.html'
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
      console.log('Enter this page...');
    }
    @ViewWillDisappear
    leave(){
      console.log('I\'m going to leave this page...');
    }
    @BeforeMessage
    before(data){
      if (ui2Data.phone && ui2Data.nickname && ui2Data.desc && ui2Data.icon && ui2Data.phone.length > 0 && ui2Data.nickname.length > 0 && ui2Data.desc.length > 0 && ui2Data.icon.length>0 ) {
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

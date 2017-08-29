import { Component,AfterMessage, BeforeMessage, ViewWillDisappear, ViewWillAppear, Message, Boot, Hero } from 'hero-js';
import { Entry } from 'hero-cli/decorator';
import ui from './view';
import {PATH as path} from '../../constant/index';

var ui2Data = Hero.getState();

@Entry({
  filename: 'pages/start.html'
})
// This is cause HTML login.html will generated in `pages` folder,
// So we can access /pages/start.html

// The default action is keep the same path structure as the current JavaScript like below:
// @Entry({
//    filename: 'entry/start/index.html'
// })
// This is use [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) generate HTML.
// Valid options in @Entry as same as html-webpack-plugin.
@Component({
  view: ui
})
export class DecoratePage {

    @BeforeMessage
    before(data){
      if (ui2Data.gps&&ui2Data.phone && ui2Data.nickname && ui2Data.phone.length > 0 && ui2Data.nickname.length > 0 && ui2Data.gps.length>0) {
          Hero.out({datas:{name:'loginBtn',enable:true}});
      }else{
          Hero.out({datas:{name:'loginBtn',enable:false}});
      }
    }

    @Message(function(data){ return data.click && data.click === "login";})
    login(data) {
      localStorage.phone = ui2Data.phone;
      localStorage.nickname = ui2Data.nickname;
      localStorage.gps = ui2Data.gps;
      Hero.out({command:'goto:'+path+'/pages/home.html'});
    }

    @Message(function(data){ return data.click && data.click === "gps";})
    getGps(data) {
      navigator.geolocation.getCurrentPosition(function(position){
        Hero.out({datas:[{name:'gps',text:position.coords.longitude+','+position.coords.latitude}]})
      });
    }
}

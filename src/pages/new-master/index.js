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
    getHash(data) {
      getHash({
      phone:ui2Data.phone,
      nickname:ui2Data.nickname,
      desc:ui2Data.desc,
      icon:ui2Data.icon
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
      try{
        var account = window.web3.eth.accounts.decrypt(localStorage.keystore,ui2Data.password);
        var tx = {
          to:'0xB7E9D52459a89e346C5777970cf66A190937c325',
          data:window.transData,
          value:window.web3.utils.toWei(ui2Data.value),
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
      if (ui2Data.password) {
        Hero.out({command:'showLoading'});
        var account = window.web3.eth.accounts.create(ui2Data.password);
        localStorage.address = account.address;
        localStorage.keystore = JSON.stringify(window.web3.eth.accounts.encrypt(account.privateKey,ui2Data.password));
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


    @AfterMessage
    after(data){
      console.log('After Handling Message from NativeApp...', data);
    }
}

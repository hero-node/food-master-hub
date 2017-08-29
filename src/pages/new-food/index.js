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
      if (ui2Data.title && ui2Data.price && ui2Data.time && ui2Data.desc && ui2Data.detail && ui2Data.icon ) {
          Hero.out({datas:{name:'hashBtn',enable:true}});
      }else{
          Hero.out({datas:{name:'hashBtn',enable:false}});
      }

    }

    @Message(function(data){ return data.click && data.click === "hash";})
    genHash(data) {
      getHash({
      icon:ui2Data.icon,
      title:ui2Data.title,
      price:ui2Data.price,
      time:ui2Data.time,
      desc:ui2Data.desc,
      detail:ui2Data.detail,
      gps:ui2Data.gps,
      phone:ui2Data.phone
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
          to:'0x397d36412317dFEC91Ef856BAE500A2c39582fB8',
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
var a = {
  title:'MasterD Hub咖啡',
  price:0.05,
  time:'工作日',
  desc:'随便聊聊互联网，金融科技，区块链，ICO',
  详细介绍:'1、一杯咖啡+小点心，品尝台湾精品咖啡\n2、时间任意\n3、方向互联网，金融科技，区块链与ICO',
  image:'http://p1.meituan.net/xianfu/86d414d68f05bd26536da6f18013b45728672.jpg'
}
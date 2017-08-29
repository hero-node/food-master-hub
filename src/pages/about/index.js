import { Component,AfterMessage, BeforeMessage, ViewWillDisappear, ViewWillAppear, Message, Boot, Hero } from 'hero-js';
import { Entry } from 'hero-cli/decorator';
import ui from './view';
import {PATH as path} from '../../constant/index';

var ui2Data = Hero.getState();

@Entry({
  filename: 'pages/about.html'
})
@Component({
  view: ui
})
export class DecoratePage {

    @Boot
    boot(){
      var qas = [
        {q:'Master Hub是一个什么应用？',a:'Master Hub想打造一个以 Master 为中心的线下社交平台，本app使用简单易学的跨平台开发框架Hero所开发，是一个基于区块链的无服务端应用。'},
        {q:'什么叫无服务端应用？',a:'本应用的所有代码存储在一个基于IPFS技术的网络系统上，IPFS是一种分布式文件系统，一旦文件上传到这个系统，没有人能删除或修改文件'},
        {q:'那你们的业务逻辑如何运行？',a:'每一个业务逻辑都是一个基于以太坊的智能合约'},
        {q:'在app里面进行交易安全吗？',a:'数字货币的安全取决于密钥的安全，最安全的办法是使用冷钱包签名，你可以使用你信任的钱包工具来签名。'},
        {q:'我没有数字钱包怎么办？',a:'交换页面选择“我没有钱包”，我们将为你生成一个数字钱包，虽然我们的代码部署在IPFS上，完全无法修改，并且完全开源，但是我们依然要提醒您，请勿使用此钱包做大额交易'},
        {q:'你们的开源地址是？',a:'https://github.com/hero-mobile'},
      ]
      var style = "font-family:-apple-system-font,'PingFang SC','Source Han Sans CN','Noto Sans SC','Arial Nova','Hiragino Sans GB','Segoe UI','Microsoft YaHei',sans-serif;padding-left:20px;padding-right:20px";
      var body = '<div style="'+style+'">';
        for (var i = 0; i < qas.length; i++) {
          var qa = qas[i];
          body += '<p style="font-size:16px;color:#151515;line-height:19px">'+qa.q+'</p>';
          body += '<p style="font-size:14px;color:#999;line-height:18px;">'+qa.a+'</p>';
        };
      body += '</div>'
      Hero.out({datas:[{name:'about',innerHtml:body}]});
    }
}

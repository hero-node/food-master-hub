import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';
import {getNode} from '../../utils/heroNodes';


export default {
	version: 0,
	backgroundColor: 'f5f5f5',
	nav: {
        title: '活动',
        tintColor:'00bc8d',
        navigationBarHidden: Hero.getDeviceType()==='WECHAT',
	},
	views:
	[
        {
            class:'HeroTableView',
            frame:{w:'1x',h:'1x'},
            backgroundColor:'f5f5f5',
            name:'table'
        },
        {
            class: 'HeroToast',
            name: 'toast'
        },
        {
            class:'UIView',
            name:'payView',
            hidden:true,
            frame:{w:'1x',h:'1x'},
            backgroundColor:'eeeeeef1',
            subViews:[
                {
                    class:'UIView',
                    frame:{w:'1x',h:'1x'},
                    name:'qrView',
                    hidden:false,
                    subViews:[
                        {
                            class:'HeroLabel',
                            frame: { x: '25', r: '25', y: '10', h: '80' },
                            numberOfLines:2,
                            text:'请使用以太坊钱包扫描以下二维码，并在附加信息中输入以下Hex值来支付这笔订单，推荐的gas值为25001，约合0.0005 eth'
                        },
                        {
                            class: 'HeroImageView',
                            frame: { w: '200', h: '200'},
                            center:{x:'0.5x',y:'200'},
                            backgroundColor:'cccccc',
                            image:getNode()+'/qr?value='+window.currentAddress
                        },
                        {
                            class: 'HeroTextView',
                            name: 'hash',
                            backgroundColor:'eeeeee',
                            frame: { x: '25', r: '25', y: '320', h: '80' },
                        },
                        {
                            class: 'DRButton',
                            DRStyle: 'B1',
                            enable: true,
                            frame: { x: '25', r: '25', y: '460', h: '44' },
                            title: '完成',
                            click: [{datas:[{name:'payView',hidden:true}]}]
                        },
                        {
                            class: 'HeroButton',
                            frame: { w: '80', r: '25', y: '510', h: '44' },
                            title: '我没有钱包',
                            titleColor:'999999',
                            click:{datas:[{name:'qrView',hidden:true},{name:'newAcount',hidden:localStorage.address},{name:'acount',hidden:!localStorage.address}]}
                        }
                    ]
                },
                {
                    class:'UIView',
                    frame:{w:'1x',h:'1x'},
                    name:'newAcount',
                    hidden:true,
                    subViews:[
                        {
                            class: 'DRTextField',
                            theme: 'green',
                            placeHolder: '密码',
                            name: 'password',
                            textFieldDidEditing: { name: 'password'},
                            frame: { x: '25', r: '25', y: '40', h: '44'},
                        },
                        {
                            class: 'DRButton',
                            DRStyle: 'B1',
                            enable: true,
                            frame: { x: '25', r: '25', y: '104', h: '44' },
                            title: '生成钱包地址',
                            click: {click:'newAcount'}
                        }
                    ]
                },
                {
                    class:'UIView',
                    frame:{w:'1x',h:'1x'},
                    name:'acount',
                    hidden:true,
                    subViews:[
                        {
                            class:'HeroLabel',
                            frame: { x: '25', w: '50', y: '30', h: '30' },
                            text:'地址:'
                        },
                        {
                            class:'HeroLabel',
                            frame: { x: '25', r: '25', y: '50', h: '60' },
                            name:'address',
                            size:14,
                            text:localStorage.address
                        },
                        {
                            class:'HeroLabel',
                            frame: { x: '25', w: '50', y: '110', h: '30' },
                            text:'余额:'
                        },
                        {
                            class:'HeroLabel',
                            frame: { x: '70', r: '25', y: '110', h: '30' },
                            name:'balance',
                            text:localStorage.balance+' eth' + ((localStorage.balance == 0)?' (找一个懂区块链的朋友帮你吧)':'')
                        },
                        {
                            class: 'HeroTextView',
                            name: 'hash1',
                            backgroundColor:'eeeeee',
                            frame: { x: '25', r: '25', y: '170', h: '80' },
                        },
                        {
                            class: 'DRTextField',
                            theme: 'green',
                            placeHolder: 'value',
                            name: 'value',
                            textFieldDidEditing: { name: 'value'},
                            frame: { x: '25', r: '25', y: '290', h: '44' },
                        },
                        {
                            class: 'DRTextField',
                            theme: 'green',
                            placeHolder: '密码',
                            name: 'password',
                            textFieldDidEditing: { name: 'password'},
                            frame: { x: '25', r: '25', y: '354', h: '44' },
                        },
                        {
                            class: 'DRButton',
                            DRStyle: 'B1',
                            enable: true,
                            frame: { x: '25', r: '25', y: '440', h: '44' },
                            title: '确定',
                            click: {click:'pay'}
                        },
                        {
                            class: 'HeroButton',
                            frame: { w: '105', r: '25', y: '494', h: '44' },
                            title: '使用其它钱包',
                            titleColor:'999999',
                            click:{datas:[{name:'qrView',hidden:false},{name:'newAcount',hidden:true},{name:'acount',hidden:true}]}
                        }
                    ]
                }
            ]
        }
    ]
};

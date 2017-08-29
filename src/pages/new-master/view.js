import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';
import {getNode} from '../../utils/heroNodes';

export default {
    version: 0,
    backgroundColor: 'ffffff',
    nav: {
        navigationBarHidden: Hero.getDeviceType()==='WECHAT',
        title:'成为master',
        tintColor:'00bc8d'
    },
    views: [
        {
            class: 'DRTextField',
            type: 'phone',
            theme: 'green',
            frame: { x: '25', r: '25', y: '20', h: '50' },
            placeHolder: '手机号',
            name: 'phone',
            text:localStorage.phone,
            textFieldDidEditing: { name: 'phone' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '25', y: '0', h: '50' },
            yOffset: 'phone+20',
            placeHolder: '昵称',
            name: 'nickname',
            text:localStorage.nickname,
            textFieldDidEditing: { name: 'nickname' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '25', y: '0', h: '50' },
            yOffset: 'nickname+20',
            placeHolder: '简介',
            name: 'desc',
            text:localStorage.desc,
            textFieldDidEditing: { name: 'desc' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '75', y: '0', h: '50' },
            yOffset: 'desc+20',
            placeHolder: '头像url',
            name: 'icon',
            text:localStorage.icon,
            textFieldDidEditing: { name: 'icon' }
        },
        {
            class: 'DRButton',
            DRStyle: 'B1',
            frame: { w: '25', r: '25', y: '0', h: '40' },
            yOffset: 'desc+20',
            title: '?',
            enable: true,
            click:{command:'goto:http://ctrlq.org/images'}
        },
        {
            class: 'DRButton',
            name: 'hashBtn',
            DRStyle: 'B1',
            enable: false,
            frame: { x: '25', r: '25', y: '0', h: '44' },
            yOffset: 'icon+50',
            title: '生成 HASH',
            click: [{datas:[{name:'payView',hidden:false}]},{click:'hash'}]
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
                            text:'请使用以太坊钱包扫描以下二维码，并在附加信息中输入以下Hex值来支付这笔订单，金额随意'
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
                            click: [{datas:[{name:'payView',hidden:true}]},{command:'back'}]
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
                            text:localStorage.balance+' eth' + (localStorage.balance == 0)?' (转账到以上地址几分钟即可到账)':''
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
        },

    ]
};

import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';
import {getNode} from '../../utils/heroNodes';

export default {
    version: 0,
    backgroundColor: 'ffffff',
    nav: {
        navigationBarHidden: Hero.getDeviceType()==='WECHAT',
        title:'增加活动',
        tintColor:'00bc8d'
    },
    views: [
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '25', y: '20', h: '50' },
            placeHolder: '标题',
            name: 'title',
            textFieldDidEditing: { name: 'title' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '25', y: '0', h: '50' },
            yOffset: 'title+20',
            placeHolder: '交换价值(单位 eth)',
            name: 'price',
            textFieldDidEditing: { name: 'price' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '25', y: '0', h: '50' },
            yOffset: 'price+20',
            placeHolder: '时间描述',
            name: 'time',
            textFieldDidEditing: { name: 'time' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '25', y: '0', h: '50' },
            yOffset: 'time+20',
            placeHolder: '简单介绍',
            name: 'desc',
            textFieldDidEditing: { name: 'desc' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '25', y: '0', h: '50' },
            yOffset: 'desc+20',
            placeHolder: '详细简介',
            name: 'detail',
            textFieldDidEditing: { name: 'detail' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '75', y: '0', h: '50' },
            yOffset: 'detail+20',
            placeHolder: '图片地址',
            name: 'icon',
            textFieldDidEditing: { name: 'icon' }
        },
        {
            class: 'DRButton',
            DRStyle: 'B1',
            frame: { w: '25', r: '25', y: '0', h: '40' },
            yOffset: 'detail+20',
            title: '?',
            enable: true,
            click:{command:'goto:http://ctrlq.org/images'}
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '75', y: '0', h: '50' },
            text:localStorage.gps,
            name: 'gps',
            hidden:true,
            textFieldDidEditing: { name: 'gps' }
        },
        {
            class: 'DRTextField',
            theme: 'green',
            frame: { x: '25', r: '75', y: '0', h: '50' },
            text:localStorage.phone,
            name: 'phone',
            hidden:true,
            textFieldDidEditing: { name: 'phone' }
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
                            image:getNode()+'/qr?value=0x397d36412317dFEC91Ef856BAE500A2c39582fB8'
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
                            text:localStorage.balance+' eth'+ (localStorage.balance == 0)?' (转账到以上地址几分钟即可到账)':''
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

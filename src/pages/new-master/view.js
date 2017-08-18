import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';

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
            class:'UIView',
            name:'payView',
            hidden:true,
            frame:{w:'1x',h:'1x'},
            backgroundColor:'eeeeeef1',
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
                    image:'http://localhost:3001/qr?value=0x33739a02D8E7fE94888eABb5Ba9aaea0d228996F'
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
                    titleColor:'999999'
                },

            ]
        },

    ]
};

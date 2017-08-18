import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';


export default {
	version: 0,
	backgroundColor: 'f5f5f5',
	nav: {
        title: '美食',
        tintColor:'00bc8d',
        navigationBarHidden: Hero.getDeviceType()==='WECHAT',
	},
	views:
	[
        {
            class:'UIView',
            frame:{w:'1x',h:'300'},
            backgroundColor:'ffffff',
        },
        {
            class:'UIView',
            frame:{x:'15',r:'0',y:'250',h:'0.5'},
            backgroundColor:'f5f5f5',
        },
        {
            class:'HeroImageView',
            frame:{w:'1x',h:'200'},
            name:'image',
            backgroundColor:'eeeeee',
            image:'https://p0.meituan.net/deal/28ac614b9519d5e2b84e361e15b7c570360333.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20'
        },
        {
            class:'HeroLabel',
            name:'desc',
            frame:{x:'15',r:'15',y:'160',h:'40'},
            textColor:'cccccc',
            numberOfLines:2,
            size:10,
            text:'仅交换0.001 eth，最高交换1.0 eth, 同时接受PAY、OMG、ANS交换'
        },
        {
            class:'HeroLabel',
            frame:{x:'15',r:'15',y:'200',h:'50'},
            text:'交换值(eth): 0.01',
            textColor:'ff6622',
            size:26,
            attribute:{
              'color(0,9)':'aaaaaa',
              'size(0,9)':'16',
            },
        },
        {
            class: 'DRButton',
            DRStyle: 'B1',
            enable: true,
            frame: { r: '15', w: '88', y: '205', h: '40' },
            title: '去交换',
            click: [{datas:[{name:'payView',hidden:false}]},{click:'change'}]
        },
        {
            class:'HeroLabel',
            frame:{x:'15',r:'15',y:'250',h:'50'},
            text:'历史交换次数: 0',
            textColor:'ff6622',
            size:26,
            attribute:{
              'color(0,7)':'aaaaaa',
              'size(0,7)':'16',
            },
        },
        {
            class:'HeroLabel',
            frame:{r:'15',w:'0.5x',y:'250',h:'50'},
            text:'今日交换: 0',
            textColor:'ff6622',
            size:26,
            attribute:{
              'color(0,5)':'aaaaaa',
              'size(0,5)':'16',
            },
        },
        {
            class:'HeroLabel',
            frame:{x:'15',w:'0.5x',y:'320',h:'30'},
            text:'详细信息',
            textColor:'aaaaaa',
            size:10,
        },
        {
            class:'UIView',
            frame:{w:'1x',y:'350',h:'200'},
            backgroundColor:'ffffff',
            subViews:[
                {
                    class:'HeroTextView',
                    frame:{x:'15',r:'15',y:'10',h:'220'},
                    backgroundColor:'ffffff',
                    textColor:'666666',
                    size:18,
                    enable:false,
                    text:'  辣椒素的辣椒 \n拉萨决定离开房间数量flakesf\nolks分开了三等奖疯狂的是非 '
                }
            ]
        },
        {
            class: 'DRButton',
            DRStyle: 'B1',
            enable: true,
            frame: { r: '15', x: '15', y: '570', h: '44' },
            title: '联系 master',
            click: {command:'goto:tel://13701673994'}
        },
        {
            class: 'UIView',
            frame: { r: '15', x: '15', y: '610', h: '20' },
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
                    click: { datas:[{name:'payView',hidden:true}]}
                },

            ]
        },


	]
};

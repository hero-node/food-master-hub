import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';

export default {
    version: 0,
    backgroundColor: 'ffffff',
    nav: {
        navigationBarHidden: Hero.getDeviceType()==='WECHAT',
        title:'注册',
        tintColor:'00bc8d'
    },
    views: [
        {
            class: 'DRTextField',
            type: 'phone',
            theme: 'green',
            frame: { x: '25', r: '25', y: '0.25x', h: '50' },
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
            frame: { x: '25', r: '125', y: '0', h: '50' },
            yOffset: 'nickname+20',
            placeHolder: '位置',
            name: 'gps',
            text:localStorage.gps,
            textFieldDidEditing: { name: 'gps' }
        },
        {
            class: 'DRButton',
            DRStyle: 'B1',
            enable: true,
            frame: { w: '75', r: '25', y: '0', h: '40' },
            yOffset: 'nickname+20',
            title: '获取位置',
            click: { click: 'gps' }
        },
        {
            class: 'DRButton',
            name: 'loginBtn',
            DRStyle: 'B1',
            enable: false,
            frame: { x: '25', r: '25', y: '0', h: '44' },
            yOffset: 'gps+50',
            title: '保存',
            click: { click: 'login' }
        },
        {
            class: 'HeroLabel',
            frame: { x: '15', r: '15', b: '0', h: '50' },
            numberOfLines:2,
            size:10,
            textColor:'aaaaaa',
            text: '注册个人信息，请随意填写，此应用为无服务端应用，您的个人信息将存储在您的手机中，业务信息将存储在区块链网络中',
        },
        {
            class: 'HeroToast',
            name: 'toast',
            corrnerRadius: 10,
            frame: { w: '300', h: '44' },
            center: { x: '0.5x', y: '0.5x' }
        }
    ]
};

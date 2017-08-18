import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';

export default {
    version: 0,
    backgroundColor: 'ffffff',
    nav: {
        navigationBarHidden: Hero.getDeviceType()==='WECHAT',
        title:'关于 Master Hub',
        tintColor:'00bc8d'
    },
    views: [
        {
            class:'HeroWebView',
            frame:{w:'1x',h:'1x'},
            name:'about'
        }
    ]
};

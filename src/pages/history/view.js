import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';
import {getNode} from '../../utils/heroNodes';


export default {
	version: 0,
	backgroundColor: 'f5f5f5',
	nav: {
        title: '参与记录',
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
        }
    ]
};

import { PATH as path } from '../../constant/index';
import { Hero } from 'hero-js';


export default {
	version: 0,
	backgroundColor: 'f5f5f5',
	nav: {
        title: 'Master Hub',
        tintColor:'00bc8d',
        navigationBarHidden: Hero.getDeviceType()==='WECHAT',
        // rightItems:[{title:'加入',click:{command:'present:'+path+'/pages/new-master.html'}}] 
	},
	views:
	[
        {
            class:'HeroTableView',
            frame:{w:'1x',y:'0',h:'1x'},
            name:'foodmaster',
            backgroundColor:'f5f5f5'
        }

	]
};

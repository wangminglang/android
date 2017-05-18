import { Dimensions, Platform, PixelRatio } from 'react-native';
import NetUtil from './HJNetUtil';

global.gScreen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    navBarHeight: Platform.OS === 'ios' ? 64 : 50,
    navBarPaddingTop: Platform.OS === 'ios' ? 20 : 0,
    onePix: 1 / PixelRatio.get(),
    isIOS: Platform.OS === 'ios'
}

global.gColors = {
    title: '#333333',
    description: '#7f7f7f',
    background: '#f4f4f4',
    white: 'white'
}

global.gFetchArguments = {
	pageSize: 20
}

global.gBaseUrl = {
	baseUrl: 'http://192.168.1.248:957/'
}


global.NetUtil = NetUtil;

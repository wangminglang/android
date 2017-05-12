import {Dimensions, PixelRatio} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePR: 1 / PixelRatio.get()
}

let colors = {
    themeColor: 'rgb(217, 51, 58)',
}

let netConfig = {
	AppId: Platform.OS == 'ios' ? "ios" : "android",
	AppKey: Platform.OS == 'ios' ? "2aeb25716a0a8eomtrpdwmq5qwpedfprf9efdeb6c2607950ee" : "",
	clientversion: '1_3.6.1'
}

export default {
	window: window,
	colors: colors,
	netConfig: netConfig
}
'use strict'

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView
} from 'react-native';
import Header from '../../components/Header';
import Util from '../../common/HJNetUtil';
import * as Api from '../../common/api';
import Swiper from 'react-native-swiper';

export default class GoodsDetail extends Component {
	static navigationOptions = ({ navigation }) => ({
	    header: <Header title='商品详情' showLeftIcon={true} leftIconAction={() => navigation.goBack()}/>
    });

    constructor(props) {
    	super(props);
    	this.state = {
    		goodsDetail: {}
    	}
    }

    componentDidMount() {
	    const {params} = this.props.navigation.state;
	    Util.POST(Api.GET_GOODS_DETAIL, {id: params.id}, (responseData) => {
	      this.setState({
	        goodsDetail : responseData.data
	      })
	    })
	}
	render() {
		const { goodsDetail } = this.state;
		return (
			<ScrollView style={styles.container}>
				<TopView goodsDetail={goodsDetail} />
				<View style={{paddingVertical:12, backgroundColor: gColors.white, marginTop: 1, marginBottom: 1}}>
					<Image />
					<Text>全场包邮</Text>
				</View>
			</ScrollView>
		)
	}
}

const TopView = ({goodsDetail}) => {
	return (
		<View style={{backgroundColor: gColors.white, alignItems: 'center'}}>
	        <Swiper height={gScreen.width}  showsButtons={false} autoplay={true}>
		    	{goodsDetail.imageList != null && goodsDetail.imageList.map((image, index) => {
		    		return <Image key={index} style={{width: gScreen.width, height: gScreen.width}} source={image ? {uri: image} : require('../../images/shangpinxiangqing.jpg')} />;
		    	})}
	        </Swiper>
			<Text style={{fontSize: 17, color: gColors.title, marginTop: 20}}>{goodsDetail.title}</Text>
			<Text style={{fontSize: 14, color: gColors.description, marginTop: 10}}>{goodsDetail.summary}</Text>
			<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 25}}>
				<Text style={{fontSize: 18, color: gColors.red}}>￥{goodsDetail.priceSell}</Text>
				<View style={{marginLeft: 5}}>
					<Text style={{fontSize: 13, color: gColors.clear}}>￥{goodsDetail.price}</Text>
					<View style={{position: 'absolute', top: 8, backgroundColor:gColors.clear, height: 1, left: 0, right: 0}} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	    backgroundColor: gColors.background
	}
})
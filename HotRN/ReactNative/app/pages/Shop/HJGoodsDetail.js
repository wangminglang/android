'use strict'

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity
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
		const { imageList, tuanList, shopInfo } = goodsDetail;
		return (
			<ScrollView style={styles.container}>
				{imageList &&
				<TopView goodsDetail={goodsDetail} />
				}

				<View style={{padding:12, backgroundColor: gColors.white, marginTop: 1, marginBottom: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
					<Item title='全场包邮' />
					<Item title='24小时发货' />
					<Item title='假一赔十' />
				</View>

				{tuanList &&
				<View style={{backgroundColor: gColors.white, paddingHorizontal: 15, paddingVertical: 20}}>
					<Text style={{fontSize: 13, color: gColors.title}}>以下小伙伴正在开团</Text>
					{tuanList.map((itemData, index) => {
						return <TuanItem key={index} itemData={itemData} />
					})}
				</View>
				}

				{shopInfo &&
					<ShopView shopInfo={shopInfo} goToShop={this._goToShop} />
				}
			</ScrollView>
		)
	}

	_goToShop = (shopId) => {
	    this.props.navigation.goBack();
	}
}

const ShopView = ({shopInfo, goToShop}) => {
	let onPress = () => {
		goToShop && goToShop(shopInfo.id)
	}

	return (
		<View style={{padding: 15, backgroundColor: gColors.white, marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
			<Image style={{width: 42, height: 42}} source={shopInfo.image ? {uri: shopInfo.image} : require('../../images/mr_dianputouxiang.jpg')} />
			<Text style={{fontSize: 16, color: gColors.title, marginLeft: 10}}>{shopInfo.nameShop}</Text>
			<TouchableOpacity onPress={onPress} style={{position: 'absolute', right: 15, borderWidth: 1, borderColor: gColors.red, width: 85, height: 30, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{fontSize: 14, color: gColors.red}}>进店逛逛</Text>
			</TouchableOpacity>
		</View>
	)
}

const TuanItem = ({itemData}) => {
	alert('aaa')
	return (
		<View style={{flexDirection: 'row'}}>
			<Image style={{width: 41, height: 42}} source={itemData.icon ? {uri: itemData.icon} : require('../../images/mr_pintuantouxiang.jpg')} />
			
		</View>
	)
}

const Item = ({title}) => {
	return (
		<View style={{flexDirection: 'row'}}>
			<Image />
			<Text>{title}</Text>
		</View>
	)
}

const TopView = ({goodsDetail}) => {
	return (
		<View style={{backgroundColor: gColors.white, alignItems: 'center'}}>
	        <Swiper height={gScreen.width}  showsButtons={false} autoplay={true}>
		    	{goodsDetail.imageList.map((image, index) => {
		    		return <Image key={index} style={{width: gScreen.width, height: gScreen.width}} source={image ? {uri: image} : require('../../images/mr_shangpinxiangqing.jpg')} />;
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
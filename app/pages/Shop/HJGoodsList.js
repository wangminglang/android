'use strict';

import React,{Component, PureComponent} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native';

import {observer} from 'mobx-react/native';
import GoodsStore from '../../mobx/HJGoodsListStore';
import Loading from '../../components/Loading';
import LoadMoreFooter from '../../components/LoadMoreFooter';

const URL = gBaseUrl.baseUrl + 'buyerapi/goods/getGoodsList';

@observer
export default class GoodsList extends Component {

	static propTypes = {
		params: React.PropTypes.object
	}


	constructor(props){
	    super(props);
	    this.goodsListStore = new GoodsStore(URL, this.props.params);
    };

	render() {
	    const {isFetching, isRefreshing, listData} = this.goodsListStore;
		return(
			<View style={styles.container}>
		        <Loading isShow={isFetching} />
		        {!isFetching &&
                <ScrollView
                    ref='scroll'
                    automaticallyAdjustContentInsets={false}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    bounces={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                >
                    <View style={styles.contentContainer}>
                        {listData.map((itemData, i) => {
                            return (
                                <GoodsItem key={i} data={itemData} />
                            )
                        })}
                    </View>
                    <LoadMoreFooter isNoMore={this.goodsListStore.isNoMore} />
                </ScrollView>
	            }
			</View>
		)
	}

	_onMomentumScrollEnd = () => {
        if (!this.goodsListStore.isNoMore) {
            this.goodsListStore.page++;
            this.goodsListStore.fetchListData();
        }
	}

	_onRefresh = () => {
        this.goodsListStore.isRefreshing = true;
        this.goodsListStore.fetchListData();
	}
}

const GoodsItem = ({
	data
}) => {
	return(
		<TouchableOpacity
            activeOpacity={0.75}
            style={[styles.item]}
		>
            <Image style={{width: (gScreen.width-2)/2-10, height: (gScreen.width-2)/2-10}} source={data.image ? {uri: data.image} : require('../../images/dianpushangpin.jpg')} />
		    <Text style={{fontSize: 13, color: gColors.title, }}>{data.title}</Text>  
            <Text style={{fontSize: 13, color: gColors.red}}>￥{data.price}</Text>
        </TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: gColors.background
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'space-between'
    },
    item: {
    	padding: 5,
    	paddingBottom: 15,
    	backgroundColor: gColors.white,
    	width: (gScreen.width - 4)/2,
    	marginTop: 2,
        alignItems: 'center'
    }
})
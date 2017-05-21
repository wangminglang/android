import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ActivityIndicator
} from 'react-native';

export default class LoadMoreFooter extends Component {
	static propTypes = {
		isNoMore: React.PropTypes.bool
	}

	static defaultProps = {
        isNoMore: false
    }

    render() {
        const {isNoMore} = this.props;
        const title = isNoMore ? '- 没有更多了 -' : '正在加载中...';
        return(
        	<View style={styles.loadingContainer}>
                {!isNoMore && <ActivityIndicator />}
                <Text style={styles.title}>{title}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
	loadingContainer: {
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 12,
        marginLeft: 5,
        color: '#7f7f7f'
    }
})
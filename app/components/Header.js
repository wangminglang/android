import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';

export default class Header extends PureComponent {
	static defaultProps = {
		showLeftIcon: false
	}

	render() {
		let NavigationBar = []

		//左边按钮
		if (this.props.showLeftIcon) {
			NavigationBar.push(
				<TouchableOpacity
					key='leftIcon'
					activeOpacity={0.75}
					onPress={this.props.leftIconAction}
					style={styles.leftIcon}
				>
					<Image resizeMode={'contain'} source={require('../images/ic_back_dark.png')} style={{height: this.props.leftIconSize || 20, width: this.props.leftIconSize || 20}}  />
				</TouchableOpacity>
			)
		}

		//标题
		if (this.props.title != undefined) {
			NavigationBar.push(
				<Text key='title' style={styles.title}>{this.props.title}</Text>
			)
		}

		//自定义标题View
		if (this.props.titleView != undefined) {
			let Compoent = this.props.titleView;
			NavigationBar.push(
				<Compoent key='titleView' />
			)
		}

		//右边图片按钮
		if (this.props.rightIcon != undefined) {
			NavigationBar.push(
				<TouchableOpacity
					key='rightIcon'
					activeOpacity={0.75}
					onPress={this.props.rightIconAction}
					style={styles.rightIcon}
				>
					<Image resizeMode={'contain'} source={this.props.rightIcon} style={{height: this.props.rightIconSize || 20, width: this.props.rightIconSize || 20}}  />
				</TouchableOpacity>
			)
		}

		//右边文字按钮
		if (this.props.rightButton) {
			NavigationBar.push(
				<TouchableOpacity
					key='rightButton'
					activeOpacity={0.75}
					onPress={this.props.rightButtonAction}
					style={styles.rightButton}
				>
                    <Text style={styles.buttonTitleFont}>{this.props.rightButton}</Text>
				</TouchableOpacity>
			)
		}

		return(
			<View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
		)
	}
}

const styles = StyleSheet.create({
	navigationBarContainer: {
		flexDirection: 'row',
		height: Platform.OS === 'ios' ? 64 : 50,
		paddingTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
	},
	title: {
		fontSize: 17,
        color: gColors.title
	},
	leftIcon: {
		width: Platform.OS === 'ios' ? 44 : 50,
		height: Platform.OS === 'ios' ? 44 : 50,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		top: Platform.OS === 'ios' ? 20 : 0
	},
	rightIcon: {
		position: 'absolute',
        right: 10,
        height: 44,
        justifyContent: 'center',
        flexDirection: 'row'
	},
	rightButton: {
		position: 'absolute',
        right: 10,
        height: 44,
        justifyContent: 'center',
        flexDirection: 'row',
	},
	buttonTitleFont: {
		color: 'white',
        fontSize: 15,
	}
})
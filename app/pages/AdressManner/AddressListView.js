/**
 * Created by duan on 2017/4/22.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ListView,
    Alert
}from'react-native';
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
import CheckBox from 'react-native-check-box';
export default class AddressListView extends React.Component {
    static defaultProps = {
        dataSource: []
    }
    // 初始化模拟数据
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.dataSource)
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            >
            </ListView>
        );
    }

//具体的item
    renderRow(rowdata) {
        return (
            <View style={styles.cellStyle}>
                <View style={styles.viewStyle}>
                    <Text style={styles.txtStyle}>姓名</Text>
                    <Text style={styles.txtStyle}>1111111111111</Text>
                </View>
                <View style={styles.addressStyle}>
                    <Text style={styles.txtStyle}>dddd</Text>
                    <Text style={styles.adsStyle}>有有有有有有有有有有有顶顶顶顶顶顶顶顶</Text>
                </View>
                <View style={[styles.viewStyle, {marginBottom: 13}]}>
                    <View style={styles.bottom}>
                        <CheckBox
                            onClick={() => this.onCheck()}
                            isChecked={true}
                            checkedImage={<Image source={require('./../../images/zhifugou.png')}
                                                 style={{width: 18, height: 18}}/>}
                            unCheckedImage={<Image source={require('./../../images/zhifugou2.png')}
                                                   style={{width: 18, height: 18}}/>}
                        >
                        </CheckBox>
                        <Text style={[styles.txt, {marginLeft: 5}]}>
                            设为默认地址
                        </Text>
                    </View>
                    <View style={styles.actionStyle}>
                        <TouchableOpacity onPress={(rowdata) => this.delete(rowdata)}>
                            <Text style={styles.txt}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(rowdata) => this.edit(rowdata)}>
                            <Text style={[styles.txt, {marginLeft: 10}]}>编辑</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    /**
     * 删除
     * @param rowdata
     */
    delete(rowdata) {
        Alert.alert("88")
    }

    /**
     * 编辑
     * @param rowdata
     */
    edit(rowdata) {
        Alert.alert("77")
    }

    onCheck() {
        Alert.alert("999")
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 13,
        alignItems: 'center'
    },
    actionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        alignItems: 'center'
    },
    addressStyle: {
        flexDirection: 'row',
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 17,
        paddingBottom: 14,
        borderBottomWidth: .5,
        borderBottomColor: '#dddddd',
        alignItems: 'center'
    },
    txtStyle: {
        fontSize: 14,
        color: '#333333'
    },
    adsStyle: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 15,
        marginRight: 15
    },
    cellStyle: {
        backgroundColor: 'white',
        width: width,
        // 水平居中和垂直居中
        justifyContent: 'center',
        marginTop: 10,
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        color: '#333333',
        fontSize: 13,
    },
    choosetxt: {
        width: 250,
        color: '#7f7f7f',
        fontSize: 14,
        marginLeft: 15,
    }
})

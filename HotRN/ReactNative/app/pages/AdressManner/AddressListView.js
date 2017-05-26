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
import * as Api from './../../common/api';
export default class AddressListView extends React.Component {
    static defaultProps = {}
    // 初始化模拟数据
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            addressList: [1, 2, 3]
        };
    }

    componentDidMount() {
        NetUtil.POST(Api.GET_ADDRESS_LIST, null, (data) => this.addressListsuccessCallback(data), null);
    }

    addressListsuccessCallback(data) {
        if (data.result) {
            Alert.alert(data.list.length);
            this.setState({
                // addressList: data.list
            })
        }
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.addressList)}
                renderRow={this.renderRow.bind(this)}
            >
            </ListView>
        );
    }

//具体的item
    renderRow(rowData, rowId) {
        return (
            <View style={styles.cellStyle2}>
                <View style={styles.viewStyle2}>
                    <Text style={styles.txtStyle2}>姓名</Text>
                    <Text style={styles.txtStyle2}>1111111111111</Text>
                </View>
                <View style={styles.addressStyle2}>
                    <Text style={styles.txtStyle2}>dddd</Text>
                    <Text style={styles.adsStyle2}>有有有有有有有有有有有顶顶顶顶顶顶顶顶</Text>
                </View>
                <View style={[styles.viewStyle2, {marginBottom: 13}]}>
                    <View style={styles.bottom2}>
                        <CheckBox
                            onClick={() => this.onCheck()}
                            isChecked={true}
                            checkedImage={<Image source={require('./../../images/zhifugou.png')}
                                                 style={{width: 18, height: 18}}/>}
                            unCheckedImage={<Image source={require('./../../images/zhifugou2.png')}
                                                   style={{width: 18, height: 18}}/>}
                        >
                        </CheckBox>
                        <Text style={[styles.txt2, {marginLeft: 5}]}>
                            设为默认地址
                        </Text>
                    </View>
                    <View style={styles.actionStyle2}>
                        <TouchableOpacity onPress={(rowData) => this.delete(rowData)}>
                            <Text style={styles.txt2}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ this.edit.bind(this,rowData)}>
                            <Text style={[styles.txt2, {marginLeft: 10}]}>编辑</Text>
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
        let params = {
            'id': 1,
        };
        NetUtil.POST(Api.GET_ADDRESS_LIST, params, (data) => this.deletesuccessCallback(data), null);
    }

    deletesuccessCallback(data) {
        if (data.result) {
            NetUtil.POST(Api.GET_ADDRESS_LIST, null, (data) => this.addressListsuccessCallback(data), null);
        }
    }

    /**
     * 编辑
     * @param rowdata
     */
    edit(rowdata) {
        const {navigate} = this.props.navigation;
        navigate('MineAddAdress', rowdata);
    }

    /**
     * 设置默认地址
     * @param rowdata
     */
    onCheck(rowdata) {
        let params = {
            // 'isDefault': !rowdata.isDefault,
            // 'id': rowdata.id,
        };
        NetUtil.POST(Api.SAVE_ADDRESS, params, (data) => this.successCallback(data));
    }

    successCallback(data) {
        console.log(data);
        if (data.result) {
            NetUtil.POST(Api.GET_ADDRESS_LIST, null, (data) => this.addressListsuccessCallback(data), null);
        }
    }
}

const styles = StyleSheet.create({
    viewStyle2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 13,
        alignItems: 'center'
    },
    actionStyle2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        alignItems: 'center'
    },
    addressStyle2: {
        flexDirection: 'row',
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 17,
        paddingBottom: 14,
        borderBottomWidth: .5,
        borderBottomColor: '#dddddd',
        alignItems: 'center'
    },
    txtStyle2: {
        fontSize: 14,
        color: '#333333'
    },
    adsStyle2: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 15,
        marginRight: 15
    },
    cellStyle2: {
        backgroundColor: 'white',
        width: width,
        // 水平居中和垂直居中
        justifyContent: 'center',
        marginTop: 10,
    },
    bottom2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt2: {
        color: '#333333',
        fontSize: 13,
    },
    choosetxt2: {
        width: 250,
        color: '#7f7f7f',
        fontSize: 14,
        marginLeft: 15,
    }
})

/**
 * Created by duan on 2017/5/22.
 * 现有地址
 */
'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    ListView,
    ScrollView
} from 'react-native';
//得到屏幕宽度
var dimen = require('Dimensions');
var width = dimen.get('window').width;
import Picker from 'react-native-picker';
import area from './area.json';
import CheckBox from 'react-native-check-box';
import Header from '../../components/Header';
import * as Api from './../../common/api';
import  {DeviceEventEmitter} from 'react-native';
import AddressListView from './AddressListView'
import {tabStatus} from '../../HJMain'
let _this = null
export default class Address extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: <Header title='地址管理' showLeftIcon={true} leftIconAction={() => _this._goBack()}/>
    })

    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            addressList: [1, 2, 3],
            addressNun: null,
        };
    };
    _goBack(){
        this.props.navigation.goBack();
        tabStatus.show();
    }
    componentWillMount(){
        tabStatus.hide();
    }
    componentWillUnmount() {
        this.subscription.remove();
    };

    componentDidMount() {
        this.refreshData();
        this.subscription = DeviceEventEmitter.addListener('refreshData', () => {
            this.refreshData();
        })
    };

    /**
     * 刷新数据
     */
    refreshData() {
        NetUtil.POST(Api.GET_ADDRESS_LIST, null, (data) => this.addressListsuccessCallback(data), null);
    }

    addressListsuccessCallback(data) {
        if (data.result) {
            Alert.alert("333");
            this.setState({
                // addressList: data.list
                addressNun: 3
            })
        }
    }

    render() {
        return (this.state.addressNun ===null ?null:this.state.addressNun ===0 ?
                <View style={styles.content1}>
                    <Image source={require('./../../images/bg_gerenzhongxin.png')} style={styles.imgStyle1}/>
                    <Text style={styles.txtStyle1}>您还没有收货地址</Text>
                    <TouchableOpacity style={styles.btn1} onPress={() => this.addAdress()} activeOpacity={0.75}>
                        <Text style={styles.btnText1}>
                            + 新建地址
                        </Text>
                    </TouchableOpacity>
                </View> :
                <View style={styles.content}>
                    <ScrollView>
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(this.state.addressList)}
                            renderRow={this.renderRow.bind(this)}
                        >
                        </ListView>
                        <TouchableOpacity style={styles.btn} onPress={() => this.addAdress()} activeOpacity={0.75}>
                            <Text style={styles.btnText}>
                                + 新建地址
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
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
                        <TouchableOpacity onPress={(rowData) => this.showDialog(rowData)}>
                            <Text style={styles.txt2}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ this.edit.bind(this, rowData)}>
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
    showDialog() {
        Alert.alert('温馨提醒', '确认删除此收货地址', [
            {
                text: '取消',
                onPress: function () {

                }
            },
            {
                text: '确定',
                onPress: function () {
                    let params = {
                        'id': 1,
                    };
                    NetUtil.POST(Api.DELETE_ADDRESS, params, (data) => _this.deletesuccessCallback(data), null);
                }
            },
        ])
    }

    deletesuccessCallback(data) {
        if (data.result) {
            this.refreshData()
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
            this.refreshData();
        } else {
            Alert.alert("dd")
        }
    }

    /**
     * 新建地址
     */
    addAdress() {
        const {navigate} = this.props.navigation;
        navigate('MineAddAdress');
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    viewStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: .5,
        borderBottomColor: '#dddddd',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
    },
    txtStyle: {
        fontSize: 14,
        color: '#333333',
    },
    iconStyle: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 10
    },
    btnLogin: {
        height: 45,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30,
        backgroundColor: '#EB4D3F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    bottom: {
        marginTop: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        color: '#7f7f7f',
        fontSize: 14,
        marginLeft: 15,
    },
    choosetxt: {
        width: 250,
        color: '#7f7f7f',
        fontSize: 14,
        marginLeft: 15,
    },
    btn: {
        marginTop: 30,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        borderColor: '#7a7a7a'
    },
    btnText: {
        fontSize: 14,
        color: '#333333',
    },
    content1: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle1: {
        width: 66,
        height: 93,
    },
    txtStyle1: {
        fontSize: 15,
        color: '#7a7a7a',
        marginTop: 24,
    },
    btn1: {
        marginTop: 19,
        width: 98,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7a7a7a'
    },
    btnText1: {
        fontSize: 14,
        color: '#333333',
    },
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
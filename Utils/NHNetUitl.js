/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import md5 from "react-native-md5";

import {
} from 'react-native';

// MD5 = require("crypto-js/md5");
import CONFIG from './NHNetConfig.js';

class NHNetUitl extends React.Component{
    static POST(url,params,callback){

        var tokenString = CONFIG.AppId;
        tokenString = tokenString+CONFIG.AppKey;
        var now = Date.now().toString().slice(0,10);
        tokenString += now;
        var token = md5.hex_md5(tokenString);
        var param = {
          'appId':CONFIG.AppId,
          'deviceId' : '95501CD5-EF3D-4690-8E45-29D6610C7B85',
          'clientversion' : CONFIG.clientversion,
          'time' : now,
          'token' : token
        };
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            param[key] = params[key];
          }
        }

        var queryString = toQueryString(param);
        fetch(url,
                {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: queryString
                 }
             )
            .then((response)=>response.json())
            .then((responseData)=>{
              // alert(responseData.data.changeExpertNoticeText);
              if (callback) {

                callback(responseData);
              }
            })
            .catch((error)=>{
              alert(error);
            })
        }
}

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

module.exports = NHNetUitl;

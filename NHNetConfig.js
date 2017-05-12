import React, { Component } from 'react';
import {
    Platform
} from 'react-native';

const object = {
	AppId: Platform.OS == 'ios' ? "ios" : "android",
	AppKey: Platform.OS == 'ios' ? "2aeb25716a0a8eomtrpdwmq5qwpedfprf9efdeb6c2607950ee" : "",
	clientversion: '1_3.6.1'
};

export default object;
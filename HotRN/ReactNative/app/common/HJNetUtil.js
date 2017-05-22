import Common from './constants';
import md5 from "react-native-md5";

export default NetUtil = {
	GET: (url, successCallback, failCallback) => {
		fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
				successCallback(JSON.parse(responseText));
			})
			.catch((error) => {
				failCallback(err);
			})
	},

	POST: (url,params,successCallback,failCallback) => {
        // let tokenString = Common.netConfig.AppId;
        // tokenString = tokenString+Common.netConfig.AppKey;
        // let now = Date.now().toString().slice(0,10);
        // tokenString += now;
        // let token = md5.hex_md5(tokenString);
        let param = {
          // 'appId':Common.netConfig.AppId,
          // 'deviceId' : '95501CD5-EF3D-4690-8E45-29D6610C7B85',
          // 'clientversion' : Common.netConfig.clientversion,
          // 'time' : now,
          // 'token' : token
        };
        for (let key in params) {
          if (params.hasOwnProperty(key)) {
            param[key] = params[key];
          }
        }
        let queryString = toQueryString(param);
        fetch(url,
                {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'UserAgent':Common.netConfig.UserAgent,
                        'User-Agent':Common.netConfig.UserAgent,
                      },
                      body: queryString
                 }
             )
            .then((response)=>response.json())
            .then((responseData)=>{
              if (successCallback) {
								console.log(url,param,responseData);
                successCallback(responseData);
              }
            })
            .catch((error)=>{
              if (failCallback) {
                failCallback(error);
              }
            })
        }
}

let toQueryString = (obj) => {
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

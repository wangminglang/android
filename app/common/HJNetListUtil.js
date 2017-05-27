import {observable, computed, action, runInAction} from 'mobx';

export default class HJNetListUtil{
	@observable listData = [];
	@observable errorMsg = ''
	@observable page = 1
	@observable loading = false
	@observable isMore = true

	constructor(url,params,listKey) {
		url = gBaseUrl.baseUrl + url;
		this.listKey = listKey;
		this.url = url;
		this.params = params;
		this.params['page'] = this.page;
		this.POST();
	}

	@action
	POST(params){
		if (!this.loading) {
			this.loading = true;
			if (params) {
				this.params = params;
				this.params['page'] = this.page;
			}
			NetUtil.POST(
			this.url,
			this.params,
			(data)=>this.successCallback(data),
			(error)=>this.failCallback(error)
			);
		}
	}
	

	successCallback(data){

		this.errorMsg = '';
		var list = [];
		if (this.listKey) {
			list = data.data[listKey];
		}else{
			list = data.data.list;
		}
		

		if (!list.length) {
			this.isMore = false;
		    this.loading = false;
			return;
		}
		if (this.page == 1) {
			this.listData.replace(list);
		}else{
			this.listData.push(...list);
		}
		this.loading = false;
	}

	failCallback(error){
		this.loading = false;
		this.errorMsg = error;
	}
}

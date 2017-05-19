import {observable, computed, action, runInAction} from 'mobx';

export default class baseListStore {
	@observable listData = []
	@observable errorMsg = ''
	@observable page = 1
	@observable isRefreshing = false
	@observable isNoMore = true

	constructor(URL, params) {
		this.URL = URL;
		this.params = params;
		this.fetchListData();
	}

	@action
	fetchListData = async () => {
		if (this.isRefreshing) this.page = 1;
		this._fetchDataFromUrl()
		.then((response) => {
			const {list, isNoMore} = response;
			runInAction(() => {
				this.isRefreshing = false;
				this.errorMsg = '';
				this.isNoMore = isNoMore;
				if (this.page == 1) {
					this.listData.replace(list);
				}else{
					this.listData.splice(this.listData.length, 0, ...list);
				}
			})
		}).catch((error) => {
			console.log(`${error}`)
			this.errorMsg = error;
		})
		
	}

	@computed
	get isFetching() {
		return this.listData.length == 0 && this.errorMsg == ''
	}

	_fetchDataFromUrl = () => {
		return new Promise((resolve, reject) => {
            const URL = this.URL;
			const params = Object.assign({}, this.params, {page: this.page});
			fetch(URL, params)
			.then(response => response.json())
			.then(responseData => {
				if (responseData.result) {
					const {data} = responseData;
					const {list} = data;
					resolve({list, isNoMore: list.length < gFetchArguments.pageSize})
				}else {
					reject(responseData.error);
				}
			}).catch((error) => {
				console.log(`${error}`)
                reject('网络出错！')
			})

		})
	}

}

import {observable, computed, action, runInAction} from 'mobx';

export default class baseListStore {
	@observable listData = []
	@observable errorMsg = ''
	@observable page = 1
	@observable isRefreshing = false
	@observable isNoMore = true

	constructor(URL) {
		this.URL = URL;
		this.fetchListData();
	}

	@action
	fetchListData = async () => {
		if (this.isRefreshing) this.page = 1;
		this._fetchDataFromUrl()
		.then((response) => {
			const {data, isNoMore} = response;
			runInAction(() => {
				this.isRefreshing = false;
				this.errorMsg = '';
				this.isNoMore = isNoMore;
				if (this.page == 1) {
					this.listData.replace(data);
				}else{
					this.listData.splice(this.listData.length, 0, ...data);
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
			
			fetch(URL, {
				page: this.page
			})
			.then(response => response.json())
			.then(responseData => {
				if (responseData.result) {
					const {data} = responseData;
					resolve({data, isNoMore: data.length < gFetchArguments.pageSize})
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

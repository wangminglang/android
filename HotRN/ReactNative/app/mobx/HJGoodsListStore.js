import {observable, computed, action, runInAction} from 'mobx';

export default class baseListStore {
	@observable listData = []
	@observable errorMsg = ''
	@observable page = 1
	@observable isRefreshing = false
	@observable isNoMore = true
	@observable sortType = 0

	constructor(URL, shopId) {
		this.URL = URL;
		this.shopId = shopId;
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

	@action 
	refreshListData = () => {
		this.isRefreshing = true;
	    this.fetchListData();
	}

	@action 
	loadMoreListData = () => {
		if (!this.isNoMore) {
		    this.page++;
		    this.fetchListData();
	    }
	}

	@action 
	changeSortType = () => {
		this.listData.splice(0, this.listData.length)
	    this.isRefreshing = true
	    this.fetchListData();
	}

	@computed
	get isFetching() {
		return this.listData.length == 0 && this.errorMsg == ''
	}

	_fetchDataFromUrl = () => {
		return new Promise((resolve, reject) => {
			const params = Object.assign({}, {shopId: this.shopId}, {page: this.page}, {sortType: this.sortType});
            NetUtil.POST(this.URL, {
        		shopId: this.shopId, 
        		page: this.page, 
        		sortType: this.sortType
        	}, (responseData) => {
            	if (responseData.result) {
					const {data} = responseData;
					const {list} = data;
					resolve({list, isNoMore: list.length < gFetchArguments.pageSize})
				}else {
					reject(responseData.error);
				}
            }, (error) => {
        		console.log(`${error}`)
                reject('网络出错！')
            })
		})
	}

}


//个人中心
export const GET_USER_INFO = "buyerapi/user/getUserInfo";
//登录
export const LOGIN = "buyerapi/user/login";
//获取验证码
export const GET_VERIFY_CODE = "buyerapi/user/getVerifyCode";

//首页
export const GetHomeAllClassFirstPageData = "buyerapi/home/getHomeAllClassFirstPageData";

//获取所有分类接口
export const GetAllCatList = 'buyerapi/cat/getAllCatList';

/*
idClassificatioin	否	string	分类id		
page	否	string	分页页次		
sortType	否	string	排序规则	综合排序0,销量排序1,上架时间排序2,价格从低到高排序3,价格从高到底排序4	
keyWord	否	string	关键字	以空格分，最多三个	
shopId	否	string	店铺编号		
*/
// 获取商品列表接口
export const GetGoodsList = 'buyerapi/goods/getGoodsList';

//获取首页更多数据接口
export const GetHomeMoreData = "buyerapi/home/getHomeMoreData";

//商铺列表
export const GET_SHOPS_LIST = 'buyerapi/shop/getShopsList';
//商铺详情
export const GET_SHOPS_DETAIL = 'buyerapi/shop/getShopsDetail';
//商品列表
export const GET_GOODS_LIST =  'buyerapi/goods/getGoodsList';
//保存收货地址
export const SAVE_ADDRESS =  'buyerapi/address/saveAddress';


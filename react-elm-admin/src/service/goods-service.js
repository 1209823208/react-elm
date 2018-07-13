import MUtil from 'service/axios-service';
import axios from 'axios';
const _mm = new MUtil();
export default class GoodsService {
    getCategoryBytaurants(restaurant_id) {
        let url = 'shopping/getcategory' + restaurant_id;
        return _mm.get(url);
    }
    addCategory(paramsObj) {
        let url = 'shopping/addcategory',
            params = paramsObj;
        return _mm.post(url, params);
    }
    addGoods(paramsObj) {
        let url = 'shopping/addfood',
            params = paramsObj;
        return _mm.post(url, params);
    }
    goodsCount(restaurant_id=''){
        let url = 'shopping/v2/foods/count?restaurant_id' + restaurant_id;
        return _mm.get(url); 
    }
    getGoodsList(paramsObj){
        let url = 'shopping/v2/foods',
        params = paramsObj;
        return _mm.get(url,params);
    }
    getCategoryInfoByCategoryId(category_id){
        let url = 'shopping/v2/menu/' + category_id;
        return _mm.get(url); 
    }
    getRestaurantInfoByRestaurantId(restaurant_id){
        let url = 'shopping/restaurant/' + restaurant_id;
        return _mm.get(url); 
    }
    getCategoryAndRestaurantInfo(category_id,restaurant_id) {
        return axios.all([this.getCategoryInfoByCategoryId(category_id), this.getRestaurantInfoByRestaurantId(restaurant_id)])
            .then(axios.spread(function (categoryInfo, restaurantInfo) {
                let info = {
                    categoryInfo: categoryInfo,
                    restaurantInfo: restaurantInfo,
                }
                return Promise.resolve(info);
            }));
    }
    delGoods(goods_id){
        let url = 'shopping/v2/food/'+goods_id;
        return _mm.delete(url);
    }
    getCategory(paramsObj){
        let url = 'shopping/v2/menu',
        params = paramsObj;
        return _mm.get(url,params);
    }
    updatefood(paramsObj){
        let url = 'shopping/v2/updatefood',
            params = paramsObj;
        return _mm.post(url, params);
    }
}
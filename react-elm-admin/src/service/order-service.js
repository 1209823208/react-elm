import MUtil from 'service/axios-service';
import axios from 'axios';
const _mm = new MUtil();
export default class OrderService {

    orderCount(restaurant_id=''){
        let url = '/bos/orders/count?restaurant_id=' + restaurant_id;
        return _mm.get(url); 
    }
    getOrderList(paramsObj){
        let url = '/bos/orders',
        params = paramsObj;
        return _mm.get(url,params);
    }
    getRestaurantInfoByRestaurantId(restaurant_id){
        let url = 'shopping/restaurant/' + restaurant_id;
        return _mm.get(url); 
    }
    getUseInfoById(user_id){
        let url = 'v1/user/' + user_id;
        return _mm.get(url); 
    }
    getAddressInfoById(address_id){
        let url = 'v1/addresse/' + address_id;
        return _mm.get(url); 
    }
    getRestaurantInfoAndUserIndoAndAddressInfo(restaurant_id,user_id,address_id) {
        return axios.all([this.getRestaurantInfoByRestaurantId(restaurant_id), this.getUseInfoById(user_id),this.getAddressInfoById(address_id)])
            .then(axios.spread(function (restaurantInfo,userInfo,addressInfo ) {
                let info = {
                    restaurantInfo: restaurantInfo,
                    userInfo: userInfo,
                    addressInfo:addressInfo
                }
                return Promise.resolve(info);
            }));
    }
}
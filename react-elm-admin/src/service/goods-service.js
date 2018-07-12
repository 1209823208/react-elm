import MUtil from 'service/axios-service';
const _mm = new MUtil();
export default class GoodsService {
    getCategoryBytaurants(restaurant_id) {
        let url = '/shopping/getcategory/' + restaurant_id;
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
}
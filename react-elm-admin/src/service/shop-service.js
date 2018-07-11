import MUtil from 'service/axios-service';
const _mm = new MUtil();
export default class ShopService {
    getCurrentCity(params_obj) {
        let url = 'v1/cities',
            params = params_obj;
        return _mm.get(url, params);
    }
    restaurantsCount() {
        let url = 'shopping/restaurants/count';
        return _mm.get(url);
    }
    getShopList(params_obj) {
        let url = 'shopping/restaurants',
            params = params_obj;
        return _mm.get(url, params);
    }
    getCategory() {
        let url = 'shopping/v2/restaurant/category';
        return _mm.get(url).then((res) => {
            let catArr = res.map((item) => {
                let child_cat = [];
                if (typeof item.sub_categories !== 'undefined' && item.sub_categories.length > 0) {
                    child_cat = item.sub_categories.map((chl_cat) => {
                        return {
                            value: chl_cat.name,
                            label: chl_cat.name,
                        }
                    })
                }
                return {
                    value: item.name,
                    label: item.name,
                    children: child_cat
                };
            })
            return Promise.resolve(catArr);
        });
    }
    updateShopData(paramsObj) {
        let url = 'shopping/updateshop',
            params = paramsObj;
        return _mm.post(url, params);
    }
    delShop(id){
        let url = 'shopping/restaurant/'+id,
            params = {};
        return _mm.delete(url, params);
    }
}
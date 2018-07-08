import MUtil from 'service/axios-service';
import dtime from 'time-formater'
import axios from 'axios';
const _mm = new MUtil();
const today = dtime().format('YYYY-MM-DD')
export default class User {
    login(params_obj) {
        let url = 'admin/login',
            params = {...params_obj,pip_type:1};
        return _mm.post(url, params,true).then((res) => {
            if (res['token']) {
                localStorage.setItem('id_token', res['token'])
            }
            return res;
        });
    }
    userCount(){
        let url = '/statis/user/'+today+'/count';
        return _mm.get(url);
    }
    orderCount(){
        let url = '/statis/order/' + today + '/count';
        return _mm.get(url);
    }
    adminDayCount(){
        let url = '/statis/admin/' + today + '/count';
        return _mm.get(url);
    }
    getUserCount(){
        let url = '/v1/users/count';
        return _mm.get(url);
    }
    getOrderCount(){
        let url = '/bos/orders/count';
        return _mm.get(url);
    }
    adminCount(){
        let url = '/admin/count';
        return _mm.get(url);
    }
    getCount(){
        return axios.all([this.userCount(), this.orderCount(),this.adminDayCount(),this.getUserCount(),this.getOrderCount(),this.adminCount()])
        .then(axios.spread(function (userCount, orderCount,adminDayCount,getUserCount,getOrderCount,adminCount) {
          // Both requests are now complete
        //   console.log('getCount-userCount',userCount);
        //   console.log('getCount-orderCount',orderCount);
        //   console.log('getCount-adminDayCount',adminDayCount);
        //   console.log('getCount-getUserCount',getUserCount);
        //   console.log('getCount-getOrderCount',getOrderCount);
        //   console.log('getCount-adminCount',adminCount);
          let counts = {
            userCount:userCount.count,
            orderCount:orderCount.count,
            adminDayCount:adminDayCount.count,
            getUserCount:getUserCount.count,
            getOrderCount:getOrderCount.count,
            adminCount:adminCount.count
          }
          return Promise.resolve(counts);
        }));
    }
}
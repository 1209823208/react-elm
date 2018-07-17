import MUtil from 'service/axios-service';
import dtime from 'time-formater'
import axios from 'axios';
const _mm = new MUtil();
const today = dtime().format('YYYY-MM-DD')
export default class User {
    login(params_obj) {
        let url = 'admin/login',
            params = { ...params_obj,
                pip_type: 1
            };
        return _mm.post(url, params, true).then((res) => {
            if (res['token']) {
                localStorage.setItem('id_token', res['token'])
            }
            return res;
        });
    }
    logout(){
        let url = 'admin/singout',
            params = {};
        return _mm.get(url, params, false);
    }
    getUserList(paramsObj){
        let offset = paramsObj.current>0?paramsObj.current-1:0,
        limit=paramsObj.pageSize;
        let url = '/v1/users/list?offset='+offset+'&limit='+limit,
            params = {};
        return _mm.get(url, params);
    }
    userCount(date) {
        let url = '/statis/user/' + date + '/count';
        return _mm.get(url);
    }
    orderCount(date) {
        let url = '/statis/order/' + date + '/count';
        return _mm.get(url);
    }
    adminDayCount(date) {
        let url = '/statis/admin/' + date + '/count';
        return _mm.get(url);
    }
    getUserCount() {
        let url = '/v1/users/count';
        return _mm.get(url);
    }
    getOrderCount() {
        let url = '/bos/orders/count';
        return _mm.get(url);
    }
    adminCount() {
        let url = '/admin/count';
        return _mm.get(url);
    }
    getCount() {
        return axios.all([this.userCount(today), this.orderCount(today), this.adminDayCount(today), this.getUserCount(), this.getOrderCount(), this.adminCount()])
            .then(axios.spread(function (userCount, orderCount, adminDayCount, getUserCount, getOrderCount, adminCount) {
                // Both requests are now complete
                //   console.log('getCount-userCount',userCount);
                //   console.log('getCount-orderCount',orderCount);
                //   console.log('getCount-adminDayCount',adminDayCount);
                //   console.log('getCount-getUserCount',getUserCount);
                //   console.log('getCount-getOrderCount',getOrderCount);
                //   console.log('getCount-adminCount',adminCount);
                let counts = {
                    userCount: userCount.count,
                    orderCount: orderCount.count,
                    adminDayCount: adminDayCount.count,
                    getUserCount: getUserCount.count,
                    getOrderCount: getOrderCount.count,
                    adminCount: adminCount.count
                }
                return Promise.resolve(counts);
            }));
    }
    getSevenData() {
        let sevenDay = [];
        for (let i = 6; i > -1; i--) {
            const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD')
            sevenDay.push(date)
        }
        let apiArr = [
            [],
            [],
            []
        ];
        sevenDay.forEach((item) => {
            apiArr[0].push(this.userCount(item))
            apiArr[1].push(this.orderCount(item))
            apiArr[2].push(this.adminDayCount(item))
        })
        let promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
        let res_arr = new Array(promiseArr.length).fill();
        return axios.all(promiseArr)
            .then(axios.spread((...res_arr) => {
                const resArr = [
                    [],
                    [],
                    []
                ];
                res_arr.forEach((item, index) => {
                    if (item.status === 1) {
                        resArr[Math.floor(index / 7)].push(item.count)
                    }
                })
                return Promise.resolve({
                    sevenDay,
                    resArr
                });
            }));
    }
    adminCount() {
        let url = 'admin/count';
        return _mm.get(url);
    }
    getAdminList(paramsObj){
        let offset = paramsObj.current>0?paramsObj.current-1:0,
        limit=paramsObj.pageSize;
        let url = '/admin/all?offset='+offset+'&limit='+limit,
            params = {};
        return _mm.get(url, params);
    }
    getVisitor(){
        let url = 'v1/user/city/count';
        return _mm.get(url); 
    }
}
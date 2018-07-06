import MUtil from 'service/axios';
import axios from 'axios';
import { _URL } from 'service/axios';
const _mm = new MUtil();
export default class User {
    login(params_obj) {
        let url = 'admin/login',
            params = params_obj;
        return _mm.post(url, params,true).then((res) => {
            if (res['token']) {
                localStorage.setItem('id_token', res['token'])
            }
            return res;
        });
    }
    getCount(){
        // axios.all([getUserAccount(), getUserPermissions()])
        // .then(axios.spread(function (acct, perms) {
        //   // Both requests are now complete
        // }));
    }
}
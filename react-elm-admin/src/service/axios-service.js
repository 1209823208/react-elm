import {
    environment
} from '../environments/environment';
import axios from 'axios';

export function _URL(url) {
    if (url.charAt(0) !== '/') {
        url = '/' + url;
    }
    return environment.UrlPrefix + url;
}

function getHeader() {
    let jwt = localStorage.getItem('id_token');
    let authHeader = '';
    if (jwt) {
        authHeader = 'JWT ' + jwt;
    }
    return authHeader;
}
export default class MUtil {
    get(url, params={}, withCredentials = false) {
        return axios.get(_URL(url), {
                params: params,
                withCredentials: withCredentials,
                headers: {
                    Authorization: getHeader()
                }
            })
            .then((res) => {
                return this.handleSuccess(res)
            })
            .catch((error) => {
                return this.handleError(error)
            });
    }
    post(url, params={}, withCredentials = false) {
        return axios.post(_URL(url), params, {
                withCredentials: withCredentials,
                headers: {
                    Authorization: getHeader()
                }
            })
            .then((res) => {
                return this.handleSuccess(res)
            })
            .catch((error) => {
                return this.handleError(error)
            });
    }
    // 请求成功--数据处理
    handleSuccess(res) {
        let body = res;
        if (typeof body['data'] !== 'undefined') {
            return Promise.resolve(body['data'] || []);
        }
        return Promise.resolve(body);
    }

    // 请求失败--数据处理--Observable
    handleError(error) {
        if (error._body) {
            let errBody = JSON.parse(error._body);
            if (errBody.message) {
                error.message = errBody.message;
            } else if (errBody.detail) {
                error.message = errBody.detail;
            }
        }
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Promise.reject(errMsg);
    }
}
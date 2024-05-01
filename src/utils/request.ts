//对axios 进行集中封装配置
//配置后端baseurl
import axios from 'axios';

// 基于axios建立一个实例
// 做配置
// const instance = axios.create({
//     baseURL: 'http://127.0.0.1:3333/', //通用接口配置
//     headers: {

//     }
// })

//leancloud test
const instance = axios.create({
    baseURL: 'https://otbtg52u.lc-cn-n1-shared.com/1.1', //通用接口配置
    headers: {
        "X-LC-Id": "oTbTg52Ubip32dHBu5Tv2TJm-gzGzoHsz",
        "X-LC-Key": "iH02cQyuwsvJ4e9jxqXm3H79",
        "Content-Type": "application/json",
    },
})

export default instance;

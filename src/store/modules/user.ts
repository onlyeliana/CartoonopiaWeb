import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../api/user";
import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import store2 from 'store2';
import { userInfoProps } from '../../types/alltype'

export interface userStateType {
    isLogin: boolean;
    isLoading: boolean;
    isAdmin: boolean;
    userInfo: userInfoProps | null;
}
const initialState: userStateType = { //状态机存放的数据
    isLogin: false,
    isLoading: false,
    isAdmin: false,
    userInfo: null,
}

//提取本地存储数据 刷新后保存信息 
// let uinfo = localStorage.getItem("userInfo");
// let isAdmin = localStorage.getItem("isAdmin");
// if (uinfo) {
//     initialState.isLogin = true;
//     initialState.userInfo = JSON.parse(uinfo);
// }
// if (isAdmin === "true") {
//     initialState.isAdmin = true;
// }
let uinfo = store2.get('userinfo-cartoonopia')
let isAdmin = localStorage.getItem("cartoonopia-isadmin");
if (uinfo) {
    initialState.isLogin = true;
    initialState.userInfo = uinfo;
}
if (isAdmin === "true") {
    initialState.isAdmin = true;
}


const userslice = createSlice({
    name: 'user',
    initialState,
    reducers: {// 三种状态
        //  开始登陆
        loginStart(state) {
            state.isLoading = true;
        },
        // 管理员登录成功
        loginSuccessAdmin(state, action) {
            state.isLoading = false;
            state.isLogin = true;
            state.isAdmin = true;
            state.userInfo = action.payload;
            // localStorage.setItem("userInfo", JSON.stringify(action.payload)); //本地存储
            // localStorage.setItem("isAdmin", "true"); //本地存储
            store2('userinfo-cartoonopia', action.payload)
            store2('cartoonopia-isadmin', true)
        },
        // 普通用户登录成功
        loginSuccess(state, action) {
            state.isLoading = false;
            state.isLogin = true;
            state.userInfo = action.payload;
            // localStorage.setItem("userInfo", JSON.stringify(action.payload)); //本地存储
            // localStorage.setItem("isAdmin", "false"); //本地存储
            store2('userinfo-cartoonopia', action.payload)
            store2('cartoonopia-isadmin', false)

        },
        // 登录失败 / 退出登录
        loginFail(state) {
            state.isLoading = false;
            state.isLogin = false;
            state.isAdmin = false;
            state.userInfo = null;
            store2.remove('userinfo-cartoonopia')
            store2.remove('cartoonopia-isadmin')
        },
    }
})

export const { loginStart, loginSuccess, loginSuccessAdmin, loginFail } = userslice.actions;
export default userslice.reducer;

export const userLoginAsync = async (values: {
    email: string,
    password: string
}, dispatch: Dispatch, naviage: NavigateFunction) => {
    // 触发loginstart
    dispatch(loginStart());
    try {
        let res = await userLogin(values)
        console.log(res);
        if (res?.data?.results?.length === 0) {
            //没有这个账号 
            //登录失败
            dispatch(loginFail());
            console.log("Login failed！the email or password is incorrect ", res);
            message.error("Login failed！the email or password is incorrect ")

        } else if (res?.data?.results?.length > 0) {
            const data = res.data.results[0];
            if (data.isAdmin) {
                dispatch(loginSuccessAdmin(data));
                message.success("Admin login success！")
                return;
            }
            dispatch(loginSuccess(data));
            console.log("Login success ！", res);
            message.success("Welcome! " + data.firstname)
            setTimeout(() => {
                naviage('/')
            }, 500);
        }
    } catch (error) {
        dispatch(loginFail());
        console.log("Login failed！the email or password is incorrect ", error);
        message.error("Login failed! the email or password is incorrect ")
    }
    //登录成功 获取用户信息


    // 发起网络请求
    // 成功，触发loginsuccess 
    // 判断是否为管理员
    // 登录失败，触发loginfail
}

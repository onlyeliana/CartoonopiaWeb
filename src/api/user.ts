// 集中管理与普通用户相关的网络请求
import { favouriteAddParams, userInfoProps } from '../types/alltype';
import request from '../utils/request';

//用户
// 增加用户 注册 添加用户信息
export const addUser = (useritem: userInfoProps) => {
    return request.post("/classes/users",
        useritem
    )
}
//登录用户 验证密码和邮箱
export const userLogin = ({ email, password }: { email: string, password: string }) => {
    return request.get("/classes/users", {
        params: {
            where: {
                email,
                password
            }
        }
    })
}
//获得全部用户
export const getallusers = () => {
    return request.get("/classes/users")
}

//收藏夹
//得到用户收藏夹
export const getuserCollect = (user_id: string) => {
    return request({
        method: "get",
        url: '/classes/favourites',
        params: {
            where: {
                user_id
            }
        }
    })
}
//添加到收藏夹的请求
export const adduserCollect = async (favouriteFormat: favouriteAddParams) => {
    const res = await getuserCollect(favouriteFormat.user_id)
    if (res.data.results.length !== 0) {
        const objectid = res.data.results[0].objectId
        return request({
            method: "put",
            url: '/classes/favourites/' + objectid,
            params: {
                where: {
                    user_id: favouriteFormat.user_id
                }
            },
            data: {
                "characters": { "__op": "AddUnique", "objects": [favouriteFormat.characters] }
            }
        })
    } else {
        return request({
            method: "post",
            url: '/classes/favourites',
            data: {
                user_id: favouriteFormat.user_id,
                "characters": [favouriteFormat.characters]
            }
        })
    }

}

//删除收藏夹中收藏英雄的请求
export const removeuserCollect = async (favouriteFormat: favouriteAddParams) => {
    const res = await getuserCollect(favouriteFormat.user_id)
    const objectid = res.data.results[0].objectId
    return request({
        method: "put",
        url: '/classes/favourites/' + objectid,
        params: {
            where: {
                user_id: favouriteFormat.user_id
            }
        },
        data: {
            "characters": { "__op": "Remove", "objects": [favouriteFormat.characters] }
        }
    })


}

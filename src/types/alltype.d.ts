export interface characterProps {
    "id": string, //唯一标识 name的小写
    "active": boolean,
    "name": string,
    "subtitle": string,
    "description"?: string,
    "image_url"?: string,
    "strength": number,
    "speed": number,
    "skill": number,
    "fear_factor": number,
    "power": number,
    "intelligence": number,
    "wealth": number,
    "createdBy"?: string,
    "updatedBy"?: string
}

export interface userInfoProps {
    "oid"?: string,
    "firstname": string,
    "lastname": string,
    "username"?: string,
    "email": string,
    "password": string,
    "isAdmin"?: boolean,
    "objectId"?: string
}

export interface favouriteListProps {
    "user_id": string,
    "characters": Array<string> // 存放喜欢的英雄的id
}

export interface favouriteAddParams {
    "user_id": string,
    "characters": string // 存放喜欢的英雄的id
}

export interface favouriteDatasetProps {
    characters: string[],
    createdAt: string,
    objectId: string,
    updatedAt: string,
    user_id: string
}

// contributions 三种状态
export const statuslist = ["Approved", "Pending", "Rejected"]
// 撤销 == ？ 被拒绝 
// pending状态下可以撤销 撤销就删除这个contribution


export interface contributionsprops {
    "contribution_id": string,
    "user_id": { "_id": { "$oid": string } },
    "action": string,
    "status": string,
    "reviewed_by": { "_id": { "$oid": string } } | null,
    "date": string,
    "data": {
        "id": string,
        "name"?: string,
        "subtitle"?: string,
        "description"?: string,
        "image_url"?: string,
        "strength"?: number,
        "speed"?: number,
        "skill"?: number,
        "fear_factor"?: number,
        "power"?: number,
        "intelligence"?: number,
        "wealth"?: number
    }
}


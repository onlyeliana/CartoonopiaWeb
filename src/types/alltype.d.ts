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
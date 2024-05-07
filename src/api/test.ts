import { characterProps, } from '../types/alltype';
import request from '../utils/request';
import { testdataProps } from './types/type';

export const testpost = (testdata: testdataProps) => {
    request.post("classes/test",
        testdata
    ).then(() => {
        console.log("加数据成功");
    })
}

export const addCharacter = (characterItem: characterProps) => {
    return request.post("/classes/characters",
        characterItem
    )
}



export const getCharacterList = () => {
    return request.get("/classes/characters")
}

interface wheretype {
    id: string
}
export const getCharacterbyid = ({ id }: { id: string }) => {
    let where: wheretype = {

    } as wheretype;
    if (id) {
        where.id = id
    }
    return request.get("/classes/characters", {
        params: {
            where
        }
    })
}



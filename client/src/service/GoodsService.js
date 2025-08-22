import $api from "../http";

export const fetchGoods= async () => {
    const {data} = await $api.get('api/v1/goods/')
    return data
}

export const fetchOneGoods = async (id) => {
    const {data} = await $api.get('api/v1/goods/' + id)
    return data
}
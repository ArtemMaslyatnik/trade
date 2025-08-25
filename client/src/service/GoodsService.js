import $api from "../http";

export const fetchGoods= async () => {
    const {data} = await $api.get('goods/')
    return data
}

export const fetchOneGoods = async (id) => {
    const {data} = await $api.get('goods/' + id)
    return data
}
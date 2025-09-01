import $api from "../http";

export const fetchGoods= async () => {
    const {data} = await $api.get('goods/')
    return data
}

export const fetchOneGoods = async (id) => {
    const {data} = await $api.get('goods/' + id)
    return data
}

export const createGoods = async (item) => {
    const {data} = await $api.post('goods/', item)
    return data
}

export const updateGoods = async (id, item) => {
    console.log(item);
    const {data} = await $api.put('goods/'+ id +'/', item)
    return data
}

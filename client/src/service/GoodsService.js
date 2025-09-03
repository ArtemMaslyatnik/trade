import $api from "../http";

export const fetch= async () => {
    const {data} = await $api.get('goods/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('goods/' + id)
    return data
}

export const create = async (item) => {
    const {data} = await $api.post('goods/', item)
    return data
}

export const update = async (id, item) => {
    const {data} = await $api.put('goods/'+ id +'/', item)
    return data
}

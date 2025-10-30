import $api from "../http";

export const fetch= async () => {
    const {data} = await $api.get('warehouse/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('warehouse/' + id)
    return data
}

export const create = async (item) => {
    const {data} = await $api.post('warehouse/', item)
    return data
}

export const update = async (id, item) => {
    const {data} = await $api.put('warehouse/'+ id +'/', item)
    return data
}

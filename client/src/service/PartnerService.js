import $api from "../http";

export const fetch = async () => {
    const {data} = await $api.get('partner/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('partner/' + id)
    return data
}

export const create = async (item) => {
    console.log(item)
    const {data} = await $api.post('partner/', item)
    return data
}

export const update = async (id, item) => {
    console.log(item);
    const {data} = await $api.put('partner/'+ id +'/', item)
    return data
}
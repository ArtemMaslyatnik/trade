import $api from "../http";

export const fetch = async () => {
    const {data} = await $api.get('contract/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('contract/' + id)
    return data
}

export const create = async (item) => {
    console.log(item)
    const {data} = await $api.post('contract/', item)
    return data
}

export const update = async (id, item) => {

    const {data} = await $api.put('contract/'+ id +'/', item)
    return data
}
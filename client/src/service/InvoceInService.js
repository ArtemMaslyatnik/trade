import $api from "../http";

export const fetch= async () => {
    const {data} = await $api.get('invoice_in/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('invoice_in/' + id)
    return data
}

export const create = async (item) => {
    const {data} = await $api.post('invoice_in/', item)
    return data
}

export const update = async (id, item) => {
    const {data} = await $api.put('invoice_in/'+ id +'/', item)
    return data
}
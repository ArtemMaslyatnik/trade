import $api from "../http";

export const fetch= async () => {
    const {data} = await $api.get('invoice_out/')
    return data
}

export const fetchOne = async (id) => {
    const {data} = await $api.get('invoice_out/' + id)
    return data
}

export const create = async (item) => {
    const {data} = await $api.post('invoice_out/', item)
    return data
}

export const update = async (id, item) => {
    const {data} = await $api.put('invoice_out/'+ id +'/', item)
    return data
}
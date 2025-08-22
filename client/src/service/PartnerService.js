import $api from "../http";

export const fetchPartner= async () => {
    const {data} = await $api.get('api/v1/partner/')
    return data
}

export const fetchOnePartner = async (id) => {
    const {data} = await $api.get('api/v1/partner/' + id)
    return data
}
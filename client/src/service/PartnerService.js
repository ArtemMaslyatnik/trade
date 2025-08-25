import $api from "../http";

export const fetchPartner= async () => {
    const {data} = await $api.get('partner/')
    return data
}

export const fetchOnePartner = async (id) => {
    const {data} = await $api.get('partner/' + id)
    return data
}
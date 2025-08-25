import $api from "../http";

export const fetchCompany= async () => {
    const {data} = await $api.get('company/')
    return data
}

export const fetchOneCompany = async (id) => {
    const {data} = await $api.get('company/' + id)
    return data
}
import $api from "../http";

export const fetchCompany= async () => {
    const {data} = await $api.get('api/v1/company/')
    return data
}

export const fetchOneCompany = async (id) => {
    const {data} = await $api.get('api/v1/company/' + id)
    return data
}
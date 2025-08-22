import $api from "../http";

export const fetchContract= async () => {
    const {data} = await $api.get('api/v1/contract/')
    return data
}

export const fetchOneContract = async (id) => {
    const {data} = await $api.get('api/v1/contract/' + id)
    return data
}
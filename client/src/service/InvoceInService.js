import $api from "../http";

export const fetchInvoceIn= async () => {
    const {data} = await $api.get('invoice_in/')
    return data
}

export const fetchOneInvoceIn = async (id) => {
    const {data} = await $api.get('invoice_in/' + id)
    return data
}
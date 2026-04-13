import axios from "axios";
const baseUrl = 'https://petite-mindy-aisubs-7101bedc.koyeb.app/api'
const getAll = () => {
    const request = axios.get(`${baseUrl}/persons`)
    return request.then(response => response.data)
}
const updatePerson = (person) => {
    const request = axios.put(`${baseUrl}/persons/${person.id}`, person)
    return request.then(response => response.data)
}
const creratePerson = (data) => {
    const request = axios.post(`${baseUrl}/persons/`, data)
    return request.then(response => response.data)
}
const deletePerson  = (id) => {
    const request = axios.delete(`${baseUrl}/persons/${id}`)
    return request.then(response => response.data)
}
export default {getAll, creratePerson, updatePerson, deletePerson}
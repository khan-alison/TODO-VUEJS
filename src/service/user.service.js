import axios from "axios";

const apiDomain = " http://localhost:2001"

const UserService = {
    async index(params) {
        return await axios.get(`${apiDomain}/users`, {params})
    },
    async create(body) {
        return await axios.post(`${apiDomain}/users`, body)
    },
    async update(id, body) {
        return await axios.patch(`${apiDomain}/users/${id}`, body)
    },
    async delete(id) {
        return await axios.delete(`${apiDomain}/users/${id}`)
    },
}

export default UserService
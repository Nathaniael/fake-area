import axios from 'axios'

let prefixUrlApi = "";
if (process.env.NODE_ENV === 'development')
    prefixUrlApi = process.env.BASE_URL_DEV;
else
    prefixUrlApi = process.env.BASE_URL_PROD;

class RequestApi {
    async register(username, email, password) {
        const response = await axios.post(
            prefixUrlApi + "auth/register/",
            {
                "username" : username,
                "email": email,
                "password": password
            },
            {
                withCredentials: true
            }
        )
        return response.data
    }

    async login(usernameOrEmail, password) {
        let loginField = usernameOrEmail.includes("@") ? "email" : "username";

        const response = await axios.post(
            prefixUrlApi + "auth/login/",
            {
                [loginField]: usernameOrEmail,
                "password": password
            },
            {
                withCredentials: true
            }
        )
        return response.data
    }

    async getProfile() {
        const response = await axios.get(
            prefixUrlApi + "user/profile/",
            {
                withCredentials: true
            }
        )
        return response.data
    }

    async getServices() {
        const response = await axios.get(
            prefixUrlApi + "services/",
            {
                withCredentials: true
            }
        )
        return response.data
    }

    async createArea(createAreaDatas) {
        console.log(createAreaDatas)
        const response = await axios.post(
            prefixUrlApi + "areas/create/",
            createAreaDatas,
            {
                withCredentials: true
            }
        )
        return response.data
    }
}

export default new RequestApi()
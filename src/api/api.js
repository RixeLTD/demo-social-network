import * as axios from "axios";

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'api-key': 'b52af694-3fba-457c-ab6f-3de2b021f995',
    },

})

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instanse.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
}

export const profileAPI = {
    getProfile(userId) {
        return instanse.get(`profile/` + userId).then(response => response.data);
    },
    getStatus(userId) {
        return instanse.get(`profile/status/` + userId).then(response => response.data);
    },
    updateStatus(status) {
        return instanse.put('profile/status', {status: status}).then(response => response.data);
    },
    updatePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instanse.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    updateProfile(values) {
        return instanse.put('profile', values).then(response => response.data);
    }
}

export const followAPI = {
    unfollowUser(userId) {
        return instanse.delete('follow/' + userId).then(response => response.data);
    },
    followUser(userId) {
        return instanse.post('follow/' + userId).then(response => response.data);
    },
}

export const authAPI = {
    auth() {
        return instanse.get(`auth/me`).then(response => response.data);
    },
    login(email, password, rememberMe, captcha) {
        return instanse.post('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        });
    },
    logout() {
        return instanse.delete('auth/login').then(response => response.data);
    },
    getCaptcha() {
        return instanse.get('security/get-captcha-url').then(response => response.data.url);
    }
}
import { loginType } from "../components/LoginInput";
import { RegisterUser } from "../states/users/action";

interface optionsType {
    headers?: {
        Authorization?: string,
        'Content-Type'?: string,

    },
    method?: string,
    body?: string
}

const api = (() => {
    const BASE_URL = "https://forum-api.dicoding.dev/v1";

    function getAccessToken() {
        console.log(localStorage.getItem("twitAccessToken"))
        return localStorage.getItem("twitAccessToken");
    }

    async function _fetchWithAuth(url: string, options?: optionsType) {
        return fetch(url, {
            ...options,
            headers: {
                ...options?.headers,
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }

    function putAccessToken(token: string) {
        localStorage.setItem("twitAccessToken", token);
    }

    async function registerUser({ email, name, password }: RegisterUser) {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== "success") {
            throw new Error(message);
        }

        const {
            data: { user },
        } = responseJson;

        return user;
    }

    async function login({ email, password }: loginType) {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== "success") {
            throw new Error(message);
        }

        const {
            data: { token },
        } = responseJson;

        return token;
    }

    async function seeOwnProfile() {
        const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== "success") {
            throw new Error(message);
        }

        const {
            data: { user },
        } = responseJson;

        return user;
    }

    async function seeAllUsers() {
        const response = await fetch(`${BASE_URL}/users`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { users },
        } = responseJson;

        return users;
    }

    async function seeAllThreads() {
        const response = await fetch(`${BASE_URL}/threads`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { threads },
        } = responseJson;

        return threads;
    }

    async function seeDetailThreads(threadId: string) {
        const response = await fetch(`${BASE_URL}/threads/${threadId}`);

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { threadDetail },
        } = responseJson;

        return threadDetail;
    }

    async function createThreads({ title, body, category }: { title: string, body: string, category: string }) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                title,
                body,
                category
            }),
        });

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { thread },
        } = responseJson;

        return thread;
    }

    async function commentThread(threadId: string, content: string) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                content
            })
        })

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const {
            data: { thread },
        } = responseJson;

        return thread;
    }

    async function upVote(threadId: string) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
            method: 'POST'
        })

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message)
        }
    }

    async function downVote(threadId: string) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
            method: 'POST'
        })

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message)
        }
    }

    async function neutralizeVote(threadId: string) {
        const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
            method: 'POST'
        })

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message)
        }
    }

    async function seeLeaderboards() {
        const response = await _fetchWithAuth(`${BASE_URL}/leaderboards`)

        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message)
        }

        const {
            data: { leaderboards }
        } = responseJson;

        return leaderboards
    }

    return {
        putAccessToken,
        getAccessToken,
        registerUser,
        login,
        seeAllThreads,
        seeOwnProfile,
        seeAllUsers,
        seeDetailThreads,
        createThreads,
        upVote,
        downVote,
        neutralizeVote,
        seeLeaderboards,
        commentThread
    }
})();

export default api;

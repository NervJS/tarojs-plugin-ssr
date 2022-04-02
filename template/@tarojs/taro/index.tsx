interface Router {
    params: Record<string, string>
    path: string
}

interface Current {
    router: Router | null
}

function getCurrentInstance(): Current {
    return {
        router: {
            params: {},
            path: ''
        }
    }
}

export default {
    getCurrentInstance
}

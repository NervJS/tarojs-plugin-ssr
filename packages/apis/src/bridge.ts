import * as swan from './swan'

interface BridgeConfig {
    designWidth: number;
    showToast: typeof swan.showToast
    hideToast: typeof swan.hideToast
    showLoading: typeof swan.showLoading
    hideLoading: typeof swan.hideLoading
    showModal: typeof swan.showModal
}

class Bridge {
    private _config?: BridgeConfig

    setConfig(config: BridgeConfig): void {
        this._config = config
    }

    _guard = (): BridgeConfig => {
        if (!this._config) {
            throw new Error('Bridge config is required.')
        }
        return this._config
    }

    get designWidth(): number {
        return this._guard().designWidth
    }

    showToast: typeof swan.showToast = (...args) => {
        return this._guard().showToast(...args)
    }

    hideToast: typeof swan.hideToast = (...args) => {
        return this._guard().hideToast(...args)
    }

    showLoading: typeof swan.showLoading = (...args) => {
        return this._guard().showLoading(...args)
    }

    hideLoading: typeof swan.hideLoading = (...args) => {
        return this._guard().hideLoading(...args)
    }

    showModal: typeof swan.showModal = (...args) => {
        return this._guard().showModal(...args)
    }
}

export default new Bridge()

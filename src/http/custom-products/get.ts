import { HttpStatusText } from '@/utils/HttpStatusText';
import { defineStore, storeToRefs } from 'pinia';

const { VITE_PUBLIC_SHOPPUB_BASE_URL } = import.meta.env

export const GetCustomProducts = defineStore("get-custom-products", {
    state: () => ({
        loading: false,
        data: {} as any,
        error: {} as {
            title: string,
            statusCode: string,
            response: string
        }
    }),
    actions: {
        get(id: string) {
            const api = `${VITE_PUBLIC_SHOPPUB_BASE_URL}/v2/custom-products/${id}`;
            this.loading = true
            fetch(api)
                .then(async (response) => {
                    return {
                        data: response.json(),
                        status: response.status,
                        statusText: HttpStatusText[response.status] || 'Unknown',
                    }
                })
                .then(async (response) => {
                    if (![200].includes(response.status)) {
                        const errorObj = {
                            title: `Erro ao buscar produto.`,
                            statusCode: String(response.status),
                            response: response.statusText
                        }
                        this.error = errorObj
                        this.data = {}
                        return
                    }
                    this.data = await response.data
                    this.loading = false
                    this.error = {} as any
                })
                .catch((error) => {
                    const errorObj = {
                        title: `Erro ao se comunicar com o servidor.`,
                        statusCode: error.status,
                        response: error.message
                    }
                    this.loading = false
                    this.error = errorObj
                    this.data = {}
                });
        },
    }
});

export const GetCustomProductsRefs = () => {
    return storeToRefs(GetCustomProducts())
}

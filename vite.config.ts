import {defineConfig} from "vite";

export default defineConfig({
        server: {
            proxy: {
                '/api': 'https://accounting-test.crater2018.com/'
            }
        }
    }
)

import { createApp } from 'vue'
import App from './App'
import UIComponents from '@/components/UI'
import router from '@/components/router/router'

const app = createApp(App)

UIComponents.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .mount('#app')

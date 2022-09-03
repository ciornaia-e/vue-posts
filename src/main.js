import { createApp } from 'vue'
import App from './App'
import UIComponents from '@/components/UI'
import router from '@/router/router'
import directives from '@/directives'
import store from '@/store'

const app = createApp(App)

UIComponents.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .use(store)
    .mount('#app')

import { KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                await keycloak.init({
                    config: {
                        url: 'http://p110civitas.img.com.br/sso',
                        realm: 'Civitas',
                        clientId: 'civitas-es',
                        credentials: {
                            secret: "128c6744-a2fb-4e29-9f5b-24a9f0bfac77"
                        },

                    },
                    initOptions: {
                        onLoad: 'login-required',
                        checkLoginIframe: false
                    },
                    bearerExcludedUrls: [
                        '/assets',
                        '/clients/public'
                    ]
                });
                
                resolve();
            } catch (error) {
                reject();
            }
        });
    };
}
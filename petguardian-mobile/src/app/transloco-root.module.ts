import {
  provideTransloco,
  TranslocoModule
} from '@ngneat/transloco';
import { isDevMode, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
import { environment } from 'src/enviroments/enviroments';

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
      provideTransloco({
        config: {
          availableLangs: ['en', 'es', 'cat'],
          defaultLang: 'en',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
  ],
})
export class TranslocoRootModule {}

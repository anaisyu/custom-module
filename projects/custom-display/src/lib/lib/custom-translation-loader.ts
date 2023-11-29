import {delay, map, Observable, of} from "rxjs";
import {TranslationClientService} from "../service/translate/translation-client.service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export class CustomTranslationLoader extends TranslateHttpLoader {
    override getTranslation(lang: string): Observable<Object> {
        return super.getTranslation(lang).pipe(delay(25), map(originalTranslation => {
            return TranslationClientService.merge(originalTranslation, TranslationClientService.changes)
        }));
    }
}

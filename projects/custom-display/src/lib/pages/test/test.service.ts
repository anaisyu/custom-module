import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CustomDisplayElement, DefaultService} from "../../openapi";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TestService {
    constructor(private http: HttpClient, private service: DefaultService) {
    }

    getConfig(id: number = 1): Observable<CustomDisplayElement> {
        return this.service.customIdGet(1).pipe(map(element => {
            element.rows = new Set(Array.from(element.rows).sort((a, b) => {
                return a.displayOrder > b.displayOrder ? 1 : -1
            }));
            element.rows.forEach(row => {
                row.cols = new Set(Array.from(row.cols).sort((a, b) => {
                    return a.displayOrder > b.displayOrder ? 1 : -1
                }))
            })
            console.log(element)
            return element;
        }))
    }

    save(config: CustomDisplayElement) {
        var i = 0;
        console.log(config)

        config.rows.forEach((row) => {
            row.displayOrder = i++;
            var j = 0;
            row.cols.forEach((col) => {
                col.displayOrder = j++;
            })
        })
        //return this.http.post<CustomDisplayElement>(environment.backend_url.replace('/api/art-backend', '') + '/custom/update', config);

        return this.service.updateCustomDisplayElement(this.eachRecursive(config));
    }
    eachRecursive(obj: any)
    {
        for (var k in obj)
        {
            if (obj[k] instanceof Set) {
                obj[k] = Array.from(obj[k]);
            }
            if (typeof obj[k] == "object" && obj[k] !== null)
                obj[k] = this.eachRecursive(obj[k]);
            else {
              obj[k] = obj[k];
            }
        }
        return obj;
    }
}

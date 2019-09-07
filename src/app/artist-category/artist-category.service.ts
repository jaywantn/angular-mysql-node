import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
import { Artist } from './artist';
@Injectable()
export class ArtistCategoryService {
  artistUrl = "http://localhost:3000/artist";
  constructor(private http:Http) { }

  getAllArtist(): Observable<Artist[]> {
    return this.http.get(this.artistUrl+"/get-artist")
                  .map(this.extractData)
             .catch(this.handleError);
             
  }
     //Create article
      createArtist(article: Artist):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.artistUrl+"/create-artist", article, options)
        .map(success => success.status)
        .catch(this.handleError);
      }

          //Fetch article by id
      getArtistById(articleId: string): Observable<Artist> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.artistUrl +"/get-artist-by-id?id="+ articleId);
        return this.http.get(this.artistUrl +"/get-artist-by-id?id="+ articleId)
            .map(this.extractData)
            .catch(this.handleError);
      } 

      //Update article
      updateArtist(article: Artist):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.artistUrl +"/update-artist", article, options)
          .map(success => success.status)
          .catch(this.handleError);
      }

    //Delete article    
    deleteArtistById(articleId: string): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      return this.http.delete(this.artistUrl +"/delete-artist?id="+ articleId)
          .map(success => success.status)
          .catch(this.handleError);
    } 

  private extractData(res: Response) {
        let body = res.json();
        return body;
  }
  private handleError (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.status);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'Zkj0Ajueujpza0I0l94VWYQ4Va8KMitY';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase()

    if (this._tagsHistory.includes(tag)) {//borro el tag anterior
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)// solo deja pasar los diferentes
    }

    this._tagsHistory.unshift(tag);// con esto coloco el tag al inicio
    this._tagsHistory = this._tagsHistory.splice(0,10)
  }

  searchTag(tag: string): void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( resp => {
        this.gifList = resp.data;
        console.log({gifs: this.gifList});
      })
    // this._tagsHistory.unshift(tag);
    // console.log(this._tagsHistory);
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=Zkj0Ajueujpza0I0l94VWYQ4Va8KMitY&q=valorant&limit=10')
    //   .then( resp => resp.json())
    //   .then( data => console.log(data));

  }
}

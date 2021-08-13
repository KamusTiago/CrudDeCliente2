import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DropdownService {

constructor(private http: HttpClient) { }

  getEstadosbr(){
      return this.http.get('//src/assets/dados/estadosBR.json').map((res: Response) => res.json());
  }
}

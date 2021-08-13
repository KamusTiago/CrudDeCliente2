import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs/observable/of";

@Injectable()
export class ConsultaCepService{

    constructor(public http : HttpClient){

    }

    consultaCEP(cep: string){

        //SOMENTE COM DIGITOS
        cep = cep.replace(/\D/g, '');

        //VERIFICA SE CAMPO CEP POSSUI VALOR INFORMADO
        if(cep !== ''){
            //EXPRESSAO REGULAR PARA VALIDAR CEP
            const validacep = /^[0-9]{8}$/;
        

        //VALIDA O FORMATO DO CEP
        if(validacep.test(cep)){
            return this.http.get(`//viacep.com.br/ws/${cep}/json`);       
        }
     }

     return of({});
 }

}
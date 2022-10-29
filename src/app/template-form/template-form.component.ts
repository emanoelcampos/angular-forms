import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: any) {
    console.log(form.value);
    //console.log(this.usuario);
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
        'was-validated': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep : any) {
    console.log(cep)

    cep = cep.replace(/\D/g, ''); //Nova variável "cep" somente com dígitos.

    if (cep != "") { //Verifica se campo cep possui valor informado.
      var validacep = /^[0-9]{8}$/; //Expressão regular para validar o CEP.
       if(validacep.test(cep)) { //Valida o formato do CEP.
        this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(map((dados: any) => dados))
        .subscribe(dados => console.log(dados));
       }
    }
  }
}

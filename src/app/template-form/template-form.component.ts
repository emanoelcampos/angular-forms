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

  consultaCEP(cep : any, form: any) {
    console.log(cep)

    cep = cep.replace(/\D/g, ''); //Nova variável "cep" somente com dígitos.

    if (cep != "") { //Verifica se campo cep possui valor informado.
      var validacep = /^[0-9]{8}$/; //Expressão regular para validar o CEP.
       if(validacep.test(cep)) { //Valida o formato do CEP.

        this.resetaDadosForm(form);

        this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(map((dados: any) => dados))
        .subscribe(dados => this.populaDadosForm(dados, form));
       }
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    // formulario.setValue(
    //   {
    //     nome: formulario.value.nome,
    //     email: formulario.value.email,
    //     endereco: {
    //       cep: dados.cep,
    //       numero: '',
    //       complemento: '',
    //       rua: dados.logradouro,
    //       bairro: dados.bairro,
    //       cidade: dados.localidade,
    //       estado: dados.uf
    //     }
    // });

    formulario.form.patchValue({
      endereco: {
        //cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        //cep: dados.cep,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}

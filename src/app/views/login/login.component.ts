import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  
  userModel = new User();

  mensagem = ""

  receberDados(){
  // Teste SQL

    let errosLogin = 0;
    const listaPalavras: string[] = ["select ", "from ", "drop ", "or ", "having ", "group ", "insert ", "exec ", "\"", "\'", "--", "#", "*", ";"]

    
    listaPalavras.forEach(palavra =>{
      if(this.userModel.email?.toLowerCase().includes(palavra)){
        this.mensagem = "Dados inválidos.";

        errosLogin = 1
      }

      if(this.userModel.password?.toLowerCase().includes(palavra)){
        this.mensagem = "Dados inválidos.";

        errosLogin = 1
      }

    })
    

      // Segue com o teste de user e senha,Caso o teste acima não tenha erros.
      if(errosLogin == 0){
        this.loginService.login(this.userModel).subscribe( (response) => {
          console.log("Deu certo")
          this.mensagem = "Login Efetuado com sucesso!"
          localStorage.setItem("nomeUsuario", response.body.user.nome)
          this.router.navigateByUrl("/")
         
        
          
        },(respostaErro) =>{
        //  Array com os erros  e comparações
          let erros = ['Password is too short','Incorrect password','Email and password are required','Email format is invalid']
          
          if(respostaErro.error=== erros[0]){
            this.mensagem = 'A senha é muito curta'
          }else if(respostaErro.error === erros[1]){
            this.mensagem = 'A senha está incorreta, Tente novamente!'
          }else if(respostaErro.error === erros[2]){
            this.mensagem = 'Email e senha são necessários, Tente novamente!'
          }else if(respostaErro.error === erros[3]){
            this.mensagem = 'Esse formato de Email é inválido, Tente novamente!'
          }else{
            this.mensagem = 'Houve algum erro, Tente novamente.'
          }
          
        })
        

      }

  }

}

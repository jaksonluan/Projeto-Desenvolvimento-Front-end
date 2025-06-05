import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {

  // Simulando usuários em um "banco de dados"
  private usuariosFake = [
    { email: 'teste@teste.com', senha: '123456' },
    { email: 'admin@admin.com', senha: 'admin' }
  ];

  private usuarioLogado: any = null;

  constructor() {}

  login(email: string, senha: string): boolean {
    const usuarioEncontrado = this.usuariosFake.find(user =>
      user.email === email && user.senha === senha
    );

    if (usuarioEncontrado) {
      this.usuarioLogado = usuarioEncontrado;
      return true;
    }

    return false;
  }

  register(email: string, senha: string): boolean {
    // Verifica se já existe usuário com esse email
    if (this.usuariosFake.some(user => user.email === email)) {
      return false; // já existe, não registra
    }
    // Adiciona novo usuário
    this.usuariosFake.push({ email, senha });
    return true;
  }

  logout() {
    this.usuarioLogado = null;
  }

  isLogado(): boolean {
    return this.usuarioLogado !== null;
  }

  getUsuario(): any {
    return this.usuarioLogado;
  }
}


import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListaService, Tarefa } from '../../services/lista-service';
import { MatTableModule } from '@angular/material/table';
// Se for usar mat-select no template:
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-lista',
  
imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    ButtonModule,
    InputTextModule,
    MatFormFieldModule, // 👈 necessário para <mat-form-field>
    MatSelectModule     // 👈 necessário para <mat-select> e <mat-option>
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  private service = inject(ListaService);

  novoTitulo = '';
  tarefas: Tarefa[] = [];
  colunas = ['titulo', 'status', 'acoes'];

  // Torna a confirmação de exclusão opcional
  confirmarExclusao = true;

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.service.listar().subscribe({
      next: (dados) => (this.tarefas = dados),
      error: (erro) => console.error('Erro:', erro),
    });
  }

  salvar() {
    const titulo = this.novoTitulo?.trim();
    if (!titulo) return;

    this.service.adicionar(titulo).subscribe({
      next: () => {
        this.carregarTarefas();
        this.novoTitulo = '';
      },
      error: (erro) => console.error('Erro ao adicionar:', erro),
    });
  }

  // Atualiza o status (true/false) usando update otimista
  atualizarStatus(tarefa: Tarefa, novoStatus: boolean) {
    // Update otimista na UI
    const anterior = tarefa.concluida;
    tarefa.concluida = novoStatus;

    this.service.atualizarStatus(tarefa.id, novoStatus).subscribe({
      next: () => {
        // opcional: toast/sucesso
      },
      error: (erro) => {
        // rollback em caso de erro
        tarefa.concluida = anterior;
        console.error('Erro ao atualizar status:', erro);
      },
    });
  }

  // Exclusão direta
  deletar(id: string) {
    this.service.remover(id).subscribe({
      next: () => this.carregarTarefas(),
      error: (erro) => console.error('Erro ao remover:', erro),
    });
  }

  // Confirmação de exclusão (opcional)
  confirmarDelete(tarefa: Tarefa) {
    const ok = confirm(`Excluir a tarefa "${tarefa.titulo}"?`);
    if (ok) this.deletar(tarefa.id);
  }
}

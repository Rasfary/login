import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, DragDropModule, DropListRef, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListaService, Tarefa } from '../../services/lista-service';
import { CdkAriaLive } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DragDropModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  todo: Tarefa[] = [];
  done: Tarefa[] = [];

  private service = inject(ListaService);
  ngOnInit(): void {
    this.service.listar().subscribe(tarefas=> {
      this.todo = tarefas.filter(t => !t.concluida);
      this.done = tarefas.filter(t => t.concluida);
    });
  }
  drop(event: CdkDragDrop<Tarefa[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }
    const tarefa = event.previousContainer.data[event.previousIndex];  
    const concluida = event.container.id === 'done'; 

}
}

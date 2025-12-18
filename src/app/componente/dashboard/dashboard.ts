
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListaService, Tarefa } from '../../services/lista-service';

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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.service.listar().subscribe(tarefas => {
      this.todo = tarefas.filter(t => !t.concluida);
      this.done = tarefas.filter(t => t.concluida);
      this.cdr.detectChanges();
    });
  }

  drop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }

    const tarefa = event.previousContainer.data[event.previousIndex];
    const concluida = event.container.id === 'done';

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    tarefa.concluida = concluida;
    this.service.atualizar(tarefa, concluida).subscribe();
  }

  // ✅ Método necessário para o trackBy no template
  trackById(index: number, item: Tarefa): number | string {
    // Ajuste conforme o seu modelo Tarefa.
    // Ideal: retornar um ID único. Como fallback, usamos título ou o index.
    return (item as any).id ?? item.titulo ?? index;
  }
}

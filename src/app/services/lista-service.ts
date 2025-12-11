
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tarefa {
  id: string;
  titulo: string;
  data: string;       // ISO string (ex.: '2025-12-10T12:34:56.000Z')
  concluida: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private http = inject(HttpClient);
  // endpoint
  private apiurl = 'http://localhost:3000/tarefas';

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiurl);
  }

  adicionar(titulo: string): Observable<Tarefa> {
    // Se quiser registrar data de criação:
    const agoraISO = new Date().toISOString();
    const novaTarefa = {
      titulo,
      concluida: false,
      data: agoraISO, // opcional, depende do backend
    };
    return this.http.post<Tarefa>(this.apiurl, novaTarefa);
  }

  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }

  /**
   * Atualiza somente o campo 'concluida' da tarefa.
   * Use PATCH quando você alterar campos parciais.
   */
  atualizarStatus(id: string, concluida: boolean): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.apiurl}/${id}`, { concluida });
  }

  /**
   * (Opcional) Atualização completa de uma tarefa via PUT:
   * útil se você quiser enviar todo o objeto.
   */
  atualizarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiurl}/${tarefa.id}`, tarefa);
  }
}

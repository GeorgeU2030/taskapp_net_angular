import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TareaService } from './services/tarea.service';
import { Tarea } from './interfaces/tarea';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'apptask';

  listaTareas:Tarea[] = [];
  formulariotarea:FormGroup;
  
  constructor(
    private tareaservicio:TareaService,
    private fb:FormBuilder)
    {
      this.formulariotarea= this.fb.group({
        nombre:['',Validators.required]
      })
    }

  obtenertareas(){
    this.tareaservicio.getList().subscribe({
      next:(data) =>{
        this.listaTareas = data;
      }
    })
  } 

  ngOnInit(): void {
      this.obtenertareas();
  }

  agregarTarea(){
    const request:Tarea = {
      idTarea :0,
      nombre:this.formulariotarea.value.nombre
    } 
    this.tareaservicio.add(request).subscribe({
      next:(data) =>{
        this.listaTareas.push(data)
        this.formulariotarea.patchValue({
          nombre:""
        })
      }
    })

  }

  eliminarTarea(tarea:Tarea){
    this.tareaservicio.delete(tarea.idTarea).subscribe({
      next:(data) =>{
        const nuevaLista = this.listaTareas.filter(Item => Item.idTarea !=tarea.idTarea)
        this.listaTareas = nuevaLista
      }
    })
  }
}

import { CommonModule} from '@angular/common';
import  {ReactiveFormsModule, FormBuilder, FormGroup, FormsModule,FormControl
  , FormArray,Validators
} from '@angular/forms'
import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen = false; // Propiedad para controlar la visibilidad del modal
  @Output() onclose = new EventEmitter<any>();

  profileForm!: FormGroup;
  fire = inject(FireService);


 

  constructor(private fb: FormBuilder){
    this.profileForm = new FormGroup({
      strMeal: new FormControl<string>('',Validators.required),
      strMealThumb: new FormControl<string>(''),
      strInstructions: new FormControl<string>(''),
      strYoutube: new FormControl<string>(''),
      strIngredient: new FormControl<string>(''),
    });
  }



  

  onSubmit() {
    if (this.profileForm.valid) {
      // Procesar el formulario
      console.log(this.profileForm.value);
      this.fire.createRecipe(this.profileForm.value);
      this.profileForm.reset();
      this.onclose.emit(null);
    }
  }


  closeModal() {
    history.back();
  }

  // Escucha la tecla "Escape" para cerrar el modal
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  // Método para cerrar el modal al hacer clic en el fondo
  handleBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('bg-black')) {
      this.closeModal();
    }
  }

  // Escucha cambios en el historial del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onclose.emit(null);
  }
}

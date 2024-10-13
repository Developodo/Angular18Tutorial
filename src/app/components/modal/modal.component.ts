import { CommonModule} from '@angular/common';
import  {ReactiveFormsModule, FormBuilder, FormGroup, FormsModule,FormControl
  , FormArray,Validators
} from '@angular/forms'
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

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
  imageSourceControl = new FormControl(''); // Control para la fuente de la imagen
  imageData: string | null = null; // Almacena el string de la imagen
  isCameraActive = false; // Para controlar si la cámara está activa

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>; // Elemento video
  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>; // Elemento canvas

 

  constructor(private fb: FormBuilder){
    this.profileForm = new FormGroup({
      strMeal: new FormControl<string>('',Validators.required),
      strMealThumb: new FormControl<string>(''),
      strInstructions: new FormControl<string>(''),
      strYoutube: new FormControl<string>(''),
      strIngredient: new FormControl<string>(''),
    });
  }

  onSourceChange(event: Event) {
    const source = (event.target as HTMLSelectElement).value;
    this.imageSourceControl.setValue(source);

    if (source === 'camera') {
      this.openCamera();
    } else if (source === 'explorer') {
      this.fileInput.nativeElement.click();
      this.stopCamera(); // Asegúrate de detener la cámara si se elige el explorador
    }
  }

  openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.isCameraActive = true;
        const video = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara:", error);
      });
  }

  capturePhoto() {
    if (!this.canvasElement || !this.videoElement) {
      console.error('Los elementos de video o canvas no están disponibles.');
      return;
    }

    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;

    canvas.width = video.videoWidth; // Ajustar el ancho
    canvas.height = video.videoHeight; // Ajustar la altura

    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, canvas.width, canvas.height); // Tomar la foto

    // Convertir la imagen a Data URL y guardarla como string
    this.imageData = canvas.toDataURL('image/png');
    this.stopCamera(); // Detener la cámara después de tomar la foto

    // Guardar el string en el control del formulario
    this.profileForm.get('strMealThumb')?.setValue(this.imageData);
  }

  stopCamera() {
    if (this.videoElement.nativeElement.srcObject) {
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Detener todos los tracks
      this.videoElement.nativeElement.srcObject = null; // Limpiar el srcObject
      this.isCameraActive = false; // Actualizar estado
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string; // Guardar el string de la imagen
        this.profileForm.get('strMealThumb')?.setValue(this.imageData); // Guardar el string en el control del formulario
        this.stopCamera(); // Asegúrate de detener la cámara si se selecciona una foto
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.imageData = null; // Limpiar la imagen
    this.fileInput.nativeElement.value = ''; // Resetear el input
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Procesar el formulario
      console.log(this.profileForm.value);
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

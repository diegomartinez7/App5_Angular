import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  //Variable para almacenar mi nuevo formulario
  form: FormGroup;

  //Getters de los controles
  get validNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get validApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get validCorreo(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  //Getters para controles dentro de un FormGroup
  get validEstado(){
    return this.form.get('direccion.estado').invalid && this.form.get('direccion.estado').touched;
  }

  get validMun(){
    return this.form.get('direccion.municipio').invalid && this.form.get('direccion.municipio').touched;
  }

  //Getters para un FormArray
  get arrayPasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }

  constructor(private fb: FormBuilder, private CustomVal: ValidationService) {
    this.crearForm();
  }

  //Getters para Password (Validación personalizada)
  get Pass1(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }
  
  get Pass2(){
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return (pass1 === pass2)? false : true;
  }

  ngOnInit(): void {
  }

  crearForm(){
    this.form = this.fb.group({
      //El primer valor ('') representa el valor por defecto de cada control
      //Como segundo valor estaremos agregando las validaciones
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4), this.CustomVal.NoDiego]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      /*nombre: ['Diego', [Validators.required, Validators.minLength(4)]],
      apellido: ['Bernal', [Validators.required, Validators.minLength(4)]],
      correo: ['diego_marz@hotmail.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],*/
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        estado: ['', [Validators.required, Validators.minLength(4)]],
        municipio: ['', [Validators.required, Validators.minLength(4)]]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.CustomVal.matchPassword('pass1','pass2')
    });
  }

  enviar(){
    console.log(this.form);
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        if(control instanceof FormGroup){
          return Object.values(control.controls).forEach(control => control.markAsTouched());
        }
        else{
          control.markAsTouched();
        }
      })
    }
  }

  //Para agregar elementos al FormArray
  newControl(){
    //this.arrayPasatiempos.?push(this.fb.control('', Validators.required));
    this.arrayPasatiempos.push(this.fb.control('', Validators.required));
  }

  //Para borrar el control seleccionado del FormArray
  removeControl(id: number){
    this.arrayPasatiempos.removeAt(id);
  }
}

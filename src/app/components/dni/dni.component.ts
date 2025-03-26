//import { CommonModule } from '@angular/common';
//import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dni',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dni.component.html',
  styleUrl: './dni.component.css'
})
export class DniComponent {

  titulo!: string;//!
  numero: number | null;//UNION TYPE "varios tipos"
  letra: string;
  prefijo: string;

  //readonly -- "Constante"
  //static -- sólo hay uno, compartido por todas las instancias, a nivel de CLase
  static readonly SECUENCIA_LETRAS_DNI: string = "TRWAGMYFPDXBNJZSQVHLCKE"

  constructor() {
    console.log("Estamos en el constrctor");
    this.titulo = "CALCULO DE SU LETRA DE DNI"
    this.letra = "";
    this.numero = null
    //DniComponent.SECUENCIA_LETRAS_DNI = "33"
    this.prefijo = ""
  }

  ngOnInit(): void {
    console.log("Estamos en ngOnInit");

  }

     /**
    * Los NIE's de extranjeros residentes en España tienen una letra (X, Y, Z), 7 números y dígito de control.
 Para el cálculo del dígito de control se sustituye:
 
 X → 0
 Y → 1
 Z → 2
 y se aplica el mismo algoritmo que para el NIF.
    */
  calcularLetraDni() {

    let numeroaux:number=0;
    console.log("Estamos en calcularLetraDni");
    //console.log("El valor del numero es = " + this.numero);
    //Operador plantilla Template String JS
    console.log(`El valor del numero es =  ${this.numero}`);

 
    numeroaux =  parseInt("" + this.numero);
    if (this.prefijo == "y") {
      numeroaux = parseInt("" + 1 + this.numero)
    } else if (this.prefijo == "z") {
      numeroaux = parseInt("" + 2 + this.numero)
    }
    //si es una z o nada, pues estamos en el caso "normal"
    
    let modulo = numeroaux % DniComponent.SECUENCIA_LETRAS_DNI.length
    this.letra = DniComponent.SECUENCIA_LETRAS_DNI.charAt(modulo)
    console.log(`Su letra es ${this.letra}`);
      //window.alert(`Su letra es ${this.letra}`);
    
  }

  cambioRadioLetra(evento: Event) {
    console.log("Estamos en cambioRadioLetra " + evento.target);
    let radio_selecccionado: HTMLInputElement = <HTMLInputElement>evento.target;//casting
    //let radio_selecccionado : HTMLInputElement = evento.target as HTMLInputElement;//casting
    console.log("Estamos en cambioRadioLetra " + radio_selecccionado.id);

    this.prefijo = radio_selecccionado.id;

  }

}

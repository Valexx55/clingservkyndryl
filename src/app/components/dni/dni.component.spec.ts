import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DniComponent } from './dni.component';

describe('DniComponent', () => {
  let componentDni: DniComponent;
  let fixture: ComponentFixture<DniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DniComponent);
    componentDni = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentDni).toBeTruthy();
  });

  it('dni español', () => {
    componentDni.numero = 53130984;
    componentDni.prefijo = "sin";
    componentDni.calcularLetraDni();
    expect(componentDni.letra).toBe("H");
   

  });

  it('letra mostrada', () => {
    componentDni.numero = 53130984;
    componentDni.prefijo = "sin";
    //fixture.detectChanges();
    componentDni.calcularLetraDni();
    fixture.detectChanges();
    //const compiled = fixture.nativeElement as HTMLElement;
    expect(fixture.nativeElement.querySelector('#cajaLetra')?.innerHTML).toContain('Su letra')

  });

  
  
});
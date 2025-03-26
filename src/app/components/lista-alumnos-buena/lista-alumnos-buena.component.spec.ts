import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnosBuenaComponent } from './lista-alumnos-buena.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '../../app.routes';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../model/alumno';
import { authInterceptor } from '../../services/auth.interceptor';

describe('ListaAlumnosBuenaComponent', () => {
  let component: ListaAlumnosBuenaComponent;
  let fixture: ComponentFixture<ListaAlumnosBuenaComponent>;
  let alumnoService:AlumnoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlumnosBuenaComponent],
      providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(withInterceptors([authInterceptor]))]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosBuenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    alumnoService = TestBed.inject(AlumnoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test integracion servicio alumnos sin credenciales', (done:DoneFn) => {
    component.alumnoService.listadoAlumnos().subscribe(
      {
        next:(la:Array<Alumno>) => {
          console.log('Respuesta correcta del servidor');
          component.listaAlumnos = la;
          fixture.detectChanges();
         
          let diva = fixture.nativeElement.querySelector('.listaAlumnos') as HTMLDivElement
          
          expect(diva.children.length).toBeGreaterThan(0)
          expect(component.listaAlumnos.length).toBeGreaterThan(0)
          done();//llamo a esta f() al terminar la comunicación remota en test
        },

        error: (error) => {
          console.log("ERROR " + error);
          expect(error).toBeTruthy();
          done();//sólo se puede llamar una vez a done()
        },
        complete: () => {
          console.log("completada");
          //done();
        }

      }
    )
  });
});

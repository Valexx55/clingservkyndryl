import { Alumno } from './alumno';

describe('Alumno', () => {
  it('should create an instance', () => {
    expect(new Alumno()).toBeTruthy();
  });

  it('alumno inicial edad 0', () => {
    let alumno = new Alumno()
    expect(alumno.edad).toEqual(0);
  });
});

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from '../../models/contacto';
import { ContactosService } from '../../services/contactos.service';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {
  Titulo = 'Contactos';
  Contactos: Contacto[];
  FormContacto: FormGroup;
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC = 'L';
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private contactosService: ContactosService,
    private modalDialogService: ModalDialogService
  ) {
    this.Contactos = [];
  }

  ngOnInit() {
    this.FormContacto = this.formBuilder.group({
      Nombre: ['', [Validators.required, Validators.maxLength(50)]],
      FechaNacimiento: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          ),
        ],
      ],
      Telefono: ['', [Validators.required, Validators.pattern('[0-9]{7}')]],
    });
  }

  Buscar() {
    this.AccionABMC = 'L';
    this.contactosService
      .get()
      .subscribe((contactos) => (this.Contactos = contactos));
  }
  Agregar() {
    this.AccionABMC = 'A';
  }

  Guardar() {
    this.submitted = true;
    if (this.FormContacto.errors) {
      return;
    }
    const formCopy = { ...this.FormContacto.value };
    const arrFecha = formCopy.FechaNacimiento.substr(0, 10).split('/');
    formCopy.FechaNacimiento = new Date(
      arrFecha[2],
      arrFecha[1] - 1,
      arrFecha[0]
    ).toISOString();

    if (this.AccionABMC == 'A') {
      this.contactosService.post(formCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
    }
  }

  Consultar(item: Contacto) {
    this.AccionABMC = 'C';
    this.FormContacto.patchValue(item);
    const arrFecha = item.FechaNacimiento.substr(0, 10).split('-');
    this.FormContacto.controls.FechaNacimiento.patchValue(
      `${arrFecha[2]}/${arrFecha[1]}/${arrFecha[0]}`
    );
  }

  Volver() {
    this.AccionABMC = 'L';
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Producto} from "../../models/Producto.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Categoria} from "../../models/Categoria.model";
import {categorias} from "../../helpers/categorias";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() edit: boolean;
  @Input() form!: FormGroup;

  categorias: Categoria[] = categorias;
  constructor(config: NgbModalConfig,
              public activeModal: NgbActiveModal,
              private toastr: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.edit = false;
  }

  ngOnInit(): void {
  }

  guardar() {
    if (this.form.invalid) {
      this.toastr.error('Formulario inválido');
      return;
    }
    this.activeModal.close(this.form);
  }

}

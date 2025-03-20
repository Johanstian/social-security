import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  

  displayedColumns: string[] = ['IngresoBaseCotización', 'Pensión', 'Salud', 'Riesgo', 'Total'];
  selectedValue: number | null = null;
  options: number[] = [1, 2, 3];
  dataSource: any
  dataForm!: FormGroup;
  result: any = 0;
  pension: any = 0;
  salud: any = 0;
  riesgo: any = 0;
  total: any = 0;
  color!: 'secondary';
  panelOpenState = false;
  adjust: boolean = false;
  arl: any;


  salary: any;
  isChecked: boolean = false;
  faltante: any;
  salarypaid: any;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      salary: ['', Validators.required],
      risk: ['', Validators.required],
      pensionado: ['']
    })
  }

  calculate() {
    const salary = this.salary;
    this.result = salary * 0.4 < 1423500 ? 1423500 : salary * 0.4;
    const basePension = salary * 0.4 < 1423500 ? 1423500 : salary * 0.4;
    this.pension = Math.ceil(basePension * 0.16 / 100) * 100;
    const baseSalud = salary * 0.4 < 1423500 ? 1423500 : salary * 0.4;
    this.salud = Math.ceil(baseSalud * 0.125 / 100) * 100;
    if (this.arl == 1) {
      this.riesgo = Math.ceil(basePension * 0.00522 / 100) * 100;
      this.total = this.pension + this.salud + Math.ceil(basePension * 0.00522 / 100) * 100;
    }
    else if (this.arl == 2) {
      this.riesgo = Math.ceil(basePension * 0.01044 / 100) * 100;;
      this.total = this.pension + this.salud + Math.ceil(basePension * 0.01044 / 100) * 100;
    } else {
      this.riesgo = Math.ceil(basePension * 0.02436 / 100) * 100;;
      this.total = this.pension + this.salud + Math.ceil(basePension * 0.02436 / 100) * 100;
    } if (this.isChecked == true) {
      this.total -= this.pension;
      this.pension = 0;
    }
  }

  onCheckboxChange() {
    console.log('Checkbox is checked:', this.isChecked);
  }

  clean() {
    this.dataForm.reset();
    this.result = undefined;
    this.salary = '';
    this.arl = '';
  }

  adjustSalary() {
    console.log('ad', this.adjust)
  }


  recalculate() {
    const salarypaid = this.salarypaid;
    this.result = salarypaid * 0.4 < 1423500 ? 1423500 : salarypaid * 0.4;
    const basePension = salarypaid * 0.4 < 1423500 ? 1423500 : salarypaid * 0.4;
    this.pension = Math.ceil(basePension * 0.16 / 100) * 100;
    const baseSalud = salarypaid * 0.4 < 1423500 ? 1423500 : salarypaid * 0.4;
    this.salud = Math.ceil(baseSalud * 0.125 / 100) * 100;
    if (this.arl == 1) {
      this.riesgo = Math.ceil(basePension * 0.00522 / 100) * 100;
      this.total = this.pension + this.salud + Math.ceil(basePension * 0.00522 / 100) * 100;
    }
    else if (this.arl == 2) {
      this.riesgo = Math.ceil(basePension * 0.01044 / 100) * 100;;
      this.total = this.pension + this.salud + Math.ceil(basePension * 0.01044 / 100) * 100;
    } else {
      this.riesgo = Math.ceil(basePension * 0.02436 / 100) * 100;;
      this.total = this.pension + this.salud + Math.ceil(basePension * 0.02436 / 100) * 100;
    } if (this.isChecked == true) {
      this.total -= this.pension;
      this.pension = 0;
    }

    const totalToPay = this.pension + this.salud + this.riesgo;
    this.faltante = totalToPay - this.total;
  }

}

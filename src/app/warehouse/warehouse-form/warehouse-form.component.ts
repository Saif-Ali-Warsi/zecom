import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { WarehouseService } from '../../core/services/warehouse.service';
import { Router } from '@angular/router';
import { Warehouse } from '../../core/models/warehouse.model';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './warehouse-form.component.html',
  styleUrl: './warehouse-form.component.scss'
})
export class WarehouseFormComponent implements OnInit {

  isEdit = false;
  warehouseId!: string;

  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    location: new FormControl<string>('', Validators.required),
    capacity: new FormControl<number>(0, [Validators.required, Validators.min(1)])
  });

  constructor(private warehouseService: WarehouseService, private router: Router, private route: ActivatedRoute) { }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const formValue = this.form.value;

    const warehouseData: Warehouse = {
      id: this.warehouseId || Date.now().toString(),
      name: formValue.name || '',
      location: formValue.location || '',
      capacity: formValue.capacity || 0
    }

    if (this.isEdit) {
      this.warehouseService.updateWarehouse(this.warehouseId, warehouseData).subscribe(() => {
        this.router.navigate(['/warehouses']);
      });
    } else {
      this.warehouseService.addWarehouse(warehouseData).subscribe(() => {
        this.router.navigate(['/warehouses'])
      });

    }


  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.warehouseId = id;

      this.warehouseService.getWarehouseById(this.warehouseId).subscribe((warehouse) => {
        this.form.patchValue(warehouse);
      });
    }
  }
}

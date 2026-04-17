import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { WarehouseService } from '../../core/services/warehouse.service';
import { Router } from '@angular/router';
import { Warehouse } from '../../core/models/warehouse.model';

@Component({
  selector: 'app-warehouse-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './warehouse-form.component.html',
  styleUrl: './warehouse-form.component.scss'
})
export class WarehouseFormComponent {

  form = new FormGroup({
    name: new FormControl<string>(''),
    location: new FormControl<string>(''),
    capacity: new FormControl<number>(0)
  });

  constructor(private warehouseService: WarehouseService, private router: Router) { }

  submit() {
    const formValue = this.form.value;

    const newWarehouse: Warehouse = {
      id: Date.now(),
      name: formValue.name || '',
      location: formValue.location || '',
      capacity: formValue.capacity || 0
    }

    this.warehouseService.addWarehouse(newWarehouse).subscribe(() => {
      this.router.navigate(['/warehouses'])
    })
  }
}

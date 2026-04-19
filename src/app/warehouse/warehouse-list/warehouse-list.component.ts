import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseService } from '../../core/services/warehouse.service';
import { Warehouse } from '../../core/models/warehouse.model';
import { RouterLink } from "@angular/router";
import { Subject } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss'
})
export class WarehouseListComponent implements OnInit {

  searchSubject = new Subject<string>();

  warehouses: Warehouse[] = [];


  constructor(private warehouseService: WarehouseService) { }



  ngOnInit() {
    this.loadWarehouses();

    this.searchSubject.pipe(
      debounceTime(300),
      switchMap((searchTerm) => {
        return this.warehouseService.getWarehouses()
          .pipe(map((warehouse) => warehouse.filter
            (w => w.name.toLowerCase().includes(searchTerm.toLowerCase()))))

      })
    ).subscribe((data) => {
      this.warehouses = data;
    })
  }

  onSearch(event: any) {
    const value = event.target.value;
    this.searchSubject.next(value);
  }


  loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe((data) => {
      this.warehouses = data;
    })
  }

  deleteWarehouse(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.warehouseService.deleteWarehouse(id).subscribe(() => {
        this.loadWarehouses();


      });
    }
  }

}

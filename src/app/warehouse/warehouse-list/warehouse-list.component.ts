import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseService } from '../../core/services/warehouse.service';
import { Warehouse } from '../../core/models/warehouse.model';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss'
})
export class WarehouseListComponent implements OnInit {

  warehouses: Warehouse[] = [];


  constructor(private warehouseService: WarehouseService) { }




  ngOnInit() {
    this.loadWarehouses()
  }


  loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe((data) => {
      this.warehouses = data;
    })
  }


}

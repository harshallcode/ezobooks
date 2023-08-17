import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrls: ['./shop-dashboard.component.scss'],
})
export class ShopDashboardComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  itemList: any;

  ngOnInit(): void {
    this.apiService.makeGetRequest().subscribe((data: any) => {
      this.itemList = data.items.slice(0, 2000);
    });
  }
}

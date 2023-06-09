import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/model/orders';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  p: number = 1;
  orders: Orders[] = [];

  customers: any = [];

  total: number = 0;

  ordersDetailList: Orders[] = [];
  

  constructor(private cartService: CartService) {

  }


  updateOrdersDetailList(o: Orders) {
      let odId = o.orderDetailId;
      let indexOrdersDetail = this.ordersDetailList.findIndex(item => item.orderDetailId === odId);

      if(indexOrdersDetail > -1) {
            this.ordersDetailList.splice(indexOrdersDetail, 1);
            if(o.total)
              this.total -= o.total;
      } else {
        if(odId)
          this.ordersDetailList.push(o);
          if(o.total)
              this.total += o.total;
      }
      console.log(this.ordersDetailList);
  }


  ngOnInit(): void {
    this.cartService.getAllCustomerHasOrder().subscribe(data => {
      this.customers = data;
      for(let c of data) {
        this.changeOrderByCustomerIdFirst(c.customerId)
        break;
      }
      
    });
  }

  

  changeOrderByCustomerId(id: number, e: any) {

      const eBtnChangeds = document.querySelectorAll('.btn-change');
      eBtnChangeds.forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');


      this.cartService.getAllOrdersByCutomerID(id).subscribe(data => {
        this.orders = data;
        console.log(data)
      });
      this.total = 0;
      this.ordersDetailList = [];
  }

  changeOrderByCustomerIdFirst(id: number): void {
    this.cartService.getAllOrdersByCutomerID(id).subscribe(data => {
      this.orders = data;
      console.log(data)
    });
  }


  upQuality(orders: Orders) {
    console.log(orders);
    
    if(orders.quantity && orders.orderDetailId) {
      orders.quantity += 1;

      this.cartService.updateQuantity(orders.orderDetailId, orders.quantity).subscribe(ordersDetail => {
        console.log(ordersDetail)
        orders.total = ordersDetail.total;
      })
    }
  }

  dowQuantity(orders: Orders) {
    console.log(orders);
    
    if(orders.quantity && orders.orderDetailId) {
      orders.quantity -= 1;

      this.cartService.updateQuantity(orders.orderDetailId, orders.quantity).subscribe(data => {
        console.log(data)
        orders.total = data.total;
      })
    }
  }

  dowQuality(ordersDetailId: number) {
    console.log(ordersDetailId);
  }


  deleteOrderDetail(orderDetailId: number) {

    this.cartService.deleteOrdersDetail(orderDetailId).subscribe(data => {
       this.orders.forEach((item, index, arr) => {
          if(item.orderDetailId == data) {
            arr.splice(index, 1);
          }
       });
    });
  }

  pallAll() {
    this.ordersDetailList.forEach(od => {
      if(od.orderDetailId)
        this.deleteOrderDetail(od.orderDetailId);
    });
    
    this.ordersDetailList = [];
    this.total = 0;
  }


}

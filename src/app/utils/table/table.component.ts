import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input('data') data: any = [];
  @Input('options') toptions: any = {};
  @Input('currentPage') currentPage: number = 0;
  @Input('pageSize') pageSize: number = 25;
  @Input('total') dataTotal: number = 6;
  
  @Output('setPage') setPage = new EventEmitter<number>();
  
  lastPage:number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getLastPage();
  }

  ngOnChanges(): void {
  }

  getLastPage(): void {
    var t = this.dataTotal / this.pageSize;

    if (t > Math.floor(t)) {
      t = Math.floor(t) + 1;
    }

    this.lastPage = t - 1;
  }

  updatePage(page: number): void {
    let newPage = this.currentPage;

    if (
      (
        this.currentPage > 0 &&
        page == -1
      ) ||
      (
        this.currentPage >= 0 &&
        page == 1 && 
        this.currentPage < this.lastPage
      )
    ) {
      newPage += page;
    }

    this.setPage.emit(newPage);
  }

  isColVisible(content: any): boolean {
    return (content.visible == undefined || content.visible === true) && Object.keys(content).length > 0;
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @Output() public normal = new EventEmitter<boolean>();
  @Output() public topo = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

}

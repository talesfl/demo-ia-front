import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-toolbar',
  templateUrl: './demo-toolbar.component.html',
  styleUrls: ['./demo-toolbar.component.scss']
})
export class DemoToolbarComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}

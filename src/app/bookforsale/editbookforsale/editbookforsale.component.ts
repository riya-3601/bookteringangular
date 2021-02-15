import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookforsaleService } from "src/app/bookforsale.service";
import { CategoryService } from "src/app/category.service";
import { Cat } from "src/app/category/cat";
import { Bfs } from "../bfs";
@Component({
  selector: 'app-editbookforsale',
  templateUrl: './editbookforsale.component.html',
  styleUrls: ['./editbookforsale.component.css']
})
export class EditbookforsaleComponent implements OnInit {
  book_id=1;
  cat:Cat[]=[];
  applicant: any;

  constructor() { }

  ngOnInit(): void {
  }

}

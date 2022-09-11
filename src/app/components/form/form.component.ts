import { Component, OnInit } from '@angular/core';

import {NbuStatService} from "../../services/nbu-stat.service";

import {INbuStat} from "../../models/nbuStat";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  input_1 = 0
  input_2 = 0

  selected1:string = 'UAH'
  selected2:string = 'UAH'

  nbuStat:INbuStat[] = []
  currenciesStat:{[key: string]: number}= { 'UAH': 1 }

  selectOptions:string[] = []




  constructor(private nbuStatService:NbuStatService) { }

  ngOnInit() {
    this.nbuStatService.getAll().subscribe((data) => {

      this.nbuStat = data.filter((item) => item.cc==="USD" || item.cc === "EUR" || item.cc==="CAD")

      this.nbuStat.map((item) => this.currenciesStat[item.cc ] = item.rate)

      this.selectOptions = Object.keys(this.currenciesStat)
    })
  }

  format(number:number):number {
    return +number.toFixed(2)
  }

  onInput_1(event:Event){
    const target = event.target as HTMLInputElement;

    this.input_1 = this.format(+target.value)

    if (this.selected1==='UAH'){
      this.input_2 = this.format(+target.value/this.currenciesStat[this.selected2])

    }else if (this.selected2==='UAH'){
      this.input_2 = this.format(+target.value*this.currenciesStat[this.selected1])

    }else{
      this.input_2 = this.format(+target.value*this.currenciesStat[this.selected1]/this.currenciesStat[this.selected2])
    }
  }

  onChange1(event:Event){
    const target = event.target as HTMLInputElement

    if(target.value===this.selected2){
      this.input_1 = this.format(this.input_2)

    }else if (target.value==='UAH'){
      this.input_1 = this.format(this.input_2*this.currenciesStat[this.selected2])

    }else{
      this.input_1 = this.format((this.currenciesStat[this.selected2]/this.currenciesStat[target.value])*this.input_2)
    }
  }

  onInput_2(event:Event){
    const target = event.target as HTMLInputElement

    this.input_2 = +target.value

    if (this.selected2==='UAH'){
      this.input_1 = this.format(+target.value/this.currenciesStat[this.selected1])

    }else if (this.selected1==='UAH'){
      this.input_1 = this.format(+target.value*this.currenciesStat[this.selected2])

    }else{
      this.input_1 = this.format(+target.value*this.currenciesStat[this.selected2]/this.currenciesStat[this.selected1])
    }
  }

  onChange2(event:Event){
    const target = event.target as HTMLInputElement

    if(target.value===this.selected1){
      this.input_2 = this.format(this.input_1)

    }else if (target.value==='UAH'){
      this.input_2 = this.format(this.currenciesStat[this.selected1]*this.input_1)

    }else{
      this.input_2 = this.format((this.currenciesStat[this.selected1]/this.currenciesStat[target.value])*this.input_1)
    }
  }
}

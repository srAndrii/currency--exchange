import { Component, OnInit } from '@angular/core'

import { NbuStatService } from '../../services/nbu-stat.service'

import { INbuStat } from '../../models/nbuStat'

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    input_1 = 0
    input_2 = 0

    selected_1: string = 'UAH'
    selected_2: string = 'USD'

    nbuStat: INbuStat[] = []

    constructor(private nbuStatService: NbuStatService) {}

    ngOnInit() {
        this.nbuStatService.getAll().subscribe((data) => {
            this.nbuStat = [
                ...data.filter((item) => item.cc === 'USD' || item.cc === 'EUR' || item.cc === 'CAD'),
                { cc: 'UAH', rate: 1 },
            ]
        })
    }

    format(number: number): number {
        return +number.toFixed(2)
    }

    onCurrency_1(event: Event) {
        const target = event.target as HTMLInputElement

        const value1 = this.nbuStat.filter((item) => item.cc === this.selected_2)
        const value2 = this.nbuStat.filter((item) => item.cc === this.selected_1)

        if (!isNaN(+target.value)) {
            this.input_1 = this.format(+target.value)
            this.input_2 = this.format((this.input_1 * value2[0].rate) / value1[0].rate)
        }
        if (target.value === this.selected_1) {
            this.input_1 = this.format((value1[0].rate / value2[0].rate) * this.input_2)
        }
    }

    onCurrency_2(event: Event) {
        const target = event.target as HTMLInputElement

        const value1 = this.nbuStat.filter((item) => item.cc === this.selected_2)
        const value2 = this.nbuStat.filter((item) => item.cc === this.selected_1)

        if (!isNaN(+target.value)) {
            this.input_2 = this.format(+target.value)
            this.input_1 = this.format((this.input_2 * value1[0].rate) / value2[0].rate)
        }
        if (target.value === this.selected_2) {
            this.input_2 = this.format((value2[0].rate / value1[0].rate) * this.input_1)
        }
    }
}

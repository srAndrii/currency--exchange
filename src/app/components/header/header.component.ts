import { Component, OnInit } from '@angular/core'
import { NbuStatService } from '../../services/nbu-stat.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    currenciesStat: { [key: string]: number } = {}

    constructor(private nbuStatService: NbuStatService) {}

    ngOnInit(): void {
        this.nbuStatService.getAll().subscribe((data) => {
            data.filter((item) => item.cc === 'USD' || item.cc === 'EUR').map(
                (item) => (this.currenciesStat[item.cc] = item.rate)
            )
        })
    }
}

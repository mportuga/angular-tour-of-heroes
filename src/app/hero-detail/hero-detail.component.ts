import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  heroDetails: FormGroup;
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { hero: Hero }) => {
        this.hero = data.hero;
      });
  }

  goBack(event?: MouseEvent): void {
    if (event) event.preventDefault();
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe();
  }

  delete(): void {
    this.heroService.deleteHero(this.hero)
      .subscribe(() => this.goBack());
  }
}

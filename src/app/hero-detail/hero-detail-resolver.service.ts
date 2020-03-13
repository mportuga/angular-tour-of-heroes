import { Injectable }             from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Injectable({
  providedIn: 'root'
})
export class HeroDetailResolverService implements Resolve<Hero> {

  constructor(private heroService: HeroService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Hero> | Observable<never> {
    let id = +route.paramMap.get('id');

    return this.heroService.getHero(id).pipe(
      take(1),
      mergeMap(hero => {
        if (hero) {
          return of(hero);
        } else { // id not found
          return EMPTY;
        }
      })
    );
  }
}

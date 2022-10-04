import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../../auth/state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }
}

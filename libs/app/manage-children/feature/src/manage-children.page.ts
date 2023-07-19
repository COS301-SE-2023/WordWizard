import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  GetChildren, 
  SetChild,
  ChildState,
  Child,
  ChangeActive
} from '@word-wizard/app/child/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'word-wizard-manage-children',
  templateUrl: './manage-children.page.html',
  styleUrls: ['./manage-children.page.scss'],
})
export class ManageChildrenPage {
  @Select(ChildState.Children) Children$!: Observable<Child[]>;
  children: Child[] = [];


  visible = false;
  selectedChild!: Child;


  constructor(private router: Router, private store: Store, private readonly auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      if(user) {
        this.store.dispatch(new GetChildren({parent_email:user?.email || '', parent_name: user?.nickname || ''}));
        this.Children$.subscribe((data) => {
          this.children = data;
        });
      }
    });
  }

  setChild(child: Child) {
    this.selectedChild = child;
    this.store.dispatch(new SetChild({childId:child._id}));
    this.controlModal();
  }

  controlModal() {
    this.visible = !this.visible;
  }

  logout() {
    try {
      this.auth.logout();
      this.router.navigate(['/welcome']);
    } catch(error) {
      console.error(error);
    }
  }

  setActive(val: boolean) {
    this.store.dispatch(new ChangeActive({parentActive: val}));
    this.controlModal();
  }
}
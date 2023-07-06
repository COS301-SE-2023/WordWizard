import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { 
  GetChildren, 
  SetChild,
  ChildState,
  Child
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
  // children: { name: string, image: string }[] = [
  //   { name: "Alice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1suIDZd-BKm5JC-poxqX71715wnqg-vEjZg&usqp=CAU" },
  //   { name: "Sam", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjz7CnoaOOAe4_a9paHa1sOpAMcuz4uuEug&usqp=CAU" },
  //   { name: "Charlie", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYO8UfHBWeSbsGnh9Y4Lk0ZXG7fEWM6GnRA&usqp=CAU" }
  // ];
  @Select(ChildState.Children) Children$!: Observable<Child[]>;
  children: Child[] = [];


  // Set visible to true to debug modal
  visible = false;
  selectedChild!: Child;


  constructor(private router: Router, private store: Store, private readonly auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.store.dispatch(new GetChildren({parent_email:user.email || ''}));
        this.Children$.subscribe((data) => {
          this.children = data;
        });
      }
    });
  }

  setChild(child: Child) {
    console.log("Selected child:", child);
    this.selectedChild = child;
    this.controlModal();
    this.store.dispatch(new SetChild({childId:child._id}));
    // this.router.navigate(['library']); //chanfe to child statistics page
    // Add your logic here to handle the selection of a child
  }

  // addNewChild() {
  //   console.log("Adding new child");
  //   // Add your logic here to handle adding a new child
  // }

  controlModal() {
    this.visible = !this.visible;
  }

  continueChild() {
    console.log("Continuing as child");
    //set state to selected child
    //route to dashboard page
  }

  continueParent() {
    console.log("Continuing as parent");
    //set state to selected child
    //route to child statistics page
  }

  signOut() {
    console.log("Signing out");
    //sign parent out
  }
}
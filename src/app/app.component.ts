import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Item } from "./item";
import { ItemComponent } from "./item/item.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, ItemComponent],
})

export class AppComponent {
  componentTitle = "My To Do List";

  // Variable union type for filtering function later on
  filter: "all" | "active" | "done" = "all";

  // List of initial items
  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ];

  // Method for adding additional items
  addItem(description: string) {
    if (!description) return;
  
    this.allItems.unshift({
      description,
      done: false
    });
  }

  // Method to remove items from current list
  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
  

  // Get function to return corresponding items
  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }
}

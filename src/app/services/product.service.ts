import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  dbNodeName: string = '/products';

  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list(this.dbNodeName);
   }

  create(product) {
    return this.itemsRef.push(product);
  }

  getAll(): Observable<any[]> {
    return this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}

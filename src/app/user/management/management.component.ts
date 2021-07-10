import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Page } from 'src/app/domain/page';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, AfterViewInit, OnDestroy {

  selected: User;
  displayedColumns: string[] = ['id', 'name', 'login', 'email', 'admin'];

  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<User>(false, null, true);
  private selectionChangeSubscription: Subscription;
  private pageChangeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.selectionChangeSubscription = this._subscribeToselectionChange();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.initDataFromResolver();
    this.pageChangeSubscription = this.subscribeToPageChangesEvent();
  }

  ngOnDestroy(): void {
    this.selectionChangeSubscription.unsubscribe();
    this.pageChangeSubscription.unsubscribe();
  }

  private _subscribeToselectionChange(): Subscription {
    return this.selection.changed.subscribe((change: SelectionChange<User>) => {
      if (change.removed.includes(this.selected)) {
        this.selected = null;
      }

      if (!change.added.includes(this.selected)) {
        this.selected = change.added[0];
      }
    });
  }

  private subscribeToPageChangesEvent(): Subscription {
    return this.paginator.page.pipe(
      switchMap((event: PageEvent) => this.userService.findByNameStartingWith('', {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      }))
    ).subscribe((page: Page<User>) => this.updateDataSource(page));
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<User> = this.activatedRoute.snapshot.data.page;
      this.updateDataSource(page);
    }
  }

  private updateDataSource(page: Page<User>): void {
    this.dataSource.data = page.content;
    this.paginator.pageIndex = page.number;
    this.paginator.length = page.totalElements;
    this.changeDetectorRef.detectChanges();
  }

  public clearSelection(): void {
    this.selected = null;
    this.selection.clear();
  }

  public resetList(): void {
    this.userService.findByNameStartingWith()
      .subscribe((page: Page<User>) => {
        this.updateDataSource(page);
        this.clearSelection();
      });
  }
  
  public onClickEdit(): void {
    // TODO: chamar um dialog com o details dentro.
  }

  public onClickRemove(): void {
    // TODO: colocar um dialog de confirmação
    this.userService.deleteById(this.selected.id)
      .subscribe(
        () => { 
          this.dataSource.data = this.dataSource.data.filter((user: User) => user.id != this.selected.id);
          this.clearSelection()
          this.messageService.showMessage('User removed.'); 
        },
        () => this.messageService.showMessage('Something went wrong. User wasn\'t removed.')
      );
  }

}

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
import { MessageService } from 'src/app/service/message.service';

import { Email } from 'src/app/domain/email';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, AfterViewInit, OnDestroy {

  selected: Email;
  displayedColumns: string[] = ['to', 'subject', 'create-date'];

  dataSource = new MatTableDataSource<Email>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<Email>(false, null, true);
  private selectionChangeSubscription: Subscription;
  private pageChangeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
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
    return this.selection.changed.subscribe((change: SelectionChange<Email>) => {
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
      // TODO: pegar o id do usuário logado na sessão
      switchMap((event: PageEvent) => this.emailService.findByUserFromId(0, {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      }))
    ).subscribe((page: Page<Email>) => this.updateDataSource(page));
  }

  private initDataFromResolver(): void {
    if (this.activatedRoute.snapshot?.data?.page) {
      const page: Page<Email> = this.activatedRoute.snapshot.data.page;
      this.updateDataSource(page);
    }
  }

  private updateDataSource(page: Page<Email>): void {
    this.dataSource.data = page.content;
    this.paginator.pageIndex = page.number;
    this.paginator.length = page.totalElements;
    this.changeDetectorRef.detectChanges();
  }

  public clearSelection(): void {
    this.selected = null;
    this.selection.clear();
  }

  public onClickRefresh(): void {
    // TODO: pegar o id do usuário logado na sessão
    this.emailService.findByUserFromId(0)
      .subscribe((page: Page<Email>) => {
        this.updateDataSource(page);
        this.clearSelection();
      });
  }
  
  public onClickView(): void {
    // TODO: chamar um dialog com o views do email dentro.
  }

  public onClickCompose(): void {
    // TODO: chamar um dialog com o views do email dentro.
  }

}

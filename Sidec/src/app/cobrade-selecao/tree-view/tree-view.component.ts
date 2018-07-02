import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { TreeModel, TreeComponent, Ng2TreeSettings, FoldingType, NodeEvent } from 'ng2-tree';
import { SidecDomains } from '../../services/esri/sidec-domains.service';
import { TreeViewService } from './tree-view.service';
import { ChildActivationEnd } from '@angular/router';

//var $treeComponent: TreeComponent;

@Component({
  selector: 'app-tree-view',
  providers: [
    TreeViewService,
  ],
  templateUrl: './tree-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tree-view.component.css']
})

export class TreeViewComponent implements AfterViewInit {
  @Output() loaded = new EventEmitter();
  @Output() cobrade = new EventEmitter();

  settings: Ng2TreeSettings = {
    rootIsVisible: false
  };

  tree: TreeModel = {
    id: '-1',
    value: 'COBRADE',
    settings: {
      'static': true
    },
    children: []
  };

  @ViewChild('treeComponent') treeComponent: TreeComponent;

  constructor(private tvs: TreeViewService,
    private cd: ChangeDetectorRef) {
    }

  ngAfterViewInit(): void {
    //$treeComponent = this.treeComponent;
    var treeController = this.treeComponent.getControllerByNodeId("-1");
    //this.loadCobrade('-1', 1);
    this.tvs.initialize().subscribe(
      _tree => {
        alert(_tree);
        //this.tree = _tree;
      },
      err => console.log(err),
      () => { 
        TreeViewService.tree.forEach(child => {
          treeController.addChild(child);
        });
        this.cd.detectChanges();
        this.loaded.emit(true);  
      }
    )
  }
  
  onNodeSelected(e: NodeEvent) {
    if (e.node.id.toString().length >= 9)
    {
      this.cobrade.emit(e.node.id);
    }
  }

  onNodeExpanded(e: NodeEvent) {
    this.cobrade.emit(e.node.id);
  }

}
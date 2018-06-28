import { Injectable } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { Subject, Observable } from 'rxjs';
import { SidecDomains } from '../../services/esri/sidec-domains.service';

@Injectable()
export class TreeViewService {
    private subject: Subject<Boolean>;
    cobrades = [];

    static tree: TreeModel[] = [];

    constructor() { this.subject = new Subject<Boolean>(); }

    initialize(): Observable<Boolean> {
        
        this.cobrades = SidecDomains.DC_COBRADE;
        TreeViewService.tree = this.loadCobrade('-1', 1);
        this.subject.complete();
        return this.subject;
    }

    loadCobrade(pai: string, idx: number): TreeModel[] {

        var filho = '';
        var len = 0;
        var filtered_cobrades = []
        var treeChildren: TreeModel[] = []
        for (let next = 0; next < 9; next++) {
            if (idx === 1) {
                filho = next.toString()
            }
            else {
                filho = pai + '.' + next.toString();
            }
            filtered_cobrades = this.cobrades.filter(x => x.name.startsWith(filho))
            len = filtered_cobrades.length
            //Fecha o Cobrade
            if (len >= 1) {
                if (len > 1) {
                    var tree: TreeModel = this.add_to_tree(pai, filho, idx, true);
                    tree.children = this.loadCobrade(filho, idx + 1)
                    treeChildren.push(tree);
                    tree.settings = { isCollapsedOnInit: true };
                }
                else {
                    filho = filtered_cobrades[0].name;// this.completa_com_zero(filho);
                    treeChildren.push(this.add_to_tree(pai, filho, idx, false));
                }

                if (idx > 1) {
                    $treeComponent.getControllerByNodeId(pai)['collapse']();
                }
            }
        }
        return treeChildren;
    }

    add_to_tree(pai: string, filho: string, idx: number, hasChildren: boolean): TreeModel {
        var _value: string;
        if (filho === '0.0.0.0.0') {
            _value = 'Sem Cobrade'
        } else {
            switch (idx) {
                case 1: //Categoria
                    _value = this.cobrades.find(x => x.name.startsWith(filho)).categoria;
                    break;
                case 2: //Grupo
                    _value = this.cobrades.find(x => x.name.startsWith(filho)).grupo;
                    break;
                case 3: //SubGrupo
                    _value = this.cobrades.find(x => x.name.startsWith(filho)).subgrupo;
                    break;
                case 4: //Tipo
                    _value = this.cobrades.find(x => x.name.startsWith(filho)).tipo;
                    break;
                case 5: //SubTipo
                    _value = this.cobrades.find(x => x.name.startsWith(filho)).subtipo;
                    break;
                default:
                    break;
            }
        }
        var newChildNode: TreeModel =
            {
                value: _value,
                id: filho,
            };
        if (hasChildren) {
            newChildNode.children = []
        }

        return newChildNode
    }
}
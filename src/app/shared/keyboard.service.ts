import {Injectable} from '@angular/core';

import { Folder } from '../core/layout/storage/resources/folder';
import { File } from '../core/layout/storage/resources/file';
import { MainPanelComponent } from '../core/layout/storage/main-panel/main-panel.component';


@Injectable()
export class KeyboardService {

  private mainPanelComponent: MainPanelComponent;

  private enterEvt = (evt) => {
    if (!this.mainPanelComponent) {
      return;
    }
    if (evt.key !== 'Enter' || !this.mainPanelComponent.selectedResource) {
      return;
    }
    if (this.mainPanelComponent.selectedResource instanceof File) {
      this.mainPanelComponent.downloadFile(this.mainPanelComponent.selectedResource);
    }
    if (this.mainPanelComponent.selectedResource instanceof Folder) {
      console.log(this.mainPanelComponent.selectedResource.name);
      this.mainPanelComponent.changeFolder(this.mainPanelComponent.selectedResource);
    }
  };

  constructor() {
    this.enableEnterEvt();
  }

  setComponent(mainPanelComponent) {
    this.mainPanelComponent = mainPanelComponent;
  }

  enableEnterEvt() {
    window.addEventListener('keydown', this.enterEvt);
  }

  disableEnterEvt() {
    window.removeEventListener('keydown', this.enterEvt);
  }

}

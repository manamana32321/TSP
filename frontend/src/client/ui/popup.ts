import { createPopup, createPopupOption, PopupProp } from '@/components/common/Popup';
import { addPopupId, clearPopupIds, moveAnIdToLast, removePopupId } from '@/store/ui/popupSlice';
import CustomDebugger, { Debugable } from '@/utils/debugger';
import React from 'react';

export default class PopupClient implements Debugable {
  private static instance: PopupClient;
  private readonly dispatch;
  private idNodeMap: Map<string, React.ReactNode>
  
  private constructor(dispatch: any, readonly _debugger: CustomDebugger) {
    this.dispatch = dispatch;
    this.idNodeMap = new Map()
  }

  static getInstance(dispatch: any, _debugger: CustomDebugger) {
    if (!PopupClient.instance) {
      PopupClient.instance = new PopupClient(dispatch, _debugger)
    }
    return PopupClient.instance;
  }

  hasPopupWithId(id: string) {
    return Array.from(this.idNodeMap.keys()).includes(id)
  }

  togglePopup(id: string, children: React.ReactNode, popupWrapperProp: createPopupOption) {
    if (this.hasPopupWithId(id)) {
      return this.removePopup(id)
    }
    return this.addPopup(id, children, popupWrapperProp, false) as string
  }

  addPopup(id: string, children: React.ReactNode, popupWrapperProp: createPopupOption, checkDuplicatedId?: boolean) {
    checkDuplicatedId = checkDuplicatedId ?? true
    if (checkDuplicatedId && this.hasPopupWithId(id)) {
      this._debugger.log(`Tried to add popup with id '${id}'. However this id already exists.`)
      return
    }
    this.dispatch(addPopupId(id))
    const popupElement = createPopup(
      id, children, popupWrapperProp
    )
    this.idNodeMap.set(id, popupElement)
    return id
  }

  removePopup(id: string) {
    if (!this.hasPopupWithId(id)) {
      this._debugger.log(`Tried to remove popup with id '${id}'. However this id is invalid.`)
      return
    }
    this.dispatch(removePopupId(id))
    this.idNodeMap.delete(id)
    return id
  }

  clearPopups() {
    this.dispatch(clearPopupIds())
    this.idNodeMap.clear()
  }

  focusPopup(id: string) {
    // move key-value pair to last index
    const value = this.idNodeMap.get(id);
    this.idNodeMap.delete(id);
    this.idNodeMap.set(id, value);
    this.dispatch(moveAnIdToLast(id))
  }

  removeFocusedPopup() {
    const keys = Array.from(this.idNodeMap.keys())
    if (keys.length === 0) {
      return
    }
    const lastId = keys[keys.length - 1]
    this.removePopup(lastId)
  }

  get popupElements() {
    return [...this.idNodeMap.values()]
  }
}
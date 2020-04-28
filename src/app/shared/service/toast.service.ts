import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class ToastService {

  private readonly snackBarConfig: MatSnackBarConfig = {
    duration: 3000
  };

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action?: string) {
    this.snackBar.open(message, action, this.snackBarConfig);
  }

  /**
   * Display messages in an overlay
   *
   * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error".
   * @param summary Summary text of the message.
   * @param detail Detail text of the message.
   * @deprecated
   */
  add(severity: string, summary: string, detail?: string) {
    // this.messageService.add({ severity, summary, detail });
  }

  /** @deprecated */
  addSuccess(summary: string, detail?: string) {
    this.add('success', summary, detail);
  }

  /** @deprecated */
  addInfo(summary: string, detail?: string) {
    this.add('info', summary, detail);
  }

  /** @deprecated */
  addWarn(summary: string, detail?: string) {
    this.add('warn', summary, detail);
  }

  /** @deprecated */
  addError(summary: string, detail?: string) {
    this.add('error', summary, detail);
  }
}

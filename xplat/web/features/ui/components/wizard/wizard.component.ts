import {
  Component,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input
} from '@angular/core';

import { WizardStepComponent } from '../wizard-step/wizard-step.component';

import { WizardBaseComponent } from '@sura-platform/features';

@Component({
  selector: 'sxf-wizard',
  templateUrl: 'wizard.component.html',
  styleUrls: ['wizard.component.scss']
})
export class WizardComponent extends WizardBaseComponent
  implements AfterContentInit {
  /**
   * test
   * @class test
   */
  @ContentChildren(WizardStepComponent)
  /**
   * test
   * @class test
   */
  wizardSteps: QueryList<WizardStepComponent>;

  @Input() showSolicitPolicyButton = false;
  @Input() showSaveQuoteButton = false;

  public _steps: Array<WizardStepComponent> = [];
  public _isCompleted = false;
  /**
   * Boolean to show prev and next buttons
   * @property buttons_active
   */
  public buttonsActive = true;
  /**
   * Output where there is a changed state
   */
  @Output()
  StepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<
    WizardStepComponent
  >();

  constructor() {
    super();
  }
  /**
   * Loop steps and active the first by default
   */
  ngAfterContentInit(): void {
    this.wizardSteps.forEach((step) => this._steps.push(step));
    this.steps[0].isActive = true;
  }
  /**
   * get all steps with filter
   */
  get steps(): Array<WizardStepComponent> {
    return this._steps.filter((step) => !step.hidden);
  }
  /**
   * return if that step is completed
   */
  get isCompleted(): boolean {
    return this._isCompleted;
  }
  /**
   * return the current step
   */
  get activeStep(): WizardStepComponent {
    return this.steps.find((step) => step.isActive);
  }
  /**
   * test
   * @class test
   */
  set activeStep(step: WizardStepComponent) {
    if (step !== this.activeStep && !step.isDisabled) {
      this.activeStep.isActive = false;
      step.isActive = true;
      this.StepChanged.emit(step);
    }
  }
  /**
   * test
   * @class test
   */
  public get activeStepIndex(): number {
    return this.steps.indexOf(this.activeStep);
  }
  /**
   * test
   * return if there is a next step
   */
  get hasNextStep(): boolean {
    return this.activeStepIndex < this.steps.length - 1;
  }
  /**
   * return if there is a previous step
   */
  get hasPrevStep(): boolean {
    return this.activeStepIndex > 0;
  }
  /**
   * Go to a step
   */
  public goToStep(step: WizardStepComponent): void {
    if (!this.isCompleted) {
      this.activeStep = step;
    }
  }
  /**
   * Jump to next step
   */
  public next(): void {
    if (this.hasNextStep) {
      const nextStep: WizardStepComponent = this.steps[
        this.activeStepIndex + 1
      ];
      window.scrollTo(0, 0);
      this.activeStep.Next.emit();
      nextStep.isDisabled = false;
      this.activeStep = nextStep;
    }
  }
  /**
   * Jumpt to previuos step
   */
  public previous(): void {
    if (this.hasPrevStep) {
      const prevStep: WizardStepComponent = this.steps[
        this.activeStepIndex - 1
      ];
      window.scrollTo(0, 0);
      this.activeStep.Prev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  /**
   * Emmit a step as completed
   */
  public complete(): void {
    this.activeStep.Complete.emit();
    // this._isCompleted = true;
  }
}

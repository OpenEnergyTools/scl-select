import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import '@material/web/select/filled-select';
import '@material/web/select/select-option';
import '@material/web/switch/switch';
import { Select } from '@material/web/select/internal/select';
import { Switch } from '@material/web/switch/internal/switch';

@customElement('scl-select')
/** TextField designed to be used for SCL element */
export class SclSelect extends LitElement {
  /** Whether [[`value`]] may be set to `null` by nullSwitch */
  @property({ type: Boolean })
  nullable = false;

  @state()
  private selectValue: string = '';

  /** SCL attributes `value`, can only be `null` if [[`nullable`]]. */
  @property({ attribute: false })
  set value(value: string | null) {
    if (value === null) this.null = true;
    else {
      this.null = false;
      this.selectValue = value;
    }
  }

  get value(): string | null {
    return this.null ? null : this.selectValue;
  }

  /** Value array be be renders as selection option inside the selection input */
  @property({ type: Array })
  selectOptions: string[] = [];

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  label: string = '';

  @property({ type: Boolean })
  required: boolean = false;

  @property({ type: String })
  supportingText: string = '';

  @state()
  private isNull = false;

  private parkedValue: string | null = null;

  @state()
  private get null(): boolean {
    return this.nullable && this.isNull;
  }

  private set null(value: boolean) {
    if (!this.nullable || value === this.isNull) return;
    this.isNull = value;
    if (this.isNull) this.parkedValue = this.selectValue;
    else {
      this.selectValue = this.parkedValue ?? '';
      this.parkedValue = null;
    }
  }

  @query('.nullswitch.element') nullSwitch?: Switch;

  @query('.input.element') private selectInput?: Select;

  reportValidity(): boolean {
    return this.selectInput!.reportValidity();
  }

  setCustomValidity(message: string): void {
    this.selectInput?.setCustomValidity(message);
  }

  checkValidity(): boolean {
    return this.selectInput!.checkValidity();
  }

  private renderNullSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<md-switch
        class="nullswitch element"
        ?selected=${!this.null}
        ?disabled=${this.disabled}
        @input="${async (evt: Event) => {
          /** TODO(jakob-vogelsang): change when
           * https://github.com/material-components/material-web/issues/5486
           * is fixed */
          evt.stopPropagation();
        }}"
        @change="${async (evt: Event) => {
          this.null = !(evt.target as Switch).selected;
          await this.updateComplete;
          this.dispatchEvent(new Event('input'));
        }}"
      ></md-switch>`;
    }
    return html``;
  }

  private renderSelectOption(selectOption: string): TemplateResult {
    return html`<md-select-option
      ?selected=${this.value === selectOption}
      value="${selectOption}"
      ><div slot="headline">${selectOption}</div></md-select-option
    >`;
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div class="input container">
          <md-filled-select
            class="input element"
            @input="${(evt: InputEvent) => {
              this.selectValue = (evt.target as Select).value;
            }}"
            value="${this.selectValue}"
            ?disabled=${this.disabled || this.isNull}
            label="${this.label}"
            ?required=${this.required}
            supporting-text="${this.supportingText}"
            >${this.selectOptions.map(selectOption =>
              this.renderSelectOption(selectOption)
            )}</md-filled-select
          >
        </div>
        <div class="nullswitch container">${this.renderNullSwitch()}</div>
      </div>
    `;
  }

  static styles = css`
    .nullswitch.element {
      margin-left: 12px;
    }

    .nullswitch.container {
      display: flex;
      align-items: center;
      height: 56px;
    }

    .input.container {
      flex: auto;
    }

    .input.element {
      width: 100%;
    }
  `;
}

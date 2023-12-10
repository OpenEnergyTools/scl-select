import { html, TemplateResult } from 'lit';

import './scl-select.js';

export default {
  title: 'scl-select',
  component: 'scl-select',
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  value: string | null;
  selectOptions: string[];
  disabled: boolean;
  label: string;
  required: boolean;
  supportingText: string;
  nullable: boolean;
}

const TextFieldTemplate: Story<ArgTypes> = ({
  value = null,
  selectOptions = ['Option1', 'Option2'],
  disabled = false,
  label = 'label',
  required = false,
  supportingText = 'supportingText',
}) =>
  html`
    <scl-select
      .value="${value}"
      .selectOptions=${selectOptions}
      ?disabled=${disabled}
      label="${label}"
      ?required=${required}
      supportingText="${supportingText}"
    >
    </scl-select>
  `;

export const PlainTextField = TextFieldTemplate.bind({});
PlainTextField.args = {
  value: 'value',
  selectOptions: ['Option1', 'Option2'],
  disabled: false,
  label: 'label',
  required: false,
  supportingText: 'supportingText',
  nullable: false,
};

const NulledTextFieldTemplate: Story<ArgTypes> = ({
  value = null,
  selectOptions = ['Option1', 'Option2'],
  disabled = false,
  label = 'label',
  required = false,
  supportingText = 'supportingText',
}) =>
  html`
    <scl-select
      .value="${value}"
      .selectOptions=${selectOptions}
      ?disabled=${disabled}
      label="${label}"
      ?required=${required}
      supportingText="${supportingText}"
      ?nullable=${true}
    >
    </scl-select>
  `;

export const NulledTextField = NulledTextFieldTemplate.bind({});
NulledTextField.args = {
  value: 'value',
  selectOptions: ['Option1', 'Option2'],
  disabled: false,
  label: 'label',
  required: false,
  supportingText: 'supportingText',
  nullable: true,
};

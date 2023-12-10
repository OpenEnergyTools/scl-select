/* eslint-disable import/no-extraneous-dependencies */
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import './scl-select.js';
import type { SclSelect } from './scl-select.js';

const factor = window.process && process.env.CI ? 5 : 3;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(4000 * factor);

document.body.style.width = '400px';
document.body.style.height = '400px';

describe('Custom SCL related TextField', () => {
  describe('that is non-nullable', () => {
    let sclSelect: SclSelect;

    beforeEach(async () => {
      sclSelect = await fixture(
        html`<scl-select
          label="label"
          required
          value="Option1"
          .selectOptions=${['Option1', 'Option2']}
          supportingText="supportingText"
        ></scl-select>`
      );
      document.body.prepend(sclSelect);
    });

    afterEach(() => {
      if (sclSelect) sclSelect.remove();
    });

    it('per default looks like the last screenshot', async () => {
      await timeout(200);
      await visualDiff(sclSelect, `non-nullable/valid value`);
    });

    it('when disabled looks like the latest screenshot', async () => {
      sclSelect.disabled = true;

      await timeout(200);
      await visualDiff(sclSelect, `non-nullable/disabled`);
    });
  });

  describe('that is nullable', () => {
    let sclSelect: SclSelect;

    beforeEach(async () => {
      sclSelect = await fixture(
        html`<scl-select
          nullable
          label="label"
          value="Option1"
          .selectOptions=${['Option1', 'Option2']}
        ></scl-select>`
      );
      document.body.prepend(sclSelect);
    });

    afterEach(() => {
      if (sclSelect) sclSelect.remove();
    });

    it('per default looks like the last screenshot', async () => {
      await timeout(200);

      await visualDiff(sclSelect, `nullable/value set to string`);
    });

    it('when disabled the component looks like the last screenshot', async () => {
      sclSelect.disabled = true;

      await timeout(200);
      await visualDiff(sclSelect, `nullable/disabled`);
    });

    it('when clicked on the nullSwitch looks like the last screenshot', async () => {
      await sendMouse({ type: 'click', position: [380, 20] }); // focus input

      await timeout(200);
      await visualDiff(sclSelect, `nullable/nullSwitch toggled`);
    });
  });

  describe('require value prevents unselected input', () => {
    let sclSelect: SclSelect;

    beforeEach(async () => {
      sclSelect = await fixture(
        html`<scl-select
          nullable
          required
          label="label"
          .value=${null}
          .selectOptions=${['Option1', 'Option2']}
        ></scl-select>`
      );
      document.body.prepend(sclSelect);
    });

    afterEach(() => {
      if (sclSelect) sclSelect.remove();
    });

    it('indicate value null with nullSwitch', async () => {
      sclSelect.reportValidity();
      await timeout(200);

      await visualDiff(
        document.body,
        `restricted-text/nullSwitch null indication`
      );
    });

    it('indicates with reportValidity invalid input', async () => {
      await sendMouse({ type: 'click', position: [380, 20] }); // focus input
      await timeout(200);

      sclSelect.reportValidity();
      await timeout(200);

      await visualDiff(document.body, `restricted-text/reportValidity`);
    });

    it('does not indicated invalid input with checkValidity', async () => {
      await sendMouse({ type: 'click', position: [380, 20] }); // focus input
      await timeout(200);

      sclSelect.checkValidity();
      await timeout(200);

      await visualDiff(document.body, `restricted-text/checkValidity`);
    });

    it('sets a custom message with setCustomValidity', async () => {
      await sendMouse({ type: 'click', position: [380, 20] }); // focus input
      await timeout(200);

      sclSelect.setCustomValidity('Please select something');
      sclSelect.reportValidity();

      await timeout(200);

      await visualDiff(document.body, `restricted-text/setCustomValidity`);
    });
  });
});

# \<scl-select>

This is a web component meant to be used for SCL type attributes restricted to xs:enumeration. In addition to default input it allows to have a `value="null"` for XML type attributes.

## Usage

This element was meant to be used only for plugins in this organization. If it still fills you bill please use or re-use it. But be aware that we will not react on feature wishes that do not contribute to the needs of plugin in this organization.


## `scl-select.ts`:

### class: `SclSelect`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name             | Privacy | Type                  | Default | Description                                                              | Inherited From |
| ---------------- | ------- | --------------------- | ------- | ------------------------------------------------------------------------ | -------------- |
| `nullable`       |         | `boolean`             | `false` | Whether \[\[\`value\`]] may be set to \`null\` by nullSwitch             |                |
| `value`          |         | `string \| null`      |         | SCL attributes \`value\`, can only be \`null\` if \[\[\`nullable\`]].    |                |
| `selectOptions`  |         | `string[]`            | `[]`    | Value array be be renders as selection option inside the selection input |                |
| `disabled`       |         | `boolean`             | `false` |                                                                          |                |
| `label`          |         | `string`              | `''`    |                                                                          |                |
| `required`       |         | `boolean`             | `false` |                                                                          |                |
| `supportingText` |         | `string`              | `''`    |                                                                          |                |
| `nullSwitch`     |         | `Switch \| undefined` |         |                                                                          |                |

#### Methods

| Name                | Privacy | Description | Parameters        | Return    | Inherited From |
| ------------------- | ------- | ----------- | ----------------- | --------- | -------------- |
| `reportValidity`    |         |             |                   | `boolean` |                |
| `setCustomValidity` |         |             | `message: string` | `void`    |                |
| `checkValidity`     |         |             |                   | `boolean` |                |

<details><summary>Private API</summary>

#### Fields

| Name          | Privacy | Type                  | Default | Description | Inherited From |
| ------------- | ------- | --------------------- | ------- | ----------- | -------------- |
| `selectValue` | private | `string`              | `''`    |             |                |
| `isNull`      | private | `boolean`             | `false` |             |                |
| `parkedValue` | private | `string \| null`      | `null`  |             |                |
| `null`        | private | `boolean`             |         |             |                |
| `textField`   | private | `Select \| undefined` |         |             |                |

#### Methods

| Name                 | Privacy | Description | Parameters             | Return           | Inherited From |
| -------------------- | ------- | ----------- | ---------------------- | ---------------- | -------------- |
| `renderNullSwitch`   | private |             |                        | `TemplateResult` |                |
| `renderSelectOption` | private |             | `selectOption: string` | `TemplateResult` |                |

</details>

<hr/>

### Exports

| Kind | Name        | Declaration | Module        | Package |
| ---- | ----------- | ----------- | ------------- | ------- |
| `js` | `SclSelect` | SclSelect   | scl-select.ts |         |


&copy; 2023 The Contributors

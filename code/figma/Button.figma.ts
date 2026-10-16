// url=https://www.figma.com/design/7jBSiLPca3tR2ZAye28knU/WIT-Test-Task?node-id=22-284
// source=src/components/Button/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const variant = instance.getEnum('Style', {
  Solid: 'solid',
  Glassy: 'glassy',
})
// "State" (Default/Hover) is an interaction state handled by CSS :hover, not a prop.

const showIcon = instance.getBoolean('Show icon')
const icon = showIcon ? instance.getInstanceSwap('Icon') : null
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<Button variant="${variant}"${iconCode ? figma.code` icon={${iconCode}}` : ''}>${label}</Button>`,
  imports: ['import { Button } from "@dusk/ui"'],
  id: 'button',
  metadata: { nestable: true },
}

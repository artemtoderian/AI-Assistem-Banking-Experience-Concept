// url=https://www.figma.com/design/7jBSiLPca3tR2ZAye28knU/WIT-Test-Task?node-id=22-331
// source=src/components/Pill/Pill.tsx
// component=Pill
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const tone = instance.getEnum('Tone', {
  OK: 'ok',
  AI: 'ai',
  Neutral: 'neutral',
})

const icon = instance.getInstanceSwap('Icon')
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<Pill tone="${tone}"${iconCode ? figma.code` icon={${iconCode}}` : ''}>${label}</Pill>`,
  imports: ['import { Pill } from "@dusk/ui"'],
  id: 'pill',
  metadata: { nestable: true },
}

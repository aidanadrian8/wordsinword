import { Tooltip } from 'bootstrap'

export const tooltip = {
    
  mounted(el) {
    const tooltip = new Tooltip(el);
    console.log(`${tooltip} - eslint pleaser`)
  }
}
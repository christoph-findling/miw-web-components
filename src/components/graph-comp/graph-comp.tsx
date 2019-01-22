import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'graph-comp',
  styleUrl: 'graph-comp.css',
  shadow: true
})
export class GraphComp {

  helper = 0;

  @Element() htmlElement: HTMLElement;

  @Prop() data: any = [];

  render() {

    return (
      <div class="graph-wrapper">
        <div>
          <svg width="100vw" height="100">
            {
              this.data.map((item, index) => {
                let x = 0;
                if (index != 0) {
                  x = this.helper;
                }
                this.helper += item.percentage;
                return <rect width={item.percentage + '%'} x={x + '%'} height="100" />
              })}
          </svg>
        </div>
        <div class="label-wrapper">
          {
            this.data.map((item, index) => {
              let className = "label-" + index;
              return <div class={className}>{item.coin} || {item.percentage}%</div>
            })}
        </div>
      </div>
    );
  }
}

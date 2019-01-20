import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'graph-comp',
  styleUrl: 'graph-comp.css',
  shadow: true
})
export class GraphComp {

  helper = 0;

  @Element() htmlElement: HTMLElement;

  @Prop() data: any;

  componentDidLoad() {
    console.log('did load');
    console.log(this.htmlElement);
    this.data.map((item, index) => {
      let className = '.label-' + index;
      let htmlEl = this.htmlElement.shadowRoot.querySelector(className) as HTMLElement;
      htmlEl.style.setProperty('width', item.percentage + '%');
    })
    console.log(this.htmlElement.shadowRoot.querySelector('.label'));
  }

  render() {

    return (
      <div class="graph-wrapper">
        <div>
          <svg width="100vw" height="100">
            {
              this.data.map((item, index) => {
                console.log('mapping');
                let x;
                if (index != 0) {
                  x = this.helper;
                }
                this.helper += item.percentage;
                console.log('helper: ' + this.helper);
                return <rect width={item.percentage + '%'} x={x + '%'} height="100" />
              })}
          </svg>
        </div>
        <div class="label-wrapper">
          {
            this.data.map((item, index) => {
              console.log('helper: ' + this.helper);
              let className = "label-" + index;
              return <div class={className}>{item.coin} || {item.percentage}%</div>
            })}
        </div>
      </div>
    );
  }
}

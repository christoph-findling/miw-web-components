import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'stick-comp',
  styleUrl: 'stick-comp.css',
  shadow: true
})
export class StickComp {

  x = 0;
  graphWidth = 0;
  graphHeight = 0;

  @Element() htmlElement: HTMLElement;

  @Prop() data: any;

  componentDidLoad() {
    console.log('stick comp did load');
    this.data.map((index) => {
      let className = '.label-' + index;
      let htmlEl = this.htmlElement.shadowRoot.querySelector(className) as HTMLElement;
      htmlEl.style.setProperty('width', (100 / this.data.length) + '%');
    })
  }

  render() {
    {
      this.graphWidth = this.data.length * 100;
      this.data.map(item => {
        this.graphHeight < item.percentage ? this.graphHeight = item.percentage : '';
      });
    }
    return (
      <div class="graph-wrapper">
        <div>
          <svg width="100vw" height={this.graphHeight * 10}>
            {
              this.data.map((item, index) => {
                if (index > 0) {
                  this.x += (100 / this.data.length);
                }
                return <rect height={item.percentage * 10} x={this.x + '%'} width={100 / this.data.length + '%'} />
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

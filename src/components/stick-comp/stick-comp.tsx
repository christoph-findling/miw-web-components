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
    // this.htmlElement.querySelector('.graph-comp')[0].style.setProperty('--current-value', '3333');
    // console.log(this.htmlElement);
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
        <ul>
          {
            this.data.map((item) => {
              return <li>{item.coin} || {item.percentage}%</li>
            })}
        </ul>
      </div>
    );
  }
}

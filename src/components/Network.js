import React from 'react';
import { Graph } from '@vx/network';
// import { scaleOrdinal, schemeCategory20c } from 'd3-scale';
import clonedeep from 'lodash.clonedeep';

class Network extends React.Component {
  state = {
    graph: {
      nodes: [{ x: 50, y: 20 }, { x: 200, y: 300 }, { x: 300, y: 40 }],
      links: [],
    },
  };
  addNode = () => {
    const newData = clonedeep(this.state.graph);
    console.log(newData);
    newData.nodes = [...newData.nodes, { x: 100, y: 100 }];
    console.log(newData);
    this.setState({ data: newData });
  };
  render() {
    const { width, height } = this.props;
    const { graph } = this.state;
    return (
      <>
        <svg width={width} height={height}>
          <rect width={width} height={height} rx={14} fill="#272b4d" />
          <Graph graph={graph} />
        </svg>
        <button onClick={this.addNode}>Add a node!</button>
      </>
    );
  }
}

export default Network;

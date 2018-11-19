import React, { ReactDOM } from 'react';
import * as d3 from 'd3';

var width = 960;
var height = 500;
var force = d3
  .forceSimulation()
  .force('charge', -300)
  .force('link', d3.forceLink().distance(50));
// .size([width, height]);

// *****************************************************
// ** d3 functions to manipulate attributes
// *****************************************************

var enterNode = selection => {
  selection
    .select('circle')
    .attr('r', d => d.size)
    .call(force.drag);

  selection
    .select('text')
    .attr('x', d => d.size + 5)
    .attr('dy', '.35em');
};

var updateNode = selection => {
  selection.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
};

var enterLink = selection => {
  selection.attr('stroke-width', d => d.size);
};

var updateLink = selection => {
  selection
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
};

var updateGraph = selection => {
  selection.selectAll('.node').call(updateNode);
  selection.selectAll('.link').call(updateLink);
};

// *****************************************************
// ** React classes to enter/exit elements
// *****************************************************

class Node extends React.Component {
  componentDidMount() {
    this.d3Node = d3
      .select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(enterNode);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data).call(updateNode);
  }

  render() {
    return (
      <g className="node">
        <circle />
        <text>{this.props.data.key}</text>
      </g>
    );
  }
}

class Link extends React.Component {
  componentDidMount() {
    this.d3Link = d3
      .select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(enterLink);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data).call(updateLink);
  }

  render() {
    return <line className="link" />;
  }
}

// *****************************************************
// ** Graph and App components
// *****************************************************

class Graph extends React.Component {
  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this));
    force.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick
      this.d3Graph.call(updateGraph);
    });
  }

  componentDidUpdate() {
    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    force.nodes(this.props.nodes).links(this.props.links);

    // start force calculations after
    // React has taken care of enter/exit of elements
    force.start();
  }

  render() {
    // use React to draw all the nodes, d3 calculates the x and y
    var nodes = this.props.nodes.map(node => {
      return <Node data={node} key={node.key} />;
    });
    var links = this.props.links.map(link => {
      return <Link key={link.key} data={link} />;
    });

    return (
      <svg width={width} height={height}>
        <g>
          {links}
          {nodes}
        </g>
      </svg>
    );
  }
}

class Force extends React.Component {
  state = {
    nodes: [],
    links: [],
  };

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    // randomData is loaded in from external file generate_data.js
    // and returns an object with nodes and links
    // var newState = randomData(this.state.nodes, width, height);
    this.setState(this.state);
  }

  render() {
    return (
      <div>
        <div className="update" onClick={this.updateData}>
          update
        </div>
        <Graph nodes={this.state.nodes} links={this.state.links} />
      </div>
    );
  }
}

export default Force;

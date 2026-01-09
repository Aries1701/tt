import React, { Component } from "react";

type Props = {
  title: string;
};

type State = {
  count: number;
};

class ClassCounter extends Component<Props, State> {
  state: State = {
    count: 0,
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { title } = this.props;
    const { count } = this.state;

    return (
      <div style={{ border: "1px solid #ccc", padding: 16 }}>
        <h3>{title} (Class Component)</h3>
        <p>Count: {count}</p>

        <button onClick={this.increment}>
          + Increment
        </button>
      </div>
    );
  }
}

export default ClassCounter;

import React, { Component } from 'react';
import withRouter from '../../lib/router/withRouter';

interface ComponentProps {
  message?: string;
  hasError?: boolean;
};

interface Props {
  routeState: RouteState;
};

interface State {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props & ComponentProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidUpdate(prevProps: Props) {
    const { routeState: { id } } = this.props;
    
    if (id !== prevProps.routeState.id) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError, children } = this.props;

    if (this.state.hasError || hasError) { // eslint-disable-line react/destructuring-assignment
      // You can render any custom fallback UI
      return <div>Error</div>;
    }
    
    return children;
  }
}

export default withRouter<ComponentProps>(ErrorBoundary);

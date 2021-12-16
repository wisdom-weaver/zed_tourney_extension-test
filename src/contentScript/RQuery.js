import React from "react";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { QueryClient, QueryClientProvider } from "react-query";

const init_base_state = {};
const baseReducer = (state = init_base_state, action) => {
  switch (action.type) {
    case "UPDATE_BASE":
      return { ...state, ...action.update };
    default:
      return state;
  }
};
const rootReducer = combineReducers({ base: baseReducer });
export const store = createStore(rootReducer);

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export const QueryWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  );
};

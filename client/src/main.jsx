import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "~/App.jsx";
import "~/index.css";
import Provider from "./redux/provider.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="mx-auto">
          Something went wrong{" :("} {this.state.hasError}
        </h1>
      );
    }

    return this.props.children;
  }
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

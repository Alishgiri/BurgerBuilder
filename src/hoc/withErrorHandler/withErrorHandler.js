import React from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
import Axios from "../../axios";

const withErrorHandler = WrappedComponent => {
  return class extends React.Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = Axios.interceptors.response.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = Axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      Axios.interceptors.request.eject(this.reqInterceptor);
      Axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            closeModal={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

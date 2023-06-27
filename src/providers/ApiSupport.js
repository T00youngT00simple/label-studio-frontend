import { API_CONFIG } from '../config/ApiConfig';
import { APIProxy } from '../utils/api-proxy';
import { modal } from '../components/Modal/Modal';

const API = new APIProxy(API_CONFIG);
let apiLocked = false;

const errorFormatter = (result) => {
  const {response} = result;
  const isShutdown = String(response?.detail ?? result?.error) === 'Failed to fetch';

  return {
    isShutdown,
    title: result.error ? "Runtime error" : "Server error",
    message: response?.detail ?? result?.error,
    stacktrace: response?.exc_info ?? null,
    version: response?.version,
    validation: Object.entries(response?.validation_errors ?? {}),
  };
};

const handleError = async (response, showModal = true) => {
  let result = response;

  if (result instanceof Response) {
    result = await API.generateError(response);
  }

  if (response.status === 401) {
    return;
  }

  const {isShutdown, ...formattedError} = errorFormatter(result);

  if (showModal) {

    modal({
      allowClose: !isShutdown,
      body: isShutdown ? (
        <ErrorWrapper
          possum={false}
          title={"Connection refused"}
          message={"Server not responding. Is it still running?"}
        />
      ) : (
        <ErrorWrapper {...formattedError}/>
      ),
      simple: true,
      style: { width: 680 },
    });
  }

  return isShutdown;
};

export const callApi = async (method, { params = {}, errorFilter, ...rest } = {}) => {
    if (apiLocked) return;


    const result = await API[method](params, rest);

    if (result.status === 401) {
      apiLocked = true;
      return;
    }

    if (result.error) {
      // pass
      
    }

    return result;
  };

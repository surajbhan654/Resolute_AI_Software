import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={appStore}>
      <Body/>
      <Toaster/>
    </Provider>
  );
}

export default App;

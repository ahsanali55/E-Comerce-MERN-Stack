import Header from "../components/pages/Home/navSection/Header";
import ProductApiFetch from "../components/ApiFetching/ProductApiFetch";
import Footer from "../components/pages/Home/footer/Footer";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hook";
import IsShow from "../components/pages/Home/navSection/IsShow";
import ScrollToTop from "../components/pages/Home/scrolltoTop/ScrollToTop";
import RouteLoader from "../components/pages/Toploader/RouteLoader";

function App() {
  const isShow = useAppSelector((state: RootState) => state.navbar.isShow);

  return (
    <>
      <ScrollToTop />
      <ProductApiFetch />
      <RouteLoader />
      <Header />

      {isShow ? <IsShow /> : null}

      <div>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default App;


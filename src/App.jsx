import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SeachResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/pageNotFound";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {

        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          original: res?.images?.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url));
      })
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:mediaType/:id" element={<Details />}></Route>
        <Route path="/search/:query" element={<SearchResult />}></Route>
        <Route path="/explore/:mediaType" element={<Explore />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

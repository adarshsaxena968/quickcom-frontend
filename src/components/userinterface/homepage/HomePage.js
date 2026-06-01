// import Header from "./Header"
// import OfferScroll from "./OfferScroll"
// import AdScroll from "./AdScroll"
// import ProductsScroll from './ProductsScroll'
// import Footter from "./Footter"

// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// import { getData, postData } from "../../../services/FetchNodeAdminServices"
// import { useState, useEffect } from "react"
// export default function HomePage() {
//      const [banners, setBanners] = useState([])
//      const [bankOffer, setBankOffer] = useState([])
//      const [adOffer, setAdOffer] = useState([])
//      const [popularProducts, setPopularProducts] = useState([])
//      const [refresh, setRefresh] = useState(false)
//      const theme = useTheme();
//      const matches = useMediaQuery(theme.breakpoints.up("md"));
//      const fetchAllProductDetails = async (productstatus) => {
//           var result = await postData('userinterface/display_all_productdetail_by_status', { productstatus })
//           setPopularProducts(result.data)
//      }
//      const fetchAllOffers = async () => {
//           var result = await getData('userinterface/all_adoffers')
//           setAdOffer(result.data)
//      }

//      const fetchAllBanners = async () => {
//           var result = await getData("userinterface/show_all_banner")
//           setBanners(result.data)

//      }
//      const fetchAllBankOffer = async () => {
//           var result = await getData("userinterface/show_all_bankoffer")
//           setBankOffer(result.data)

//      }
//      useEffect(function () {
//           fetchAllBanners()
//           fetchAllBankOffer()
//           fetchAllOffers()
//           fetchAllProductDetails('Popular')


//      }, [])
//      return (
//           <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
//                <div>
//                     <Header />
//                </div>
//                <div style={{ width: '82.7%', alignSelf: 'center', marginTop: 20 }}>
//                     <AdScroll data={banners} />
//                </div>
//                <div style={{ width: '82%', alignSelf: 'center', marginTop: 35 }}>
//                     <OfferScroll state={"Offer"} data={adOffer} />
//                </div>
//                <div style={{ width: '82%', alignSelf: 'center', marginTop: 20 }}>
//                     <OfferScroll state={"Bank"} data={bankOffer} />
//                </div>
//                <div style={{ width: '82%', alignSelf: 'center', marginTop: 20 }}>
//                     <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={"Popular"} data={popularProducts} />
//                </div>
//                <div style={{ width: '82%', alignSelf: 'center', marginTop: 20 }}>
//                     <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={"Top Brands"} data={popularProducts} />
//                </div>




//            


//           </div>
//      )
// }
import Header from "../homepage/Header";
import OfferScroll from "./OfferScroll";
import AdScroll from "./AdScroll";
import ProductsScroll from "./ProductsScroll";
import Footer from "../homepage/Footter";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getData, postData } from "../../../services/FetchNodeAdminServices";
import { useState, useEffect } from "react";

export default function HomePage() {
     const [banners, setBanners] = useState([]);
     const [bankOffer, setBankOffer] = useState([]);
     const [adOffer, setAdOffer] = useState([]);
     const [popularProducts, setPopularProducts] = useState([]);
     const [refresh, setRefresh] = useState(false);

     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.up("md"));

     const fetchAllProductDetails = async (productstatus) => {
          var result = await postData(
               "userinterface/display_all_productdetail_by_status",
               { productstatus }
          );
          setPopularProducts(result.data);
     };

     const fetchAllOffers = async () => {
          var result = await getData("userinterface/all_adoffers");
          setAdOffer(result.data);
     };

     const fetchAllBanners = async () => {
          var result = await getData("userinterface/show_all_banner");
          setBanners(result.data);
     };

     const fetchAllBankOffer = async () => {
          var result = await getData("userinterface/show_all_bankoffer");
          setBankOffer(result.data);
     };

     useEffect(() => {
          fetchAllBanners();
          fetchAllBankOffer();
          fetchAllOffers();
          fetchAllProductDetails("Popular");
     }, []);

     return (
          <div style={{ padding: 0, overflowX: "hidden" }}>
               <Header />

               {/* Content container */}
               <div style={{ marginTop: 20 }}>
                    <div style={{ marginTop: 20 }}>
                         <AdScroll data={banners} />
                    </div>

                    <div style={{ marginTop: 35 }}>
                         <OfferScroll state={"Offer"} data={adOffer} />
                    </div>

                    <div style={{ marginTop: 20 }}>
                         <OfferScroll state={"Bank"} data={bankOffer} />
                    </div>

                    <div style={{ marginTop: 20 }}>
                         <ProductsScroll
                              refresh={refresh}
                              setRefresh={setRefresh}
                              title={"Popular"}
                              data={popularProducts}
                         />
                    </div>

                    <div style={{ marginTop: 20 }}>
                         <ProductsScroll
                              refresh={refresh}
                              setRefresh={setRefresh}
                              title={"Top Brands"}
                              data={popularProducts}
                         />
                    </div>
               </div>

               <Footer />
          </div>
     );
}
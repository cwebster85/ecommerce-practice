import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import styles from "../styles/Home.module.css";
import { findAllProducts } from "./api/products";

//FOR GETSERVERSIDEPROPS inside the brackets after Home, you would have {products} for it to be readable
export default function Home() {
  // useState and useEffect allow the products to show up in the DOM
  const [productsInfo, setProductsInfo] = useState([]);
  const [phrase, setPhrase] = useState("");
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((json) => setProductsInfo(json));
  }, []);
  // console.log({productsInfo}); ---> allows you to see that the products are linked to the console from mongodb

  //creating the categoriesNames below allows us to separate the products into their respective
  //categories
  const categoriesNames = [...new Set(productsInfo.map((p) => p.category))];
  //the new Set and [...] syntax turns the categories into an array
  // console.log(categoriesNames); ---> this is just so you can see it has appeared in the DOM so you know it's working!

  //to enable search function to work you need the below to filter the search
  //NOTE: IF MONGO DB JSON HAS ANY TYPOS THIS WON'T WORK E.G.
  //'name:' had an extra space i.e. 'name :' therefore p.name below was unfindable!
  let products;
  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  } 
  // else {
  //   products = productsInfo;
  // }

  return (
    // <div className="mt-2 mx-4">
    <Layout>
      {/* bg is background, w-full is full width py is padding top and bottom px is padding left and right rounded is rounding the border */}
      {/* onChange event listener is linked with the useState/useEffect function above */}
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
      <div>
        {/* line 18 above therefore is really important in order for us to loop through the categories
        and render them onto the page */}
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {/* py means padding */}
            {productsInfo.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                {/* overflow-x-scroll allows you to scroll through each row */}
                {/* snap-x scrollbar-hide will hide the scrollbar but you need to install
            the plugin, you can do this by going to the npm officail website, search
            tailwind-scrollbar-hide and it will show you how to install the package*/}
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {/* the products variable below is linked to line 25 above */}
                  {productsInfo.filter((p) => p.category === categoryName).map((productInfo) => (
                      // snap start to get the scroll to start at the beginning of the product
                      <div key={productInfo._id} className="px-5 snap-start">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {/* <h2 className='text-2xl'>Mobiles</h2> */}
        {/* <div className="py-4"></div> */}
      </div>
      {/* <footer className="">navigation</footer> */}
    </Layout>
  );
}

//getServerSideProps so images feature in a Google Search

// export async function getServerSideProps() {
//   await initMongoose;
//   const products = await findAllProducts();
//   return {
//     props: {
//       products: JSON.parse(JSON.stringify(products)), //JSON parse is so the productId can be read properly as it is preceded by an underscore _id
//     },
//   };
// }
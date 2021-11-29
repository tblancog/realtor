import "../styles/globals.css";
import Head from "next/head";
import Router from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>Some head</Head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

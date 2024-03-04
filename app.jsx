import '../styles/root.css'
import '../styles/global.css'
import '../styles/fonts.css'
import '../styles/button.css'

import { Provider } from 'react-redux';
import store from '../reducer/store/store';
import Head from 'next/head';
import Layout from '../layout/layout';
import Script from 'next/script';
import { useEffect } from 'react';
import ChatComponent from '../components/chatComponent/chatComponent';
import { GoogleOAuthProvider } from '@react-oauth/google';

const MyApp = ({ Component, pageProps }) => {

    // useEffect(() => {
    //     // Load the WhatsApp chat widget script
    //     const loadWhatsappScript = () => {
    //       const url = 'https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?99073';
    //       const script = document.createElement('script');
    //       script.type = 'text/javascript';
    //       script.async = true;                           
    //       script.src = url;        
    
    //       script.onload = function () {
    //         const options = {
    //             "enabled":true,
    //             "chatButtonSetting":{
    //                 "backgroundColor":"#4dc247",
    //                 "ctaText":"Chat with us",
    //                 "borderRadius":"25",
    //                 "marginLeft": "0",
    //                 "marginRight": "20",
    //                 "marginBottom": "20",
    //                 "ctaIconWATI":false,
    //                 "position":"right"
    //             },
    //             "brandSetting":{
    //                 "brandName":"MasterCamp",
    //                 "brandSubTitle":"undefined",
    //                 "brandImg":"https://drive.google.com/file/d/1-Ta30whKAugCNEr8EJ-O9iSru70T-iFh/view?usp=sharing",
    //                 "welcomeText":"Hi there!\nHow may we help you?",
    //                 "messageText":"Hi MasterCamp, I want to understand more about the Industry Immersive Programmes",
    //                 "backgroundColor":"#4dc247",
    //                 "ctaText":"Chat with us",
    //                 "borderRadius":"25",
    //                 "autoShow":false,
    //                 "phoneNumber":"917669186564"
    //             }
    //             };
    //         CreateWhatsappChatWidget(options);
    //       };
    
    //       document.head.appendChild(script);
    //     };
    
    //     loadWhatsappScript();
    //   }, []);
    

    return (
        <>
        <GoogleOAuthProvider clientId="715247830386-onprhn7rg284nv7v70uee2mdsm0rdpn6.apps.googleusercontent.com">
            <Head>
                <title>MasterCamps</title>
                <link rel="icon" type="image/x-icon" href={'https://cdn.mastersunion.org/assets/imgV2/masterFab.png'}></link>
            </Head>
            <Provider store={store}>
                <Layout>
                    
                    <Component {...pageProps} />
                    <Script src='../components/script/goodScript.js' />
                    <script async defer src="https://apis.google.com/js/api.js" ></script>
                    <script async defer src="https://accounts.google.com/gsi/client" ></script>
                    <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
                </Layout>
            </Provider>
            </GoogleOAuthProvider>
        </>

    );
};
export default MyApp;

// app/head.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head>
                    {/* Fonte Poppins */}
                    <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
                    rel="stylesheet"
                    />
                    {/* Fonte Inter */}
                    <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
                    rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>  
            </Html>
        )
    }
}
  
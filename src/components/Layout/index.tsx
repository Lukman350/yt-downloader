import Head from "next/head";
import MainNav from "@/components/Navbar";
import Container from "react-bootstrap/Container";

type LayoutTypes = {
  title?: string;
  children: React.ReactNode;
};

function Layout({ title, children }: LayoutTypes) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <MainNav />

      <main>
        <Container fluid="sm">
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>{children}</div>
        </Container>
      </main>
    </>
  );
}

export default Layout;

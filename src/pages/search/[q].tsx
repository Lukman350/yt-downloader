import callAPI, { APIResponseTypes } from "@/lib/API";
import Layout from "@/components/Layout";
import DisplayAllVideos from "@/components/DisplayAllVideos";
import { Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { Result } from "ytsr";

function Search() {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<APIResponseTypes>({
    success: true,
    data: null,
    message: "",
  });

  const router = useRouter();

  const fetchData = async (query: string) => {
    setLoading(true);

    const response: APIResponseTypes = await callAPI({
      path: `search?q=${query}&limit=20`,
      method: "GET",
    });

    setResponse(response);

    setLoading(false);
  };

  useEffect(() => {
    fetchData(router.query.q as string);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout title="YT Downloader - Search">
      <h3 className="h3 text-center p-4">YouTube Downloader - Search</h3>

      {!loading && response.success ? (
        <DisplayAllVideos data={response.data} />
      ) : (
        <Alert variant="danger">
          <Alert.Heading>An error has occurred!</Alert.Heading>
          <hr />
          <p
            dangerouslySetInnerHTML={{
              __html: response.message,
            }}
          ></p>
        </Alert>
      )}
    </Layout>
  );
}

export default Search;

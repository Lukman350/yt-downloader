import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Result, Item } from "ytsr";
import { MdSettings, MdPlayCircle } from "react-icons/md";
import callAPI from "@/lib/API";
import type { APIResponseTypes } from "@/lib/API";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function DisplayAllVideos({ data }: { data: Result }) {
  const downloadVideos = async (event: any, url: string) => {
    event.preventDefault();

    event.target.disabled = true;

    const swal = withReactContent(Swal);

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-info",
      },
      buttonsStyling: false,
    });

    await callAPI({
      path: `download/`,
      method: "POST",
      data: {
        url: encodeURI(url),
        format: "mp3",
        quality: "highestaudio",
      },
    })
      .then((response: APIResponseTypes) => {
        if (response.success) {
          swalWithBootstrapButtons
            .fire({
              title: "File successfully converted!",
              text: "Click the button below to download the file.",
              icon: "info",
              showCancelButton: true,
              confirmButtonText: "Download",
              cancelButtonText: "Cancel",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons
                  .fire(
                    "Downloaded!",
                    "You'll be redirected to the download page.",
                    "success"
                  )
                  .then(() => {
                    window.open(response.data.url, "_blank");
                  });
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  "Your file is safe :)",
                  "error"
                );
              }
            });

          event.target.disabled = false;
        } else {
          swalWithBootstrapButtons.fire("Error", response.message, "error");

          event.target.disabled = false;
        }
      })
      .catch((error) => {
        swalWithBootstrapButtons.fire(
          "Error",
          "An error occured while converting the file.",
          "error"
        );

        event.target.disabled = false;
      });
  };

  return (
    <Container>
      <Row>
        {data !== null ? (
          data.items.map((video: Item, idx: number) => {
            if (video.type === "video") {
              return (
                <Col key={idx} md={6} lg={6} sm={12}>
                  <Card bg="secondary" className="text-white shadow-lg mb-3">
                    <Card.Body>
                      <Card.Title>{video.title}</Card.Title>
                      <Card.Text>
                        Duration: {video.duration}
                        <br />
                        <strong>{video.author?.name}</strong>
                      </Card.Text>

                      <div className="d-flex justify-content-evenly">
                        <Button
                          variant="primary"
                          type="button"
                          onClick={(e) => downloadVideos(e, video.url)}
                        >
                          <span>
                            <MdSettings fontSize={"1.4em"} />
                          </span>{" "}
                          Convert to MP3
                        </Button>

                        <a
                          className="btn btn-light"
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>
                            <MdPlayCircle fontSize={"1.4em"} />
                          </span>{" "}
                          Play
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }
          })
        ) : (
          <Col md={12}>
            <h3 className="text-center p-4">No videos found</h3>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default DisplayAllVideos;

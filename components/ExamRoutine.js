import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import { Button, Link } from "@mui/material";
import Countdown from "./Countdown";

export default function ExamRoutine({
  countdownDate,
  routine,
  subtitle,
  title,
}) {
  const [loading, setLoading] = useState(true);
  const [todayDate, setTodayDate] = useState("");
  const [tomorrowDate, setTomorrowDate] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10);
    setTodayDate(new Date());
    setTomorrowDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    const dateCheck = setInterval(() => {
      setTodayDate(new Date());
      setTomorrowDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    }, 60000);
    return () => clearInterval(dateCheck);
  }, []);

  const tCellStyles = {
    px: 1,
    border: "1px solid #d7d7d7",
  };

  return (
    <Card
      sx={{
        mt: 2,
        display: "flex",
        borderRadius: ".6rem",
        "&:hover": {
          boxShadow:
            "0 20px 20px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        },
        overflowX: "auto",
      }}
      elevation={3}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            pb: "1rem !important",
          }}
        >
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" gutterBottom color="text.secondary">
            {subtitle ? (
              <>
                {subtitle}
                <br />
              </>
            ) : null}
            {routine[0].sourceName ? (
              <>
                Source:{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={routine[0].source}
                >
                  {routine[0].sourceName}
                </Link>
              </>
            ) : null}
          </Typography>
          <Countdown friendlyDate={countdownDate} hideTomorrow />
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  pt: 4,
                }}
              >
                {Array(3)
                  .fill()
                  .map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      {Array(3)
                        .fill()
                        .map((item, index) => (
                          <Skeleton
                            key={index}
                            variant="rectangular"
                            sx={{ m: 1 }}
                            width={80}
                            height={30}
                          />
                        ))}
                    </Box>
                  ))}
              </Box>
            </Box>
          ) : (
            <>
              <TableContainer
                sx={{
                  maxWidth: "24rem",
                  mx: "auto",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      {routine[0].friendlyDate ? (
                        <TableCell sx={tCellStyles} align="center">
                          Date
                        </TableCell>
                      ) : null}
                      <TableCell sx={tCellStyles} align="center">
                        Day
                      </TableCell>
                      <TableCell sx={tCellStyles} align="center">
                        Subject
                      </TableCell>
                      {routine[0].questions ? (
                        <TableCell sx={tCellStyles} align="center">
                          Old Qs
                        </TableCell>
                      ) : null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {routine.map((exam) => (
                      <Fragment key={exam.subject}>
                        <TableRow
                          sx={{
                            "&:nth-of-type(even)": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                        >
                          {exam.friendlyDate ? (
                            <TableCell sx={tCellStyles} align="center">
                              {exam.friendlyDate}
                            </TableCell>
                          ) : null}

                          <TableCell sx={tCellStyles} align="center">
                            {exam.date.toDateString() ===
                            todayDate.toDateString() ? (
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                }}
                              >
                                Today
                              </Typography>
                            ) : exam.date.toDateString() ===
                              tomorrowDate.toDateString() ? (
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                }}
                              >
                                Tom.
                              </Typography>
                            ) : null}
                            {exam.day}
                          </TableCell>
                          <TableCell sx={tCellStyles} align="center">
                            {exam.subject}
                          </TableCell>
                          {exam.questions ? (
                            <TableCell sx={tCellStyles} align="center">
                              {exam.questions.map((question, index) => (
                                <>
                                  <Button
                                    key={index}
                                    color="primary"
                                    size="small"
                                    href={question.link}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    Batch {question.batch}
                                  </Button>
                                  <br />
                                </>
                              ))}
                            </TableCell>
                          ) : null}
                        </TableRow>
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}

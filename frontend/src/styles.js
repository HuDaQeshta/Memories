import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  postsContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  grid: {
    padding: "2rem",
  },
  listTitle: {
    margin: "1rem 0",
  },
  spinner: {
    margin: "auto",
  },
  title: {
    margin: "0.5rem 0",
  },
  heading: {
    //color: "#477998",
    color: "#36C9C6",
    margin: "1rem 0",
  },
  image: {
    marginLeft: "1rem",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
  },
  links: {
    textDecoration: "none",
    color: "#303F9F",
    "&:hover": {
      color: "#F50057",
    },
  },
  buttonSubmit: {
    marginBottom: 10,
    marginTop: 10,
  },
  marginBig: {
    margin: "30px 0",
  },
  marginSmall: {
    margin: "10px 0",
  },
  marginTwoSides: {
    margin: "30px  0  0 10px",
  },
  textMuted: {
    color: "#777777",
    marginLeft: "1rem",
  },
  whiteBox: { position: "relative", backgroundColor: "#fff" },
  circularProgress: {
    marginLeft: "50%",
    marginTop: "10%",
  },
  minimunHeight: {
    minHeight: "97.5vh",
  },

  bio: {
    marginBottom: "1.5rem !important",
    color: "#fff",
    letterSpacing: "0.3",

    width: "55%",
  },
  divider: {
    height: "3rem",
  },
  editProfileBtns: {
    border: "1px solid #fff",
    borderRadius: "0.5rem",
    float: "right",
    margin: "0.5rem 0.5rem",
    backgroundColor: "inherit",
    "& a": {
      fontSize: "1rem",
      textDecoration: "none",
      color: "#fff",
      fontWeight: "500",
    },
    "&:hover": {
      "& a": {
        color: "#36C9C6",
      },
      backgroundColor: "#fff",
    },
  },
  goBackBtn: {
    borderRadius: "0.3rem",
    padding: "8px 18px",
    margin: "0 1rem",
    backgroundColor: "#36C9C6",
    "& a": {
      fontSize: "0.95rem",
      textDecoration: "none",
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "rgba(42, 157, 155, 1)",
    },
  },
  avatarContainer: {
    position: "relative",
    margin: "1.5rem 0",
    textAlign: "center",
    "&:hover div": {
      opacity: "1",
    },
  },
  avatar: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    border: "2px solid #fff",
    borderRadius: "50%",
  },
  btnOverlay: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "0 auto",
    borderRadius: "50%",
    height: "10rem",
    width: "10rem",
    opacity: "0",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
    cursor: "pointer",
  },
  icon: {
    color: "white",
    position: "absolute",
    top: "40%",
    left: "35%",
  },
  charCount: {
    color: "#fff",
    textAlign: "right",
    fontSize: "1rem",
  },
  centeredContent: {
    textAlign: "center",
    margin: "1rem 0 0 0",
    paddingBottom: "1rem",
  },
}));

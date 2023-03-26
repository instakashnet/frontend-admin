import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  root: {
    "&.MuiSkeleton-root": {
      backgroundColor: "rgba(195,203,228,.25)",
    },
  },
});

export const SkeletonComponent = (props) => {
  const classes = useStyles();

  return <Skeleton {...props} className={classes.root} />;
};

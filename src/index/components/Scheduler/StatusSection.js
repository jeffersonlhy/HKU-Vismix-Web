import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "80%",
		"& > * + *": {
			marginTop: theme.spacing(2),
			
		},
		// "& .MuiAlert-standardSuccess": {
		// 	background: "#306230"
		// },
		"& .MuiAlert-outlinedInfo":{
			color: "#45a7f6"
		},
		"& .MuiAlert-outlinedError":{
			color: "#d35148"
		},
		"& .MuiAlert-outlinedWarning":{
			color: "#e3992c;"
		},
		"& .MuiAlert-outlinedSuccess":{
			color: "#59bc5d;"
		},
		"& .MuiSvgIcon-fontSizeSmall": {
			color: "#bbbbbb"
		},
	},
}));

function StatusSection({severity, alertInfo, alertOn, setAlertOn}) {
	
	const classes = useStyles();

	return (
		<div className="mt-3">
			<div className={classes.root} >
				{ alertOn && 
					<Alert onClose={() => {setAlertOn(false)}} variant="outlined" severity={severity}>
						{alertInfo}
					</Alert>
				}			
			</div>
		</div>
	);
}

export default StatusSection;

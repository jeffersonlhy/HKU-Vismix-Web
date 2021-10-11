import React, { useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	inputLabel: {
		fontSize: "1rem",
		color: "#D7D7D7",
	},
	select: {
		color: "#D7D7D7",
		background: "#313133",
	},
	formControl: {
		"& .MuiSelect-icon": {
			color: "#D7D7D7",
		},
		"& .MuiFormLabel-root.Mui-focused": {
			color: "#D7D7D7",
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
			{
				borderWidth: "1px",
				borderColor: "#D7D7D7",
			},
		"& .MuiList-root MuiMenu-list MuiList-padding": {
			color: "#D7D7D7",
			backgroundColor: "#777777",
		},
		"& .MuiListItem-root.Mui-selected": {
			color: "#808080",
		},
		"& .MuiListItem-root.Mui-selected:hover": {},
		borderRadius: "7px",
		background: "#313133",
		margin: theme.spacing(0),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function ViewerSelector({ selectedCoursesList, setNumToTake, numToTake }) {
	const [count, setCount] = useState(0);
	const classes = useStyles();

	const handleSubmit = (e) => {
		if (e.target.value > 0){
			setCount(e.target.value);
			setNumToTake(e.target.value);
		}
	};

	return (
		<div className="h-auto">
			{selectedCoursesList.length > 0 && (
				<div className="flex h-full items-center my-5">
                    <div className="text-ssm lg:text-sm font-semibold mr-5">
                        Courses to take:
                    </div>
					<FormControl
						variant="outlined"
						className={classes.formControl}
					>
						<InputLabel className={classes.inputLabel}>
							Total
						</InputLabel>
						<Select
							className={classes.select}
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={count}
							onChange={handleSubmit}
							label="Course"
						>
							{selectedCoursesList.map((_, idx) => {
								return (
									idx < 8 && (
										<MenuItem
											className="text-xs lg:text-ssm"
											value={idx + 1}
										>
											{idx + 1}
										</MenuItem>
									)
								);
							})}
						</Select>
					</FormControl>
				</div>
			)}
		</div>
	);
}

export default ViewerSelector;

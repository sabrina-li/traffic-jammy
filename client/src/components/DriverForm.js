import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Enums from '../utils/Enums'
import Button from '@material-ui/core/Button';
import API from '../utils/API'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        display: "inline-block",
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));

export default function TextFields(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        age: ''
    });

    const handleChange = name => event => {
        if (name === "age") {
            console.log("validate int")
        }
        setValues({ ...values, [name]: event.target.value });
    };
    const handleSubmit = evt => {
        console.log(values);
        API.clusterUser(values)
            .then(function (response) {
                console.log(response);
                props.setResultMarkers(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id="Age"
                label="age"
                className={classes.textField}
                value={values.age}
                onChange={handleChange('age')}
                margin="normal"
            />
            <TextField
                id="standard-select-hispanic"
                select
                label="Hispanic"
                className={classes.textField}
                value={values.hispanic}
                onChange={handleChange('hispanic')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.hispanic.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <TextField
                id="standard-select-race"
                select
                label="Race"
                className={classes.textField}
                value={values.race}
                onChange={handleChange('race')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.race.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <TextField
                id="standard-select-sex"
                select
                label="sex"
                className={classes.textField}
                value={values.sex}
                onChange={handleChange('sex')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.sex.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <TextField
                id="standard-select-body"
                select
                label="Car Type"
                className={classes.textField}
                value={values.body}
                onChange={handleChange('body')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.body.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <TextField
                id="standard-select-make"
                select
                label="Car Make"
                className={classes.textField}
                value={values.make}
                onChange={handleChange('make')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.make.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <TextField
                id="standard-select-modelyr"
                select
                label="Car Year"
                className={classes.textField}
                value={values.modelyr}
                onChange={handleChange('modelyr')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.modelyr.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <TextField
                id="standard-select-feet"
                select
                label="Height(feet)"
                className={classes.textField}
                value={values.feet}
                onChange={handleChange('feet')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.feet.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <TextField
                id="standard-select-weight"
                select
                label="Weight(lb)"
                className={classes.textField}
                value={values.weight}
                onChange={handleChange('weight')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                {Enums.weight.map(option => {
                    const key = Object.keys(option)[0];
                    return <option key={key} value={option[key]}>
                        {option[key]}
                    </option>
                })}
            </TextField>
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
    );
}
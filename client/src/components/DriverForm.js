import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const hispanic = [
    {"-1": "Blank"},
    {"0": "Not Applicable"},
    {"1": "Mexican"},
    {"2": "Puerto Rican"},
    {"3": "Cuban"},
    {"4": "Central or South American"},
    {"5": "European Spanish"},
    {"6": "Hispanic, Origin Not Specified or Other Origin"},
    {"7": "Non-Hispanic"},
    {"99": "Unknown"},
]


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function TextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
      if(name==="age"){
        console.log("validate int")
      }
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
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
        {hispanic.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </form>
  );
}
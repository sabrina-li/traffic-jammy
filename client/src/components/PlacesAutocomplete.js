import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import './autocomplete.scss'


class PlacesAutocompleteInput extends Component {
    constructor(props) {
        super(props);//take googleMapsReady propr to determine if render
        this.state = {
            from: '',
            to: '',
            address: '',
            display:"none"
        };
    }

    //for auto complete
    handleChange = address => {
        this.setState({ address, display:"block"});
    };

    handleSelect = address => {
        this.setState({ address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.props.setLatLng(this.props.name, latLng))
            .catch(error => console.error('Error', error));
    };

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        if (!this.props.googleMapsReady) {
            console.log("not ready")
            return null;
        }


        
        return <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect} >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <span>
                    <TextField
                    style={{ width: "80%" }}
                    defaultValue="foo"
                    label={this.props.name}
                    margin="normal"
                    variant="outlined"
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container" style={{display:this.state.display}}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </span>
            )}
        </PlacesAutocomplete>
    }
}

export default PlacesAutocompleteInput;

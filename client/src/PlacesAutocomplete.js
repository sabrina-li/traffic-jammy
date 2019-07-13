import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


class PlacesAutocompleteInput extends Component {
    constructor(props) {
        super(props);//take googleMapsReady propr to determine if render
        this.state = {
            from: '',
            to: '',
            address: ''
        };
    }
//original with from and to
// handleChange = (event) => {
//     const key = event.target.getAttribute("name");
//     this.setState({ [key]: event.target.value });
//     // geocodeByAddress(address)
//     //     .then(results => getLatLng(results[0]))
//     //     .then(latLng => console.log('Success', latLng))
//     //     .catch(error => console.error('Error', error));

// }


//for auto complete
handleChange = address => {
    this.setState({ address });
};

handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.props.setLatLng(this.props.name,latLng))
        .catch(error => console.error('Error', error));
};

handleSubmit = (event) => {
    event.preventDefault();
}

render() {
    if (!this.props.googleMapsReady){
        return null;
    }
        return <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect} >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
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
                </div>
            )}
        </PlacesAutocomplete>
    }
}

export default PlacesAutocompleteInput;

import React, { Component } from 'react';
import dotenv from 'dotenv'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class DirectionsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: ''
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
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            {/* <label>From:<input id="from" type="text" name="from" value={this.state.from} onChange={this.handleChange} /></label>
            <label>To:<input type="text" name="to" value={this.state.to} onChange={this.handleChange} /></label> */}
            
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
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

            <input type="submit" value="Submit" />
        </form>
    }
}

export default DirectionsForm;

"use client"
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { MapPin } from 'lucide-react';
function GoogleAddressSearch({ selectedAddress, setCoordinates } : {selectedAddress: any, setCoordinates: any}) {

    return (
        <div className='flex g items-center w-full border rounded-lg text-black'>
            <MapPin className='h-10 w-10 p-2 rounded-l-lg text-primary ' />
            <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
                selectProps={{
                    placeholder: 'Search Address',
                    isClearable: true,
                    className: 'w-full',
                    onChange: (e : any) => {
                        selectedAddress(e)
                        geocodeByAddress(e.label)
                            .then(results => getLatLng(results[0]))
                            .then(({ lat, lng }) =>
                                setCoordinates({ lat, lng })
                            );
                    }
                }}
                autocompletionRequest={{
                    componentRestrictions: {
                      country: ['tn'],
                    },
                  }}
                  
            />
        </div>
    )
}

export default GoogleAddressSearch
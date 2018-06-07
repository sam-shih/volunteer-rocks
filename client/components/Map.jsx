import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
class Map extends Component {
   render() {
   const OpportunityMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: this.props.op.location.lat, lng: this.props.op.location.lng } }
        defaultZoom = { 13 }
      >
      </GoogleMap>
   ));
   return(
      <div>
        <OpportunityMap
          containerElement={ <div style={{ height: `180px`, width: '318px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default Map;
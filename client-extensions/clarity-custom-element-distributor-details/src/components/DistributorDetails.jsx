import React, { useEffect, useState } from 'react';
import ClayAlert from '@clayui/alert';
import ClayButton from '@clayui/button';

const DistributorDetails = () => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        Liferay.on('selectDistributor', (dist) => {
            setSelected(dist);
        });
    }, []);

    if (!selected) {
        return (
            <ClayAlert displayType="info" title="Info:">
                Please select a distributor from the table.
            </ClayAlert>
        );
    }

    return (
        <div>
            <h2>{selected.name}</h2>
            <p>
                Location: {selected.city}, {selected.state}
            </p>
            <ClayButton displayType="primary">
                Contact Distributor
            </ClayButton>
        </div>
    );
};

export default DistributorDetails;

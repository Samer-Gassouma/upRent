"use client";
import React, { useState } from 'react'
import { MarkerF, OverlayView } from '@react-google-maps/api';
import MakerproposalItem from './MakerproposalItem';

function MarkerItem({ item } : {item: any}) {
    const [selected, setSelected] = useState(null)
    return (
        <div>
            <MarkerF position={item.coordinates}
                onClick={() => {
                    setSelected(item)
                }}
            >

                {selected && (
                    <OverlayView
                        position={item.coordinates}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}

                    >
                        <div>
                            <MakerproposalItem item={selected} closeHandler={() => setSelected(null)} />
                        </div>
                    </OverlayView>
                )}

            </MarkerF>
        </div>
    )
}

export default MarkerItem
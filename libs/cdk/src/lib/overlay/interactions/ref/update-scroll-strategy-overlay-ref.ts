import { strategy } from '@core-template';

import { hasAttached } from '../../../portal';
import { OverlayRef } from '../../data';
import { disposeScrollStrategyOverlayRef } from './attach/dispose-scroll-strategy-overlay-ref';

/** Switches to a new scroll strategy. */
export const updateScrollStrategyOverlayRef = <T>(
    overlayRef: OverlayRef<T>
): OverlayRef<T> => {
    const { kindStrategiesScroll, portalOutlet, strategiesScroll } = overlayRef;

    if (strategiesScroll === overlayRef.strategiesScroll) {
        return overlayRef;
    }
    disposeScrollStrategyOverlayRef(overlayRef);

    if (hasAttached(portalOutlet?.portal)) {
        const { attachStrategiesScroll, enableStrategiesScroll } = {
            ...strategiesScroll,
        };

        strategy<OverlayRef<T>>(
            overlayRef,
            attachStrategiesScroll,
            kindStrategiesScroll
        );
        strategy<OverlayRef<T>>(
            overlayRef,
            enableStrategiesScroll,
            kindStrategiesScroll
        );

        // strategiesScroll?.attach(overlayRef);
        // strategiesScroll?.enable();
    }
    return overlayRef;
};

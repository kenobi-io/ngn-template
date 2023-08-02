import { casting } from '../../../directive';
import { outZone } from '../../../platform';
import { OutsideClickDispatcherOverlay } from '../../data';
import { addDispatcherOverlay } from './base/add-dispatcher-overlay';

type AddOutsideClickDispatcherOverlay = Omit<
    OutsideClickDispatcherOverlay,
    'ngOnDestroy' | 'pointerDownEventTarget'
>;
/** Add a new overlay to the list of attached overlay refs. */

export const addOutsideClickDispatcherOverlay = (
    use: AddOutsideClickDispatcherOverlay
): OutsideClickDispatcherOverlay =>
    casting(use, () => {
        const {
            cursorStyleIsSet,
            document,
            isAttached,
            listener,
            ngZone,
            platform,
            pointerDownListener,
        } = use;

        const addEventListeners = (body: HTMLElement): void => {
            body.addEventListener('pointerdown', pointerDownListener, true);
            body.addEventListener('click', listener, true);
            body.addEventListener('auxclick', listener, true);
            body.addEventListener('contextmenu', listener, true);
        };
        addDispatcherOverlay(use);
        // Safari on iOS does not generate click events for non-interactive
        // elements. However, we want to receive a click for any element outside
        // the overlay. We can force a "clickable" state by setting
        // `cursor: pointer` on the document body. See:
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#Safari_Mobile
        // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
        if (!isAttached) {
            const body = document.body;
            outZone(ngZone, () => addEventListeners(body));
            // click event is not fired on iOS. To make element "clickable" we are
            // setting the cursor to pointer
            if (platform.IOS && !cursorStyleIsSet) {
                use.cursorOriginalValue = body.style.cursor;
                body.style.cursor = 'pointer';
                use.cursorStyleIsSet = true;
            }

            use.isAttached = true;
        }
    });

/** Gets the target of an event while accounting for Shadow DOM. */
export const eventTargetShadowDom = <T extends EventTarget>(
    event: Event
): T | undefined => {
    const { target } = event;

    // If an event is bound outside the Shadow DOM, the `event.target` will
    // point to the shadow root so we have to use `composedPath` instead.
    return (event.composedPath ? event.composedPath()[0] : target) as
        | T
        | undefined;
};

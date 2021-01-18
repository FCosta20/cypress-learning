export function matchPageSnapshot() {
    cy.document()
        .toMatchImageSnapshot()
}

export function matchElementScreenshot(element) {
    element.toMatchImageSnapshot()
}